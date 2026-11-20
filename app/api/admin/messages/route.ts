import { NextResponse } from "next/server";
import {
  getMessages,
  markMessageRead,
  deleteMessage,
  isSupabaseConfigured,
} from "../../../../lib/messages";

function authenticate(request: Request): boolean {
  const adminSecret = process.env.ADMIN_SECRET || "satyam2026";
  const authHeader = request.headers.get("authorization");
  const xAdminKey = request.headers.get("x-admin-key");

  if (xAdminKey && xAdminKey === adminSecret) {
    return true;
  }

  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (token === adminSecret) {
      return true;
    }
  }

  return false;
}

export async function GET(request: Request) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const messages = await getMessages();
    return NextResponse.json({
      success: true,
      isSupabaseConnected: isSupabaseConfigured(),
      total: messages.length,
      unread: messages.filter((m) => !m.is_read).length,
      messages,
    });
  } catch (error) {
    console.error("API /api/admin/messages GET error:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: "Missing message id" }, { status: 400 });
    }

    const success = await markMessageRead(id);
    return NextResponse.json({ success });
  } catch (error) {
    console.error("API /api/admin/messages PATCH error:", error);
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing message id" }, { status: 400 });
    }

    const success = await deleteMessage(id);
    return NextResponse.json({ success });
  } catch (error) {
    console.error("API /api/admin/messages DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}

