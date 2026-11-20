"use client";

import { useState } from "react";
import contactData from "../data/contact.json";
import { ArrowRight, GitHubIcon, Mail, MapPin, Sparkles } from "./icons";
import { useToast } from "./toast";

export function Contact() {
  const { kicker, title, titleBreak, description, details, form } = contactData;
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: form.projectTypes[0] || "General enquiry",
    budget: form.budgets[0] || "Not decided",
    message: "",
    honeypot: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      default:
        return <Mail size={15} />;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) {
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Required fields missing", "Please fill in your name, email and message.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to send message.");
      }

      toast.success(
        "Message Sent Successfully!",
        "Thank you! Your message has been received. I will get back to you soon."
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
      const errMessage =
        err instanceof Error
          ? err.message
          : "Unable to process message right now. Please email directly.";
      toast.error("Failed to send", errMessage);
    } finally {
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
            {details.map((detail) => {
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
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="company-site">Leave this field empty</label>
              <input
                id="company-site"
                name="company-site"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              />
            </div>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="name">
                  Your name <span>*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="field">
                <label htmlFor="email">
                  Email address <span>*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
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

              <div className="field full">
                <label htmlFor="message">
                  Project details <span>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="A little context about your project, goals, timeline or problem..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
            </div>

            <div className="form-bottom">
              <p className="form-note">{form.note}</p>
              <button
                className="btn btn-primary form-submit"
                type="submit"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "Sending..." : form.submitLabel}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
