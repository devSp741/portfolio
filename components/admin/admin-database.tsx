"use client";

import { useState } from "react";
import { Check, Copy, Database, Terminal } from "../icons";
import { useToast } from "../toast";

interface AdminDatabaseProps {
  isSupabaseConnected: boolean;
  messageCount: number;
}

const SQL_MIGRATION = `create table if not exists contact_messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  project_type text default 'General enquiry',
  budget text default 'Not decided',
  message text not null,
  is_read boolean default false
);

alter table contact_messages enable row level security;

create policy "Allow public insert" on contact_messages
  for insert to anon, authenticated with check (true);
create policy "Allow read messages" on contact_messages
  for select to anon, authenticated using (true);
create policy "Allow update messages" on contact_messages
  for update to anon, authenticated using (true);
create policy "Allow delete messages" on contact_messages
  for delete to anon, authenticated using (true);`;

const ENV_KEYS = [
  { key: "SUPABASE_URL", desc: "Supabase project REST URL" },
  { key: "SUPABASE_KEY", desc: "Supabase publishable / service role key" },
  { key: "ADMIN_SECRET", desc: "Passcode required to unlock /admin console" },
  { key: "NEXT_PUBLIC_SITE_URL", desc: "Live canonical URL (https://satyam75.vercel.app)" },
];

/**
 * Displays live database health, required env checklist, and copyable SQL schema.
 */
export function AdminDatabase({ isSupabaseConnected, messageCount }: AdminDatabaseProps) {
  const [copiedSql, setCopiedSql] = useState(false);
  const toast = useToast();

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_MIGRATION);
    setCopiedSql(true);
    toast.success("SQL Copied", "Migration SQL copied to clipboard.");
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="admin-section">
      <div className="admin-panel-card">
        <div className="admin-db-status-row">
          <div className="admin-db-icon" aria-hidden="true">
            <Database size={20} />
          </div>
          <div>
            <h3>
              {isSupabaseConnected
                ? "Supabase PostgreSQL Connected"
                : "Running in In-Memory Demo Mode"}
            </h3>
            <p>
              {isSupabaseConnected
                ? `Cloud persistence active — ${messageCount} stored rows synced via REST API (8.5s timeout guard enabled).`
                : "Supabase environment variables not detected. Add keys to .env.local and Vercel to persist messages."}
            </p>
          </div>
          <span className={`admin-status-chip ${isSupabaseConnected ? "live" : "demo"}`}>
            <span className="admin-status-dot" aria-hidden="true" />
            <span>{isSupabaseConnected ? "Connected" : "Demo Mode"}</span>
          </span>
        </div>
      </div>

      <div className="admin-panel-card">
        <div className="admin-panel-head">
          <div className="admin-panel-title-group">
            <Terminal size={15} aria-hidden="true" />
            <h3>Database Schema (contact_messages)</h3>
          </div>
          <button
            type="button"
            onClick={handleCopySql}
            className="admin-btn admin-btn-secondary admin-btn-sm"
          >
            {copiedSql ? <Check size={13} /> : <Copy size={13} />}
            <span>{copiedSql ? "Copied" : "Copy SQL"}</span>
          </button>
        </div>

        <pre className="admin-code-block">{SQL_MIGRATION}</pre>
      </div>

      <div className="admin-panel-card">
        <div className="admin-panel-head">
          <h3>Required Environment Variables</h3>
          <span>.env.local / Vercel</span>
        </div>

        <div className="admin-env-list">
          {ENV_KEYS.map((item) => (
            <div key={item.key} className="admin-env-item">
              <code>{item.key}</code>
              <span>{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

