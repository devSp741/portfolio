"use client";

import { useRef, useState } from "react";
import contactData from "../data/contact.json";
import siteData from "../data/site.json";
import { ArrowRight, GitHubIcon, InstagramIcon, LinkedInIcon, Mail, MapPin, Sparkles } from "./icons";
import { useToast } from "./toast";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CLIENT_TIMEOUT_MS = 15000;

export function Contact() {
  const { kicker, title, titleBreak, description, form } = contactData;
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: form.projectTypes[0] || "General enquiry",
    budget: form.budgets[0] || "Not decided",
    message: "",
    honeypot: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const renderDetailIcon = (iconName: string) => {
    switch (iconName) {
      case "mail":
        return <Mail size={15} />;
      case "map-pin":
        return <MapPin size={15} />;
      case "clock":
        return <Sparkles size={15} />;
      case "github":
        return <GitHubIcon size={15} />;
      case "linkedin":
        return <LinkedInIcon size={15} />;
      case "instagram":
        return <InstagramIcon size={15} />;
      default:
        return <Mail size={15} />;
    }
  };

  // Centralized contact cards mapped directly from siteData
  const activeDetails = [
    {
      id: "email",
      icon: "mail",
      label: "Email",
      value: siteData.brand.email,
      note: "Direct message",
      href: `mailto:${siteData.brand.email}`,
    },
    {
      id: "linkedin",
      icon: "linkedin",
      label: "LinkedIn",
      value: "in/satyamprajapati07575",
      note: "Professional profile",
      href: siteData.socials.find((s) => s.id === "linkedin")?.url || "https://in.linkedin.com/in/satyamprajapati07575",
    },
    {
      id: "instagram",
      icon: "instagram",
      label: "Instagram",
      value: "@satyam07575",
      note: "Follow on Instagram",
      href: siteData.socials.find((s) => s.id === "instagram")?.url || "https://www.instagram.com/satyam07575",
    },
    {
      id: "github",
      icon: "github",
      label: "GitHub",
      value: "devSp741",
      note: "Code & experiments",
      href: siteData.socials.find((s) => s.id === "github")?.url || "https://github.com/devSp741",
    },
    {
      id: "location",
      icon: "map-pin",
      label: "Location",
      value: siteData.brand.location,
      note: "Remote & On-site",
      href: null,
    },
    {
      id: "status",
      icon: "clock",
      label: "Status",
      value: siteData.brand.availability,
      note: "Full-time & contract",
      href: null,
    },
  ];

  const validateFields = (): FieldErrors => {
    const errors: FieldErrors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || trimmedName.length < 2) {
      errors.name = "Please enter your name (at least 2 characters).";
    }
    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address (e.g. name@example.com).";
    }
    if (!trimmedMessage || trimmedMessage.length < 5) {
      errors.message = "Please enter your message (at least 5 characters).";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    // If an extension or bot populated the hidden trap field, notify clearly instead of failing silently
    if (formData.honeypot.trim() !== "") {
      toast.error(
        "Spam check blocked submission",
        "A hidden anti-spam field was filled (possibly by a browser extension). Please refresh the page or email directly."
      );
      return;
    }

    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);

      const firstError = errors.name || errors.email || errors.message;
      toast.error("Please check your details", firstError);

      if (errors.name) nameRef.current?.focus();
      else if (errors.email) emailRef.current?.focus();
      else if (errors.message) messageRef.current?.focus();
      return;
    }

    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      toast.error(
        "No Internet Connection",
        "You appear to be offline. Please check your connection and try again."
      );
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      const rawText = await response.text();
      let data: { success?: boolean; error?: string; message?: string } = {};
      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch {
        data = {};
      }

      if (!response.ok || !data.success) {
        const fallbackReason =
          response.status >= 500
            ? `Server error (${response.status}). The backend or database may be temporarily busy — please retry or email directly.`
            : `Unable to send message (status ${response.status}).`;
        throw new Error(data.error || fallbackReason);
      }

      toast.success(
        "Message Sent Successfully!",
        data.message || "Thank you! Your message has been received. I will get back to you soon."
      );

      setFormData({
        name: "",
        email: "",
        projectType: form.projectTypes[0] || "General enquiry",
        budget: form.budgets[0] || "Not decided",
        message: "",
        honeypot: "",
      });
    } catch (err: unknown) {
      let errTitle = "Message Not Sent";
      let errMessage = "Unable to process message right now. Please try again or email directly.";

      if (err instanceof Error) {
        if (err.name === "AbortError") {
          errTitle = "Request Timed Out";
          errMessage = "Server took too long to respond (over 15s). Please try again or email directly.";
        } else if (err instanceof TypeError || /failed to fetch|networkerror/i.test(err.message)) {
          errTitle = "Connection Failed";
          errMessage = "Could not reach the server. Check your internet connection or refresh the page.";
        } else if (err.message) {
          errMessage = err.message;
        }
      }

      toast.error(errTitle, errMessage);
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container contact-layout">
        <div className="contact-copy">
          <p className="section-kicker">{kicker}</p>
          <h2 className="section-title">
            {title}
            <br />
            {titleBreak}
          </h2>
          <p className="section-copy">{description}</p>

          <div className="contact-details">
            {activeDetails.map((detail) => {
              const inner = (
                <>
                  <span className="contact-detail-icon" aria-hidden="true">
                    {renderDetailIcon(detail.icon)}
                  </span>
                  <span className="contact-detail-text">
                    <strong>{detail.value}</strong>
                    <span>
                      {detail.label} · {detail.note}
                    </span>
                  </span>
                </>
              );

              if (detail.href) {
                return (
                  <a
                    key={detail.id}
                    className="contact-detail"
                    href={detail.href}
                    target={detail.href.startsWith("http") ? "_blank" : undefined}
                    rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {inner}
                  </a>
                );
              }

              return (
                <div key={detail.id} className="contact-detail">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>

        <div className="contact-form-panel">
          <div className="form-header">
            <h3>{form.headerTitle}</h3>
            <span>{form.headerNote}</span>
          </div>

          <form id="contact-form" onSubmit={handleSubmit} noValidate>
            {/* Anti-spam honeypot configured with non-semantic name so browser autofill ignores it */}
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="contact_hp_x7k">Verification</label>
              <input
                id="contact_hp_x7k"
                name="contact_hp_x7k"
                type="text"
                tabIndex={-1}
                autoComplete="new-password"
                data-lpignore="true"
                data-1p-ignore="true"
                data-bwignore="true"
                data-form-type="other"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              />
            </div>

            <div className="form-grid">
              <div className={`field${fieldErrors.name ? " has-error" : ""}`}>
                <label htmlFor="name">
                  Your name <span>*</span>
                </label>
                <input
                  ref={nameRef}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(fieldErrors.name)}
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                />
                {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
              </div>

              <div className={`field${fieldErrors.email ? " has-error" : ""}`}>
                <label htmlFor="email">
                  Email address <span>*</span>
                </label>
                <input
                  ref={emailRef}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(fieldErrors.email)}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                />
                {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
              </div>

              <div className="field">
                <label htmlFor="project-type">What do you need?</label>
                <select
                  id="project-type"
                  name="project-type"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                >
                  {form.projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="budget">Estimated budget</label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                >
                  {form.budgets.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className={`field full${fieldErrors.message ? " has-error" : ""}`}>
                <label htmlFor="message">
                  Project details <span>*</span>
                </label>
                <textarea
                  ref={messageRef}
                  id="message"
                  name="message"
                  placeholder="A little context about your project, goals, timeline or problem..."
                  required
                  aria-invalid={Boolean(fieldErrors.message)}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (fieldErrors.message) setFieldErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                />
                {fieldErrors.message && <span className="field-error">{fieldErrors.message}</span>}
              </div>
            </div>

            <div className="form-bottom">
              <p className="form-note">{form.note}</p>
              <button
                className="btn btn-primary form-submit"
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="btn-spinner" aria-hidden="true" />
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <span>{form.submitLabel}</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
