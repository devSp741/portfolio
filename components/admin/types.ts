export type AdminSectionId = "inbox" | "analytics" | "database" | "settings";

export type MessageFilterStatus = "all" | "unread" | "read";

export interface AdminNavItem {
  id: AdminSectionId;
  label: string;
  description: string;
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    id: "inbox",
    label: "Inbox",
    description: "Manage contact form submissions and reply directly",
  },
  {
    id: "analytics",
    label: "Insights",
    description: "Breakdown of topics, estimated budgets, and response rate",
  },
  {
    id: "database",
    label: "Database",
    description: "Supabase connection status, table SQL, and env guide",
  },
  {
    id: "settings",
    label: "Site Config",
    description: "Centralized portfolio identity, email, and social links",
  },
];

