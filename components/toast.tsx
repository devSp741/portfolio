"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Sparkles, X } from "./icons";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextValue {
  toast: {
    success: (title: string, description?: string) => void;
    error: (title: string, description?: string) => void;
    info: (title: string, description?: string) => void;
  };
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, title: string, description?: string) => {
      const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const newToast: ToastItem = { id, type, title, description };

      setToasts((prev) => [...prev.slice(-3), newToast]); // keep at most 4 toasts

      setTimeout(() => {
        removeToast(id);
      }, 4500);
    },
    [removeToast]
  );

  const toastMethods = {
    success: (title: string, description?: string) => addToast("success", title, description),
    error: (title: string, description?: string) => addToast("error", title, description),
    info: (title: string, description?: string) => addToast("info", title, description),
  };

  return (
    <ToastContext.Provider value={{ toast: toastMethods }}>
      {children}

      {/* Floating Toast Viewport */}
      <div
        className="toast-container"
        aria-live="polite"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "380px",
          width: "calc(100vw - 32px)",
          pointerEvents: "none",
        }}
      >
        {toasts.map((item) => (
          <div
            key={item.id}
            className={`toast-item toast-${item.type}`}
            style={{
              pointerEvents: "auto",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              padding: "14px 16px",
              borderRadius: "12px",
              background: "rgba(16, 23, 34, 0.94)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border:
                item.type === "success"
                  ? "1px solid rgba(82, 196, 26, 0.35)"
                  : item.type === "error"
                  ? "1px solid rgba(255, 103, 93, 0.4)"
                  : "1px solid rgba(56, 189, 248, 0.35)",
              boxShadow: "0 14px 35px rgba(0, 0, 0, 0.55)",
              color: "#edf1f6",
              animation: "toast-slide-up 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                marginTop: "1px",
                color:
                  item.type === "success"
                    ? "#52c41a"
                    : item.type === "error"
                    ? "#ff675d"
                    : "#38bdf8",
              }}
            >
              {item.type === "success" && <CheckCircle2 size={18} />}
              {item.type === "error" && <AlertCircle size={18} />}
              {item.type === "info" && <Sparkles size={18} />}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "13px", fontWeight: "650", color: "#edf1f6", lineHeight: "1.3" }}>
                {item.title}
              </div>
              {item.description && (
                <div style={{ fontSize: "11px", color: "#9daabd", marginTop: "4px", lineHeight: "1.4" }}>
                  {item.description}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => removeToast(item.id)}
              aria-label="Close notification"
              style={{
                flexShrink: 0,
                background: "transparent",
                border: "none",
                color: "#748296",
                cursor: "pointer",
                padding: "2px",
                borderRadius: "4px",
                display: "grid",
                placeItems: "center",
              }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context.toast;
}

