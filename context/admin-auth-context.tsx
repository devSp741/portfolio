"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface AdminAuthContextValue {
  isAuthenticated: boolean;
  passcode: string;
  login: (code: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getAuthHeaders: () => Record<string, string>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

const STORAGE_KEY = "satyam_admin_passcode";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  // Initialize directly from localStorage to prevent cascading re-renders and stay logged in
  const [passcode, setPasscode] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem(STORAGE_KEY) || "";
      } catch {
        return "";
      }
    }
    return "";
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        return Boolean(localStorage.getItem(STORAGE_KEY)?.trim());
      } catch {
        return false;
      }
    }
    return false;
  });

  const login = useCallback(async (code: string) => {
    const trimmed = code.trim();
    if (!trimmed) {
      return { success: false, error: "Please enter your passcode." };
    }

    try {
      const res = await fetch("/api/admin/messages", {
        headers: {
          Authorization: `Bearer ${trimmed}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          return { success: false, error: "Invalid passcode. Please try again." };
        }
        return { success: false, error: "Authentication failed. Server error." };
      }

      // Save to localStorage so login persists indefinitely across refreshes & tabs
      localStorage.setItem(STORAGE_KEY, trimmed);
      setPasscode(trimmed);
      setIsAuthenticated(true);
      return { success: true };
    } catch {
      return { success: false, error: "Network error during authentication." };
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn("Storage clear error:", err);
    }
    setPasscode("");
    setIsAuthenticated(false);
  }, []);

  const getAuthHeaders = useCallback((): Record<string, string> => {
    const token = passcode || (typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) || "" : "");
    return {
      Authorization: `Bearer ${token}`,
      "x-admin-key": token,
    };
  }, [passcode]);

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        passcode,
        login,
        logout,
        getAuthHeaders,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
