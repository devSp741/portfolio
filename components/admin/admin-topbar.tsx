"use client";

import { Menu, RefreshCw } from "../icons";
import { ADMIN_NAV_ITEMS, AdminSectionId } from "./types";

interface AdminTopbarProps {
  activeSection: AdminSectionId;
  isLoading: boolean;
  isSupabaseConnected: boolean;
  onOpenSidebar: () => void;
  onRefresh: () => void;
}

/**
 * Sticky top bar inside the main admin workspace with mobile drawer toggle and quick refresh.
 */
export function AdminTopbar({
  activeSection,
  isLoading,
  isSupabaseConnected,
  onOpenSidebar,
  onRefresh,
}: AdminTopbarProps) {
  const currentMeta = ADMIN_NAV_ITEMS.find((item) => item.id === activeSection) || ADMIN_NAV_ITEMS[0];

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        <button
          type="button"
          className="admin-menu-btn"
          onClick={onOpenSidebar}
          aria-label="Open navigation sidebar"
        >
          <Menu size={18} />
        </button>

        <div className="admin-topbar-title">
          <h1>{currentMeta.label}</h1>
          <p>{currentMeta.description}</p>
        </div>
      </div>

      <div className="admin-topbar-right">
        <div
          className={`admin-status-chip ${isSupabaseConnected ? "live" : "demo"}`}
          title={isSupabaseConnected ? "Connected to Supabase PostgreSQL" : "Demo in-memory mode"}
        >
          <span className="admin-status-dot" aria-hidden="true" />
          <span className="admin-status-label">
            {isSupabaseConnected ? "Supabase Live" : "Demo Store"}
          </span>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className="admin-btn admin-btn-secondary"
        >
          <RefreshCw size={14} className={isLoading ? "admin-spin" : ""} aria-hidden="true" />
          <span>{isLoading ? "Refreshing..." : "Refresh"}</span>
        </button>
      </div>
    </header>
  );
}

