"use client";

import { useMemo, useState } from "react";
import { ContactMessage } from "../../lib/messages";
import { Inbox } from "../icons";
import { AdminMessageCard } from "./admin-message-card";
import { AdminMessageFilters } from "./admin-message-filters";
import { AdminStats } from "./admin-stats";
import { MessageFilterStatus } from "./types";

interface AdminInboxProps {
  messages: ContactMessage[];
  isSupabaseConnected: boolean;
  onMarkRead: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onCopyEmail: (email: string) => void;
  onOpenDatabase: () => void;
}

/**
 * Primary inbox workspace composing KPI cards, search/status filters, and message cards.
 */
export function AdminInbox({
  messages,
  isSupabaseConnected,
  onMarkRead,
  onDelete,
  onCopyEmail,
  onOpenDatabase,
}: AdminInboxProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<MessageFilterStatus>("all");

  const unreadCount = useMemo(() => messages.filter((m) => !m.is_read).length, [messages]);
  const readCount = messages.length - unreadCount;

  const filteredMessages = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return messages.filter((item) => {
      if (filterStatus === "unread" && item.is_read) return false;
      if (filterStatus === "read" && !item.is_read) return false;
      if (!query) return true;

      return (
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.project_type.toLowerCase().includes(query) ||
        item.budget.toLowerCase().includes(query) ||
        item.message.toLowerCase().includes(query)
      );
    });
  }, [messages, filterStatus, searchQuery]);

  return (
    <div className="admin-section">
      <AdminStats
        total={messages.length}
        unread={unreadCount}
        read={readCount}
        isSupabaseConnected={isSupabaseConnected}
        activeFilter={filterStatus}
        onSelectFilter={setFilterStatus}
      />

      {!isSupabaseConnected && (
        <div className="admin-warning-banner">
          <div>
            <strong>Demo Storage Mode Active</strong>
            <p>
              Messages temporary server RAM me save ho rahe hain. Permanent cloud storage ke liye Supabase keys configure karein.
            </p>
          </div>
          <button type="button" onClick={onOpenDatabase} className="admin-btn admin-btn-warning">
            <span>View Setup Guide</span>
          </button>
        </div>
      )}

      <AdminMessageFilters
        searchQuery={searchQuery}
        filterStatus={filterStatus}
        counts={{
          all: messages.length,
          unread: unreadCount,
          read: readCount,
        }}
        onSearchChange={setSearchQuery}
        onFilterChange={setFilterStatus}
      />

      <div className="admin-list-head">
        <h2>
          Submissions <span>({filteredMessages.length})</span>
        </h2>
      </div>

      {filteredMessages.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-icon" aria-hidden="true">
            <Inbox size={22} />
          </div>
          <h3>
            {messages.length === 0
              ? "No messages received yet"
              : "No matching messages found"}
          </h3>
          <p>
            {messages.length === 0
              ? "Portfolio contact form se message bhej kar test karein — data turant yahan dikhega."
              : "Search query ya filter tab change karke dobara check karein."}
          </p>
          {(searchQuery || filterStatus !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setFilterStatus("all");
              }}
              className="admin-btn admin-btn-secondary admin-btn-sm"
            >
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      ) : (
        <div className="admin-msg-list">
          {filteredMessages.map((item) => (
            <AdminMessageCard
              key={item.id}
              message={item}
              onMarkRead={onMarkRead}
              onDelete={onDelete}
              onCopyEmail={onCopyEmail}
            />
          ))}
        </div>
      )}
    </div>
  );
}

