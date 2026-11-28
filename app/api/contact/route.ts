import { NextResponse } from "next/server";
import { DatabaseServiceError, saveMessage } from "../../../lib/messages";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request payload. Please refresh and try again." },
      { status: 400 }
    );
  }

  try {
    const { name, email, projectType, budget, message, honeypot } = body;

    // Silent drop for automated spam bots
    if (honeypot && String(honeypot).trim() !== "") {
      return NextResponse.json({ success: true, message: "Message received." });
    }

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter your name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address (e.g. name@example.com)." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Please enter your message details (at least 5 characters)." },
        { status: 400 }
      );
    }

    const result = await saveMessage({
      name: name.trim().slice(0, 150),
      email: email.trim().toLowerCase().slice(0, 150),
      projectType: typeof projectType === "string" && projectType.trim() ? projectType.trim() : "General enquiry",
      budget: typeof budget === "string" && budget.trim() ? budget.trim() : "Not decided",
      message: message.trim().slice(0, 5000),
    });

    return NextResponse.json({
      success: true,
      id: result.id,
      message: "Thank you! Your message has been sent successfully. I will get back to you shortly.",
    });
  } catch (error) {
    console.error("API /api/contact error:", error);
    if (error instanceof DatabaseServiceError) {
      return NextResponse.json(
        { success: false, error: error.userMessage },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { success: false, error: "Server error while processing message. Please try again or email directly." },
      { status: 500 }
    );
  }
}
