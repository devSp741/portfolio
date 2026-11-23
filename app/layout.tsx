import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import siteData from "../data/site.json";
import { ToastProvider } from "../components/toast";
import { AdminAuthProvider } from "../context/admin-auth-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${siteData.brand.fullName} — ${siteData.brand.role}`,
  description: `${siteData.brand.fullName} — ${siteData.brand.role} with ${siteData.brand.experience} experience building modern, scalable web applications.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <ToastProvider>
          <AdminAuthProvider>{children}</AdminAuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
