"use client";

import { useState } from "react";
import Link from "next/link";
import siteData from "../../data/site.json";
import { ArrowLeft, Eye, EyeOff, Lock, ShieldCheck } from "../icons";

interface AdminLoginProps {
  onLogin: (passcode: string) => Promise<{ success: boolean; error?: string }>;
}

/**
 * Centered authentication gate for the admin console.
 */
export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inlineError, setInlineError] = useState("");
  const { brand } = siteData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim() || isSubmitting) return;

    setInlineError("");
    setIsSubmitting(true);
    const result = await onLogin(passcode);
    setIsSubmitting(false);

    if (result.success) {
      setPasscode("");
    } else {
      setInlineError(result.error || "Invalid passcode. Please check ADMIN_SECRET.");
    }
  };

  return (
    <div className="admin-login-screen">
      <div className="admin-login-card">
        <div className="admin-login-top">
          <Link href="/" className="admin-brand" aria-label={`${brand.fullName} portfolio`}>
            <span>{brand.monogramFirst}</span>
            <span className="admin-brand-accent">{brand.monogramSecond}</span>
          </Link>
          <Link href="/" className="admin-btn admin-btn-ghost">
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Back to Site</span>
          </Link>
        </div>

        <div className="admin-login-head">
          <div className="admin-login-badge" aria-hidden="true">
            <Lock size={20} />
          </div>
          <h1>Admin Console</h1>
          <p>Sign in with your configured admin secret key to manage inquiries and site health.</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-field">
            <label htmlFor="admin-passcode">Admin Passcode</label>
            <div className="admin-input-wrap">
              <input
                id="admin-passcode"
                type={showPasscode ? "text" : "password"}
                placeholder="Enter ADMIN_SECRET passcode"
                autoComplete="current-password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (inlineError) setInlineError("");
                }}
                required
              />
              <button
                type="button"
                className="admin-eye-btn"
                onClick={() => setShowPasscode((prev) => !prev)}
                aria-label={showPasscode ? "Hide passcode" : "Show passcode"}
              >
                {showPasscode ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {inlineError && <p className="admin-field-error">{inlineError}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="admin-btn admin-btn-primary admin-login-submit"
          >
            {isSubmitting ? (
              <>
                <span className="admin-spinner" aria-hidden="true" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={15} aria-hidden="true" />
                <span>Unlock Admin Panel</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

