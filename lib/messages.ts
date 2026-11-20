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

declare global {
  var __contact_messages_store: ContactMessage[] | undefined;
}

if (!globalThis.__contact_messages_store) {
  globalThis.__contact_messages_store = [];
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { url: url?.replace(/\/$/, ""), key };
}

export function isSupabaseConfigured(): boolean {
  const { url, key } = getSupabaseConfig();
  return Boolean(url && key);
}

export async function saveMessage(data: {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}): Promise<{ success: boolean; id: string }> {
  const { url, key } = getSupabaseConfig();

  if (url && key) {
    try {
      const res = await fetch(`${url}/rest/v1/contact_messages`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
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

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Supabase insert error:", errorText);
        throw new Error(`Supabase insert failed: ${res.statusText}`);
      }

      const rows = await res.json();
      return { success: true, id: rows[0]?.id || "supabase-id" };
    } catch (err) {
      console.error("Error communicating with Supabase, falling back to memory store:", err);
    }
  }

  // Fallback to in-memory store
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
  const { url, key } = getSupabaseConfig();

  if (url && key) {
    try {
      const res = await fetch(
        `${url}/rest/v1/contact_messages?select=*&order=created_at.desc`,
        {
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
          },
          cache: "no-store",
        }
      );

      if (res.ok) {
        const rows = await res.json();
        return rows as ContactMessage[];
      }
      console.error("Supabase fetch messages error:", await res.text());
    } catch (err) {
      console.error("Failed to fetch messages from Supabase:", err);
    }
  }

  return globalThis.__contact_messages_store || [];
}

export async function markMessageRead(id: string): Promise<boolean> {
  const { url, key } = getSupabaseConfig();

  if (url && key) {
    try {
      const res = await fetch(`${url}/rest/v1/contact_messages?id=eq.${id}`, {
        method: "PATCH",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ is_read: true }),
      });
      return res.ok;
    } catch (err) {
      console.error("Error updating message in Supabase:", err);
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
  const { url, key } = getSupabaseConfig();

  if (url && key) {
    try {
      const res = await fetch(`${url}/rest/v1/contact_messages?id=eq.${id}`, {
        method: "DELETE",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
      });
      return res.ok;
    } catch (err) {
      console.error("Error deleting message in Supabase:", err);
    }
  }

  if (globalThis.__contact_messages_store) {
    globalThis.__contact_messages_store = globalThis.__contact_messages_store.filter(
      (m) => m.id !== id
    );
  }
  return true;
}
