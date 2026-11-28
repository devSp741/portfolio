"use client";

import { Search, X } from "../icons";
import { MessageFilterStatus } from "./types";

interface AdminMessageFiltersProps {
  searchQuery: string;
  filterStatus: MessageFilterStatus;
  counts: {
    all: number;
    unread: number;
    read: number;
  };
  onSearchChange: (value: string) => void;
  onFilterChange: (filter: MessageFilterStatus) => void;
}

const FILTER_TABS: { id: MessageFilterStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "read", label: "Read" },
];

/**
 * Search and status filter toolbar for narrowing down contact messages.
 */
export function AdminMessageFilters({
  searchQuery,
  filterStatus,
  counts,
  onSearchChange,
  onFilterChange,
}: AdminMessageFiltersProps) {
  return (
    <div className="admin-filters-bar">
      <div className="admin-search-wrap">
        <Search size={14} className="admin-search-icon" aria-hidden="true" />
        <input
          type="search"
          className="admin-search-input"
          placeholder="Search name, email, topic, or message..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search messages"
        />
        {searchQuery && (
          <button
            type="button"
            className="admin-search-clear"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
          >
            <X size={13} />
          </button>
        )}
      </div>

      <div className="admin-filter-tabs" role="tablist" aria-label="Filter messages by status">
        {FILTER_TABS.map((tab) => {
          const isActive = filterStatus === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onFilterChange(tab.id)}
              className={`admin-filter-tab${isActive ? " active" : ""}`}
            >
              <span>{tab.label}</span>
              <span className="admin-filter-count">{counts[tab.id]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

