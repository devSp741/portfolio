"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useAdminAuth } from "../../context/admin-auth-context";
import { ContactMessage } from "../../lib/messages";
import { useToast } from "../toast";
import { AdminAnalytics } from "./admin-analytics";
import { AdminDatabase } from "./admin-database";
import { AdminInbox } from "./admin-inbox";
import { AdminLogin } from "./admin-login";
import { AdminSettings } from "./admin-settings";
import { AdminSidebar } from "./admin-sidebar";
import { AdminTopbar } from "./admin-topbar";
import { AdminSectionId } from "./types";

const emptySubscribe = () => () => {};

/**
 * Root client shell orchestrating admin authentication, sidebar navigation, and active panel view.
 */
export function AdminShell() {
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const { isAuthenticated, login, logout, getAuthHeaders } = useAdminAuth();
  const toast = useToast();

  const [activeSection, setActiveSection] = useState<AdminSectionId>("inbox");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

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

  useEffect(() => {
    let isMounted = true;
    if (!isHydrated || !isAuthenticated) return;

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
        // Silent fallback when saved passcode is invalid
      });

    return () => {
      isMounted = false;
    };
  }, [isHydrated, isAuthenticated, getAuthHeaders, logout]);

  const handleLogin = async (code: string) => {
    const result = await login(code);
    if (result.success) {
      toast.success("Welcome Satyam!", "Admin console unlocked.");
    } else {
      toast.error("Authentication Failed", result.error || "Invalid passcode.");
    }
    return result;
  };

  const handleLogout = () => {
    logout();
    setMessages([]);
    setIsSidebarOpen(false);
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
      } else {
        throw new Error("Server rejected update.");
      }
    } catch {
      toast.error("Update Failed", "Could not update message status.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/messages?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        toast.info("Message Deleted", "The inquiry has been removed.");
      } else {
        throw new Error("Server rejected deletion.");
      }
    } catch {
      toast.error("Delete Failed", "Could not delete message.");
    }
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email Copied", email);
  };

  if (!isHydrated) {
    return <div className="admin-loading-screen" aria-hidden="true" />;
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="admin-layout">
      <AdminSidebar
        activeSection={activeSection}
        unreadCount={unreadCount}
        isSupabaseConnected={isSupabaseConnected}
        isOpen={isSidebarOpen}
        onSelectSection={setActiveSection}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <div className="admin-main">
        <AdminTopbar
          activeSection={activeSection}
          isLoading={isLoading}
          isSupabaseConnected={isSupabaseConnected}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onRefresh={() => fetchMessages(true)}
        />

        <main className="admin-content">
          {activeSection === "inbox" && (
            <AdminInbox
              messages={messages}
              isSupabaseConnected={isSupabaseConnected}
              onMarkRead={handleMarkRead}
              onDelete={handleDelete}
              onCopyEmail={handleCopyEmail}
              onOpenDatabase={() => setActiveSection("database")}
            />
          )}

          {activeSection === "analytics" && <AdminAnalytics messages={messages} />}

          {activeSection === "database" && (
            <AdminDatabase
              isSupabaseConnected={isSupabaseConnected}
              messageCount={messages.length}
            />
          )}

          {activeSection === "settings" && <AdminSettings />}
        </main>
      </div>
    </div>
  );
}

