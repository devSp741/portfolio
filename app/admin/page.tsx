"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ContactMessage } from "../../lib/messages";
import { useAdminAuth } from "../../context/admin-auth-context";
import { useToast } from "../../components/toast";
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  Inbox,
  Lock,
  LogOut,
  Mail,
  RefreshCw,
  Trash2,
} from "../../components/icons";

export default function AdminPage() {
  const { isAuthenticated, login, logout, getAuthHeaders } = useAdminAuth();
  const toast = useToast();

  const [inputPasscode, setInputPasscode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [showSqlGuide, setShowSqlGuide] = useState(false);

  const fetchMessages = useCallback(
    async (showNotification = false) => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/admin/messages", {
          headers: getAuthHeaders(),
        });

        if (!res.ok) {
          if (res.status === 401) {
            logout();
            toast.error("Session Expired", "Please enter your passcode again.");
            return;
          }
          throw new Error("Failed to load messages from server.");
        }

        const data = await res.json();
        setMessages(data.messages || []);
        setIsSupabaseConnected(Boolean(data.isSupabaseConnected));
        if (showNotification) {
          toast.info("Inbox Refreshed", `Loaded ${data.messages?.length || 0} messages.`);
        }
      } catch (err) {
        toast.error("Fetch Error", err instanceof Error ? err.message : "Network error.");
      } finally {
        setIsLoading(false);
      }
    },
    [getAuthHeaders, logout, toast]
  );

  // Auto-fetch messages whenever authenticated
  useEffect(() => {
    let isMounted = true;
    if (!isAuthenticated) return;

    fetch("/api/admin/messages", {
      headers: getAuthHeaders(),
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            logout();
          }
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setMessages(data.messages || []);
          setIsSupabaseConnected(Boolean(data.isSupabaseConnected));
        }
      })
      .catch(() => {
        // silent initial fetch fallback
      });

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, getAuthHeaders, logout]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPasscode.trim()) return;

    setIsSubmitting(true);
    const result = await login(inputPasscode);
    setIsSubmitting(false);

    if (result.success) {
      toast.success("Welcome Satyam!", "Admin dashboard unlocked.");
      setInputPasscode("");
    } else {
      toast.error("Authentication Failed", result.error || "Invalid passcode.");
    }
  };

  const handleLogout = () => {
    logout();
    setMessages([]);
    toast.info("Logged Out", "You have been logged out securely.");
  };

  const handleMarkRead = async (id: string) => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
        );
        toast.success("Marked as Read", "Message status updated.");
      }
    } catch {
      toast.error("Update Failed", "Could not update message status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        toast.info("Message Deleted", "The message has been removed.");
      }
    } catch {
      toast.error("Delete Failed", "Could not delete message.");
    }
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email Copied", email);
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#090d15", color: "#edf1f6", fontFamily: "var(--font-sans, system-ui, sans-serif)", padding: "24px 16px" }}>
      <div style={{ maxWidth: "1040px", margin: "0 auto" }}>
        {/* Header Bar */}
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", paddingBottom: "24px", borderBottom: "1px solid rgba(155, 171, 193, 0.12)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "19px", fontWeight: "800", textDecoration: "none", color: "#edf1f6" }}>
              <span>S</span>
              <span style={{ color: "#ff675d" }}>P</span>
            </Link>
            <span style={{ color: "rgba(155, 171, 193, 0.4)" }}>/</span>
            <span style={{ fontSize: "14px", fontWeight: "650", letterSpacing: "-0.2px" }}>Admin Message Inbox</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/" style={{ color: "#9daabd", textDecoration: "none", fontSize: "12px", padding: "6px 12px", border: "1px solid rgba(155, 171, 193, 0.15)", borderRadius: "6px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <ArrowLeft size={13} aria-hidden="true" />
              <span>Back to Site</span>
            </Link>
            {isAuthenticated && (
              <>
                <button
                  type="button"
                  onClick={() => fetchMessages(true)}
                  disabled={isLoading}
                  style={{ background: "rgba(16, 23, 34, 0.8)", color: "#edf1f6", border: "1px solid rgba(155, 171, 193, 0.2)", borderRadius: "6px", padding: "6px 14px", fontSize: "12px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <RefreshCw size={13} aria-hidden="true" className={isLoading ? "animate-spin" : ""} />
                  <span>{isLoading ? "Refreshing..." : "Refresh"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{ background: "rgba(255, 103, 93, 0.12)", color: "#ff7a70", border: "1px solid rgba(255, 103, 93, 0.3)", borderRadius: "6px", padding: "6px 14px", fontSize: "12px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <LogOut size={13} aria-hidden="true" />
                  <span>Log Out</span>
                </button>
              </>
            )}
          </div>
        </header>

        {/* Login Card (if not logged in) */}
        {!isAuthenticated ? (
          <div style={{ maxWidth: "420px", margin: "80px auto", padding: "32px", background: "linear-gradient(145deg, rgba(17, 24, 36, 0.96), rgba(12, 18, 28, 0.94))", border: "1px solid rgba(155, 171, 193, 0.16)", borderRadius: "14px", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={{ width: "44px", height: "44px", margin: "0 auto 14px", borderRadius: "50%", background: "rgba(255, 103, 93, 0.14)", border: "1px solid rgba(255, 103, 93, 0.3)", display: "grid", placeItems: "center", color: "#ff675d" }}>
                <Lock size={20} aria-hidden="true" />
              </div>
              <h1 style={{ margin: "0 0 6px", fontSize: "20px", fontWeight: "700" }}>Admin Access</h1>
              <p style={{ margin: 0, color: "#9daabd", fontSize: "12px" }}>Enter your admin secret key to view received contact messages.</p>
            </div>

            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: "18px" }}>
                <label htmlFor="passcode" style={{ display: "block", fontSize: "11px", fontWeight: "650", color: "#c4cedb", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Passcode / Admin Key
                </label>
                <input
                  id="passcode"
                  type="password"
                  placeholder="SATYAM"
                  value={inputPasscode}
                  onChange={(e) => setInputPasscode(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", fontSize: "14px", background: "rgba(7, 12, 20, 0.7)", border: "1px solid rgba(155, 171, 193, 0.2)", borderRadius: "8px", color: "#edf1f6", outline: "none", boxSizing: "border-box" }}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{ width: "100%", padding: "11px", background: "#ff675d", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "650", cursor: "pointer", transition: "opacity .2s" }}
              >
                {isSubmitting ? "Unlocking..." : "Unlock Messages"}
              </button>
            </form>
          </div>
        ) : (
          /* Dashboard Content */
          <div style={{ marginTop: "28px" }}>
            {/* KPI Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", marginBottom: "24px" }}>
              <div style={{ padding: "18px", background: "rgba(16, 23, 34, 0.8)", border: "1px solid rgba(155, 171, 193, 0.14)", borderRadius: "10px" }}>
                <span style={{ fontSize: "11px", color: "#8a97ab", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "700" }}>Total Messages</span>
                <div style={{ fontSize: "28px", fontWeight: "800", color: "#edf1f6", marginTop: "4px" }}>{messages.length}</div>
              </div>

              <div style={{ padding: "18px", background: "rgba(16, 23, 34, 0.8)", border: "1px solid rgba(155, 171, 193, 0.14)", borderRadius: "10px" }}>
                <span style={{ fontSize: "11px", color: "#8a97ab", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "700" }}>Unread Inquiries</span>
                <div style={{ fontSize: "28px", fontWeight: "800", color: unreadCount > 0 ? "#ff675d" : "#7ec659", marginTop: "4px" }}>
                  {unreadCount}
                </div>
              </div>

              <div style={{ padding: "18px", background: "rgba(16, 23, 34, 0.8)", border: "1px solid rgba(155, 171, 193, 0.14)", borderRadius: "10px" }}>
                <span style={{ fontSize: "11px", color: "#8a97ab", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "700" }}>Storage Backend</span>
                <div style={{ display: "flex", alignItems: "center", gap: "7px", marginTop: "8px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: isSupabaseConnected ? "#52c41a" : "#faad14" }} />
                  <span style={{ fontSize: "13px", fontWeight: "650", color: isSupabaseConnected ? "#9acb55" : "#e6a23c" }}>
                    {isSupabaseConnected ? "Supabase (Cloud DB Live)" : "In-Memory (Demo Mode)"}
                  </span>
                </div>
              </div>
            </div>

            {/* Supabase Connection Helper Banner */}
            {!isSupabaseConnected && (
              <div style={{ marginBottom: "24px", padding: "16px 20px", background: "rgba(250, 173, 20, 0.08)", border: "1px solid rgba(250, 173, 20, 0.28)", borderRadius: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <strong style={{ color: "#faad14", fontSize: "13px" }}>⚡ Supabase Database Connection</strong>
                    <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#c4cedb" }}>
                      Permanent cloud storage ke liye Vercel environment variables me Supabase keys set karein.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSqlGuide(!showSqlGuide)}
                    style={{ background: "rgba(250, 173, 20, 0.15)", color: "#faad14", border: "1px solid rgba(250, 173, 20, 0.35)", borderRadius: "6px", padding: "6px 12px", fontSize: "11px", cursor: "pointer" }}
                  >
                    {showSqlGuide ? "Hide Setup Guide" : "Show Setup SQL & Env"}
                  </button>
                </div>

                {showSqlGuide && (
                  <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid rgba(250, 173, 20, 0.2)", fontSize: "12px" }}>
                    <p style={{ margin: "0 0 8px", color: "#edf1f6", fontWeight: "600" }}>Supabase.com SQL Editor me run karein:</p>
                    <pre style={{ padding: "12px", background: "rgba(0,0,0,0.5)", borderRadius: "6px", overflowX: "auto", color: "#61dafb", fontSize: "11px", lineHeight: "1.4" }}>
                      {`create table if not exists contact_messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  project_type text default 'General enquiry',
  budget text default 'Not decided',
  message text not null,
  is_read boolean default false
);`}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Messages Listing */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <h2 style={{ margin: 0, fontSize: "16px", fontWeight: "700" }}>Recent Submissions ({messages.length})</h2>
              </div>

              {messages.length === 0 ? (
                <div style={{ padding: "60px 20px", textAlign: "center", background: "rgba(16, 23, 34, 0.6)", border: "1px dashed rgba(155, 171, 193, 0.2)", borderRadius: "12px" }}>
                  <div style={{ width: "48px", height: "48px", margin: "0 auto 12px", borderRadius: "50%", background: "rgba(155, 171, 193, 0.08)", display: "grid", placeItems: "center", color: "#8a97ab" }}>
                    <Inbox size={24} aria-hidden="true" />
                  </div>
                  <h3 style={{ margin: "0 0 6px", fontSize: "15px" }}>No messages received yet</h3>
                  <p style={{ margin: 0, color: "#8a97ab", fontSize: "12px" }}>
                    Portfolio par jaakar contact form submit karke test kar sakte hain. Data turant yahan dikhega.
                  </p>
                </div>
              ) : (
                <div style={{ display: "grid", gap: "14px" }}>
                  {messages.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        padding: "20px",
                        background: item.is_read
                          ? "linear-gradient(145deg, rgba(16, 23, 34, 0.7), rgba(11, 16, 25, 0.6))"
                          : "linear-gradient(145deg, rgba(20, 29, 43, 0.95), rgba(14, 21, 31, 0.9))",
                        border: item.is_read
                          ? "1px solid rgba(155, 171, 193, 0.12)"
                          : "1px solid rgba(255, 103, 93, 0.35)",
                        borderRadius: "10px",
                        position: "relative",
                        transition: "border-color .2s",
                      }}
                    >
                      {/* Top Meta */}
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "12px" }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <strong style={{ fontSize: "15px", color: "#edf1f6" }}>{item.name}</strong>
                            {!item.is_read && (
                              <span style={{ padding: "2px 8px", background: "rgba(255, 103, 93, 0.15)", border: "1px solid rgba(255, 103, 93, 0.3)", borderRadius: "4px", fontSize: "10px", color: "#ff7a70", fontWeight: "700" }}>
                                NEW
                              </span>
                            )}
                          </div>
                          <div style={{ marginTop: "4px", fontSize: "12px", color: "#8a97ab", display: "flex", alignItems: "center", gap: "8px" }}>
                            <span>Email:</span>
                            <a href={`mailto:${item.email}?subject=Re: Your portfolio inquiry`} style={{ color: "#38bdf8", textDecoration: "none" }}>
                              {item.email}
                            </a>
                            <button
                              type="button"
                              onClick={() => handleCopyEmail(item.email)}
                              style={{ background: "none", border: "none", color: "#8a97ab", cursor: "pointer", padding: "0 4px", display: "inline-flex", alignItems: "center" }}
                              title="Copy email address"
                            >
                              <Copy size={12} />
                            </button>
                          </div>
                        </div>

                        <div style={{ textAlign: "right" }}>
                          <span style={{ fontSize: "11px", color: "#748296" }}>
                            {new Date(item.created_at).toLocaleString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Pill Tags: Topic & Budget */}
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
                        <span style={{ padding: "4px 9px", background: "rgba(155, 171, 193, 0.08)", border: "1px solid rgba(155, 171, 193, 0.14)", borderRadius: "6px", fontSize: "11px", color: "#c4cedb" }}>
                          Topic: <strong>{item.project_type}</strong>
                        </span>
                        <span style={{ padding: "4px 9px", background: "rgba(155, 171, 193, 0.08)", border: "1px solid rgba(155, 171, 193, 0.14)", borderRadius: "6px", fontSize: "11px", color: "#c4cedb" }}>
                          Budget: <strong>{item.budget}</strong>
                        </span>
                      </div>

                      {/* Message Body */}
                      <div style={{ padding: "14px", background: "rgba(7, 12, 20, 0.5)", border: "1px solid rgba(155, 171, 193, 0.1)", borderRadius: "8px", fontSize: "13px", lineHeight: "1.6", color: "#d2dbe7", whiteSpace: "pre-wrap" }}>
                        {item.message}
                      </div>

                      {/* Action Bar */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "10px", marginTop: "14px" }}>
                        <a
                          href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.project_type)}&body=Hi ${encodeURIComponent(item.name)},%0D%0A%0D%0AThanks for reaching out!`}
                          style={{ padding: "6px 12px", background: "#ff675d", color: "#fff", textDecoration: "none", borderRadius: "6px", fontSize: "11px", fontWeight: "650", display: "inline-flex", alignItems: "center", gap: "6px" }}
                        >
                          <Mail size={12} aria-hidden="true" />
                          <span>Reply</span>
                        </a>
                        {!item.is_read && (
                          <button
                            type="button"
                            onClick={() => handleMarkRead(item.id)}
                            style={{ padding: "6px 12px", background: "rgba(155, 171, 193, 0.1)", color: "#c4cedb", border: "1px solid rgba(155, 171, 193, 0.2)", borderRadius: "6px", fontSize: "11px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}
                          >
                            <CheckCircle2 size={12} aria-hidden="true" />
                            <span>Mark Read</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          style={{ padding: "6px 12px", background: "rgba(255, 103, 93, 0.08)", color: "#ff7a70", border: "1px solid rgba(255, 103, 93, 0.25)", borderRadius: "6px", fontSize: "11px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}
                        >
                          <Trash2 size={12} aria-hidden="true" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
