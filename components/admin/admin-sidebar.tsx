"use client";

import { useEffect } from "react";
import Link from "next/link";
import siteData from "../../data/site.json";
import {
  BarChart3,
  Database,
  ExternalLink,
  Inbox,
  LogOut,
  Settings,
  X,
} from "../icons";
import { ADMIN_NAV_ITEMS, AdminSectionId } from "./types";

interface AdminSidebarProps {
  activeSection: AdminSectionId;
  unreadCount: number;
  isSupabaseConnected: boolean;
  isOpen: boolean;
  onSelectSection: (section: AdminSectionId) => void;
  onClose: () => void;
  onLogout: () => void;
}

const SECTION_ICONS: Record<AdminSectionId, React.ReactNode> = {
  inbox: <Inbox size={16} aria-hidden="true" />,
  analytics: <BarChart3 size={16} aria-hidden="true" />,
  database: <Database size={16} aria-hidden="true" />,
  settings: <Settings size={16} aria-hidden="true" />,
};

/**
 * Left navigation sidebar: sticky rail on desktop, off-canvas drawer on tablet/mobile.
 */
export function AdminSidebar({
  activeSection,
  unreadCount,
  isSupabaseConnected,
  isOpen,
  onSelectSection,
  onClose,
  onLogout,
}: AdminSidebarProps) {
  const { brand } = siteData;

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleNavClick = (sectionId: AdminSectionId) => {
    onSelectSection(sectionId);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`admin-sidebar${isOpen ? " open" : ""}`}
        aria-label="Admin sidebar navigation"
      >
        {/* Sidebar Header */}
        <div className="admin-sidebar-header">
          <Link href="/" className="admin-brand" aria-label="Portfolio Home">
            <span>{brand.monogramFirst}</span>
            <span className="admin-brand-accent">{brand.monogramSecond}</span>
            <span className="admin-brand-tag">Admin</span>
          </Link>

          <button
            type="button"
            className="admin-sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="admin-sidebar-scroll">
          <p className="admin-nav-label">Workspace</p>
          <nav className="admin-nav">
            {ADMIN_NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`admin-nav-item${isActive ? " active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="admin-nav-icon">{SECTION_ICONS[item.id]}</span>
                  <span className="admin-nav-text">{item.label}</span>
                  {item.id === "inbox" && unreadCount > 0 && (
                    <span className="admin-nav-badge">{unreadCount}</span>
                  )}
                  {item.id === "database" && (
                    <span
                      className={`admin-nav-dot ${isSupabaseConnected ? "online" : "offline"}`}
                      title={isSupabaseConnected ? "Supabase Connected" : "In-Memory Fallback"}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="admin-sidebar-footer">
          <div className="admin-owner-pill">
            <span className="admin-owner-avatar" aria-hidden="true">
              {brand.monogramFirst}
              {brand.monogramSecond}
            </span>
            <div className="admin-owner-meta">
              <strong>{brand.fullName}</strong>
              <span>{brand.email}</span>
            </div>
          </div>

          <div className="admin-sidebar-actions">
            <Link href="/" className="admin-btn admin-btn-ghost admin-btn-full">
              <ExternalLink size={14} aria-hidden="true" />
              <span>View Portfolio</span>
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="admin-btn admin-btn-danger admin-btn-full"
            >
              <LogOut size={14} aria-hidden="true" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

