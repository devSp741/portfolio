import { NextResponse } from "next/server";
import { saveMessage } from "../../../lib/messages";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, projectType, budget, message, honeypot } = body;

    // Silent drop for automated spam bots
    if (honeypot && String(honeypot).trim() !== "") {
      return NextResponse.json({ success: true, message: "Message received." });
    }

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
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
      name: name.trim(),
      email: email.trim().toLowerCase(),
      projectType: projectType || "General enquiry",
      budget: budget || "Not decided",
      message: message.trim(),
    });

    return NextResponse.json({
      success: true,
      id: result.id,
      message: "Thank you! Your message has been sent successfully. I will get back to you shortly.",
    });
  } catch (error) {
    console.error("API /api/contact error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process message. Please try again or email directly." },
      { status: 500 }
    );
  }
}

