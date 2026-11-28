"use client";

import { MessageFilterStatus } from "./types";

interface AdminStatsProps {
  total: number;
  unread: number;
  read: number;
  isSupabaseConnected: boolean;
  activeFilter: MessageFilterStatus;
  onSelectFilter: (filter: MessageFilterStatus) => void;
}

/**
 * Summary metric cards at the top of the Inbox; clicking filters messages directly.
 */
export function AdminStats({
  total,
  unread,
  read,
  isSupabaseConnected,
  activeFilter,
  onSelectFilter,
}: AdminStatsProps) {
  return (
    <div className="admin-stats-grid">
      <button
        type="button"
        onClick={() => onSelectFilter("all")}
        className={`admin-stat-card${activeFilter === "all" ? " selected" : ""}`}
      >
        <span className="admin-stat-label">Total Inquiries</span>
        <strong className="admin-stat-value">{total}</strong>
        <span className="admin-stat-hint">All received messages</span>
      </button>

      <button
        type="button"
        onClick={() => onSelectFilter("unread")}
        className={`admin-stat-card${activeFilter === "unread" ? " selected" : ""}`}
      >
        <span className="admin-stat-label">Unread</span>
        <strong className={`admin-stat-value ${unread > 0 ? "accent" : "ok"}`}>
          {unread}
        </strong>
        <span className="admin-stat-hint">
          {unread > 0 ? "Needs your reply" : "All caught up"}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onSelectFilter("read")}
        className={`admin-stat-card${activeFilter === "read" ? " selected" : ""}`}
      >
        <span className="admin-stat-label">Reviewed</span>
        <strong className="admin-stat-value">{read}</strong>
        <span className="admin-stat-hint">Marked as read</span>
      </button>

      <div className="admin-stat-card static">
        <span className="admin-stat-label">Storage Engine</span>
        <div className="admin-stat-storage">
          <span
            className={`admin-status-dot ${isSupabaseConnected ? "live" : "demo"}`}
            aria-hidden="true"
          />
          <strong>{isSupabaseConnected ? "Supabase DB" : "In-Memory"}</strong>
        </div>
        <span className="admin-stat-hint">
          {isSupabaseConnected ? "Persistent cloud PostgreSQL" : "Temporary demo memory"}
        </span>
      </div>
    </div>
  );
}

