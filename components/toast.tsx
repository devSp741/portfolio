"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, useRef, useEffect } from "react";
import { CheckCircle2, AlertCircle, Sparkles, X } from "./icons";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration: number;
}

interface ToastContextValue {
  toast: {
    success: (title: string, description?: string) => void;
    error: (title: string, description?: string) => void;
    info: (title: string, description?: string) => void;
  };
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATIONS: Record<ToastType, number> = {
  success: 5500,
  error: 7500,
  info: 4500,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, title: string, description?: string) => {
      const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const duration = TOAST_DURATIONS[type];
      const newToast: ToastItem = { id, type, title, description, duration };

      setToasts((prev) => {
        // Clear timer if oldest toast is evicted when exceeding 4 toasts
        if (prev.length >= 4) {
          const evicted = prev.slice(0, prev.length - 3);
          evicted.forEach((old) => {
            const oldTimer = timersRef.current.get(old.id);
            if (oldTimer) {
              clearTimeout(oldTimer);
              timersRef.current.delete(old.id);
            }
          });
        }
        return [...prev.slice(-3), newToast];
      });

      const timer = setTimeout(() => {
        removeToast(id);
      }, duration);
      timersRef.current.set(id, timer);
    },
    [removeToast]
  );

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  const toastMethods = useMemo(
    () => ({
      success: (title: string, description?: string) => addToast("success", title, description),
      error: (title: string, description?: string) => addToast("error", title, description),
      info: (title: string, description?: string) => addToast("info", title, description),
    }),
    [addToast]
  );

  return (
    <ToastContext.Provider value={{ toast: toastMethods }}>
      {children}

      {/* Responsive Floating Toaster Viewport */}
      <div className="toast-container" aria-live="polite" aria-atomic="true">
        {toasts.map((item) => (
          <div
            key={item.id}
            role={item.type === "error" ? "alert" : "status"}
            className={`toast-item toast-${item.type}`}
          >
            <div className="toast-icon" aria-hidden="true">
              {item.type === "success" && <CheckCircle2 size={19} />}
              {item.type === "error" && <AlertCircle size={19} />}
              {item.type === "info" && <Sparkles size={19} />}
            </div>

            <div className="toast-body">
              <div className="toast-title">{item.title}</div>
              {item.description && <div className="toast-desc">{item.description}</div>}
            </div>

            <button
              type="button"
              className="toast-close"
              onClick={() => removeToast(item.id)}
              aria-label="Close notification"
            >
              <X size={14} />
            </button>

            <span
              className="toast-progress"
              style={{ animationDuration: `${item.duration}ms` }}
              aria-hidden="true"
            />
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
