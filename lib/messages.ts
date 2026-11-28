export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  project_type: string;
  budget: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export class DatabaseServiceError extends Error {
  status: number;
  userMessage: string;

  constructor(userMessage: string, status = 503) {
    super(userMessage);
    this.name = "DatabaseServiceError";
    this.status = status;
    this.userMessage = userMessage;
  }
}

declare global {
  var __contact_messages_store: ContactMessage[] | undefined;
}

if (!globalThis.__contact_messages_store) {
  globalThis.__contact_messages_store = [];
}

const SUPABASE_TIMEOUT_MS = 8500;

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { url: url?.replace(/\/$/, ""), key };
}

export function isSupabaseConfigured(): boolean {
  const { url, key } = getSupabaseConfig();
  return Boolean(url && key);
}

async function supabaseFetch(
  path: string,
  options: RequestInit & { extraHeaders?: Record<string, string> } = {}
): Promise<Response | null> {
  const { url, key } = getSupabaseConfig();
  if (!url || !key) {
    return null;
  }

  const { extraHeaders, ...fetchOptions } = options;
  const headers: Record<string, string> = {
    apikey: key,
    ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}),
    ...extraHeaders,
  };

  return fetch(`${url}/rest/v1/${path}`, {
    ...fetchOptions,
    headers,
    cache: "no-store",
    signal: AbortSignal.timeout(SUPABASE_TIMEOUT_MS),
  });
}

function mapSupabaseHttpError(status: number, errorText: string): DatabaseServiceError {
  if (status === 540 || /paused|inactive/i.test(errorText)) {
    return new DatabaseServiceError(
      "Database is temporarily paused or waking up. Please retry in a moment or email directly.",
      503
    );
  }
  if (status === 401 || status === 403) {
    return new DatabaseServiceError(
      "Database rejected the request due to an authentication or permission issue.",
      502
    );
  }
  return new DatabaseServiceError(
    `Database could not save your message (error ${status}). Please try again or email directly.`,
    502
  );
}

export async function saveMessage(data: {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}): Promise<{ success: boolean; id: string }> {
  if (isSupabaseConfigured()) {
    let res: Response | null;
    try {
      res = await supabaseFetch("contact_messages", {
        method: "POST",
        extraHeaders: {
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          project_type: data.projectType,
          budget: data.budget,
          message: data.message,
          is_read: false,
        }),
      });
    } catch (err) {
      console.error("Error communicating with Supabase:", err);
      if (err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError")) {
        throw new DatabaseServiceError(
          "Database took too long to respond (connection timed out). Please try again in a few seconds.",
          504
        );
      }
      throw new DatabaseServiceError(
        "Unable to reach the database server right now. Please try again shortly or email directly.",
        503
      );
    }

    if (res) {
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Supabase insert error (${res.status}):`, errorText);
        throw mapSupabaseHttpError(res.status, errorText);
      }

      const rows = await res.json();
      return { success: true, id: rows[0]?.id || "supabase-id" };
    }
  }

  // Fallback to in-memory store ONLY when Supabase env vars are not configured
  const newMsg: ContactMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: data.name,
    email: data.email,
    project_type: data.projectType,
    budget: data.budget,
    message: data.message,
    created_at: new Date().toISOString(),
    is_read: false,
  };

  globalThis.__contact_messages_store = [
    newMsg,
    ...(globalThis.__contact_messages_store || []),
  ];

  return { success: true, id: newMsg.id };
}

export async function getMessages(): Promise<ContactMessage[]> {
  if (isSupabaseConfigured()) {
    try {
      const res = await supabaseFetch("contact_messages?select=*&order=created_at.desc");
      if (res?.ok) {
        return (await res.json()) as ContactMessage[];
      }
      if (res) {
        console.error("Supabase fetch messages error:", await res.text());
      }
    } catch (err) {
      console.error("Failed to fetch messages from Supabase:", err);
    }
  }

  return globalThis.__contact_messages_store || [];
}

export async function markMessageRead(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const res = await supabaseFetch(`contact_messages?id=eq.${encodeURIComponent(id)}`, {
        method: "PATCH",
        extraHeaders: {
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ is_read: true }),
      });
      return Boolean(res?.ok);
    } catch (err) {
      console.error("Error updating message in Supabase:", err);
      return false;
    }
  }

  if (globalThis.__contact_messages_store) {
    globalThis.__contact_messages_store = globalThis.__contact_messages_store.map((m) =>
      m.id === id ? { ...m, is_read: true } : m
    );
  }
  return true;
}

export async function deleteMessage(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const res = await supabaseFetch(`contact_messages?id=eq.${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      return Boolean(res?.ok);
    } catch (err) {
      console.error("Error deleting message in Supabase:", err);
      return false;
    }
  }

  if (globalThis.__contact_messages_store) {
    globalThis.__contact_messages_store = globalThis.__contact_messages_store.filter(
      (m) => m.id !== id
    );
  }
  return true;
}
