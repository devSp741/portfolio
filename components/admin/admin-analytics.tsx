"use client";

import { useMemo } from "react";
import { ContactMessage } from "../../lib/messages";

interface AdminAnalyticsProps {
  messages: ContactMessage[];
}

interface BreakdownRow {
  label: string;
  count: number;
  percent: number;
}

function buildBreakdown(items: string[], total: number): BreakdownRow[] {
  if (total === 0) return [];
  const map = new Map<string, number>();
  items.forEach((key) => {
    const label = key?.trim() || "Unspecified";
    map.set(label, (map.get(label) || 0) + 1);
  });

  return Array.from(map.entries())
    .map(([label, count]) => ({
      label,
      count,
      percent: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Displays real-time breakdown of inquiry topics, budgets, and review completion.
 */
export function AdminAnalytics({ messages }: AdminAnalyticsProps) {
  const total = messages.length;
  const unread = useMemo(() => messages.filter((m) => !m.is_read).length, [messages]);
  const readRate = total > 0 ? Math.round(((total - unread) / total) * 100) : 0;

  const topicBreakdown = useMemo(
    () => buildBreakdown(messages.map((m) => m.project_type), total),
    [messages, total]
  );

  const budgetBreakdown = useMemo(
    () => buildBreakdown(messages.map((m) => m.budget), total),
    [messages, total]
  );

  return (
    <div className="admin-section">
      <div className="admin-analytics-summary">
        <div className="admin-panel-card">
          <span className="admin-stat-label">Total Inquiries Tracked</span>
          <strong className="admin-stat-value">{total}</strong>
          <p className="admin-panel-sub">All active inquiries currently stored in your backend.</p>
        </div>

        <div className="admin-panel-card">
          <span className="admin-stat-label">Review Completion</span>
          <strong className="admin-stat-value ok">{readRate}%</strong>
          <p className="admin-panel-sub">
            {total - unread} of {total} inquiries marked as read.
          </p>
        </div>

        <div className="admin-panel-card">
          <span className="admin-stat-label">Top Inquiry Category</span>
          <strong className="admin-panel-highlight">
            {topicBreakdown[0]?.label || "No data yet"}
          </strong>
          <p className="admin-panel-sub">
            {topicBreakdown[0] ? `${topicBreakdown[0].count} requests` : "Waiting for submissions"}
          </p>
        </div>
      </div>

      <div className="admin-analytics-grid">
        <div className="admin-panel-card">
          <div className="admin-panel-head">
            <h3>Project Topics</h3>
            <span>{topicBreakdown.length} categories</span>
          </div>

          {topicBreakdown.length === 0 ? (
            <p className="admin-panel-empty">No inquiry data available yet.</p>
          ) : (
            <div className="admin-bars-list">
              {topicBreakdown.map((row) => (
                <div key={row.label} className="admin-bar-row">
                  <div className="admin-bar-labels">
                    <span>{row.label}</span>
                    <strong>
                      {row.count} ({row.percent}%)
                    </strong>
                  </div>
                  <div className="admin-bar-track">
                    <div className="admin-bar-fill" style={{ width: `${row.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="admin-panel-card">
          <div className="admin-panel-head">
            <h3>Budget Ranges</h3>
            <span>{budgetBreakdown.length} tiers</span>
          </div>

          {budgetBreakdown.length === 0 ? (
            <p className="admin-panel-empty">No budget data available yet.</p>
          ) : (
            <div className="admin-bars-list">
              {budgetBreakdown.map((row) => (
                <div key={row.label} className="admin-bar-row">
                  <div className="admin-bar-labels">
                    <span>{row.label}</span>
                    <strong>
                      {row.count} ({row.percent}%)
                    </strong>
                  </div>
                  <div className="admin-bar-track">
                    <div className="admin-bar-fill secondary" style={{ width: `${row.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

