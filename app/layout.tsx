import type { Metadata, Viewport } from "next";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteData.siteUrl || "https://satyam75.vercel.app";

export const viewport: Viewport = {
  themeColor: "#090d15",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteData.brand.fullName} - ${siteData.brand.role}`,
    template: `%s | ${siteData.brand.fullName}`,
  },
  description: `${siteData.brand.fullName} is a ${siteData.brand.role} based in ${siteData.brand.location} with ${siteData.brand.experience} of experience building high-performance web applications, scalable backends (PHP, Laravel, Node.js), modern frontends (React, Next.js), and Linux VPS cloud deployments.`,
  keywords: [
    "Satyam Prajapati",
    "Full Stack Developer",
    "Web Developer India",
    "Next.js Developer",
    "React Developer",
    "Node.js Backend Developer",
    "Laravel PHP Developer",
    "Linux Server Administrator",
    "Frontend Engineer",
    "Portfolio",
    "Dev SP",
  ],
  authors: [
    {
      name: siteData.brand.fullName,
      url: "https://in.linkedin.com/in/satyamprajapati07575",
    },
  ],
  creator: siteData.brand.fullName,
  publisher: siteData.brand.fullName,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${siteData.brand.fullName} — ${siteData.brand.role}`,
    description: `Portfolio of ${siteData.brand.fullName}: Modern web apps, clean code, scalable architecture and Linux server deployments.`,
    siteName: `${siteData.brand.fullName} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteData.brand.fullName} — ${siteData.brand.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteData.brand.fullName} — ${siteData.brand.role}`,
    description: `Full Stack Developer building scalable web applications across Next.js, Node.js, Laravel and Linux VPS.`,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: siteData.brand.fullName,
        jobTitle: siteData.brand.role,
        email: siteData.brand.email,
        address: {
          "@type": "PostalAddress",
          addressCountry: siteData.brand.location,
        },
        sameAs: siteData.socials.map((s) => s.url).filter((u) => u.startsWith("http")),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `${siteData.brand.fullName} — ${siteData.brand.role}`,
        description: `Official portfolio of ${siteData.brand.fullName}.`,
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ToastProvider>
          <AdminAuthProvider>{children}</AdminAuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
