"use client";

import { useState } from "react";
import { ContactMessage } from "../../lib/messages";
import { Check, CheckCircle2, Copy, Mail, Trash2 } from "../icons";

interface AdminMessageCardProps {
  message: ContactMessage;
  onMarkRead: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onCopyEmail: (email: string) => void;
}

/**
 * Displays a single contact inquiry with quick reply, copy email, mark read, and inline delete confirmation.
 */
export function AdminMessageCard({
  message,
  onMarkRead,
  onDelete,
  onCopyEmail,
}: AdminMessageCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  const handleCopy = () => {
    onCopyEmail(message.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleMarkReadClick = async () => {
    setIsBusy(true);
    await onMarkRead(message.id);
    setIsBusy(false);
  };

  const handleConfirmDelete = async () => {
    setIsBusy(true);
    await onDelete(message.id);
    setIsBusy(false);
  };

  const formattedDate = new Date(message.created_at).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className={`admin-msg-card${message.is_read ? " read" : " unread"}`}>
      <div className="admin-msg-header">
        <div className="admin-msg-sender">
          <div className="admin-msg-name-row">
            <strong>{message.name}</strong>
            {!message.is_read && <span className="admin-unread-pill">NEW</span>}
          </div>

          <div className="admin-msg-email-row">
            <a
              href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.project_type}`)}`}
              className="admin-msg-email"
            >
              {message.email}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="admin-icon-btn"
              title="Copy email address"
              aria-label={`Copy ${message.email}`}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
            </button>
          </div>
        </div>

        <time className="admin-msg-date" dateTime={message.created_at}>
          {formattedDate}
        </time>
      </div>

      <div className="admin-msg-meta">
        <span className="admin-meta-pill">
          Topic: <strong>{message.project_type}</strong>
        </span>
        <span className="admin-meta-pill">
          Budget: <strong>{message.budget}</strong>
        </span>
      </div>

      <div className="admin-msg-body">{message.message}</div>

      <div className="admin-msg-actions">
        <a
          href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.project_type}`)}&body=${encodeURIComponent(`Hi ${message.name},\n\nThanks for reaching out!`)}`}
          className="admin-btn admin-btn-primary admin-btn-sm"
        >
          <Mail size={13} aria-hidden="true" />
          <span>Reply</span>
        </a>

        {!message.is_read && (
          <button
            type="button"
            disabled={isBusy}
            onClick={handleMarkReadClick}
            className="admin-btn admin-btn-secondary admin-btn-sm"
          >
            <CheckCircle2 size={13} aria-hidden="true" />
            <span>Mark Read</span>
          </button>
        )}

        {confirmDelete ? (
          <div className="admin-delete-confirm">
            <button
              type="button"
              disabled={isBusy}
              onClick={handleConfirmDelete}
              className="admin-btn admin-btn-danger admin-btn-sm"
            >
              <span>{isBusy ? "Deleting..." : "Confirm Delete"}</span>
            </button>
            <button
              type="button"
              disabled={isBusy}
              onClick={() => setConfirmDelete(false)}
              className="admin-btn admin-btn-ghost admin-btn-sm"
            >
              <span>Cancel</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={isBusy}
            onClick={() => setConfirmDelete(true)}
            className="admin-btn admin-btn-danger admin-btn-sm"
          >
            <Trash2 size={13} aria-hidden="true" />
            <span>Delete</span>
          </button>
        )}
      </div>
    </article>
  );
}

