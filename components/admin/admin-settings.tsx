"use client";

import siteData from "../../data/site.json";
import { ExternalLink, Globe, Mail, ShieldCheck } from "../icons";

/**
 * Centralized overview of portfolio branding, contact email, social links, and admin security notes.
 */
export function AdminSettings() {
  const { brand, socials, siteUrl } = siteData;

  return (
    <div className="admin-section">
      <div className="admin-settings-grid">
        <div className="admin-panel-card">
          <div className="admin-panel-head">
            <div className="admin-panel-title-group">
              <Globe size={15} aria-hidden="true" />
              <h3>Centralized Brand Config</h3>
            </div>
            <code>data/site.json</code>
          </div>

          <dl className="admin-kv-list">
            <div>
              <dt>Full Name</dt>
              <dd>{brand.fullName}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{brand.role}</dd>
            </div>
            <div>
              <dt>Primary Email</dt>
              <dd>{brand.email}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{brand.location}</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>{brand.availability}</dd>
            </div>
            <div>
              <dt>Live URL</dt>
              <dd>
                <a href={siteUrl} target="_blank" rel="noopener noreferrer" className="admin-link">
                  <span>{siteUrl}</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="admin-panel-card">
          <div className="admin-panel-head">
            <div className="admin-panel-title-group">
              <Mail size={15} aria-hidden="true" />
              <h3>Connected Social Links</h3>
            </div>
            <span>{socials.length} active</span>
          </div>

          <div className="admin-socials-list">
            {socials.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target={item.url.startsWith("http") ? "_blank" : undefined}
                rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="admin-social-row"
              >
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.value}</span>
                </div>
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-panel-card">
        <div className="admin-panel-head">
          <div className="admin-panel-title-group">
            <ShieldCheck size={15} aria-hidden="true" />
            <h3>Security & Passcode Management</h3>
          </div>
          <span>Environment Protected</span>
        </div>
        <p className="admin-panel-sub">
          Admin passcode is verified server-side via <code>ADMIN_SECRET</code>. Local testing ke liye{" "}
          <code>.env.local</code> update karein aur production me{" "}
          <strong>Vercel Project Settings &rarr; Environment Variables</strong> update karein.
        </p>
      </div>
    </div>
  );
}

