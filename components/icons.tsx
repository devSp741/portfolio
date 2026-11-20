import React from "react";
export {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  CheckCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code,
  Copy,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Globe,
  Inbox,
  Layers,
  Layout,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  RefreshCw,
  Rocket,
  Server,
  Smartphone,
  Sparkles,
  Terminal,
  Trash2,
  Users,
  X,
  Zap,
} from "lucide-react";

export type BrandIconProps = {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
};

export function GitHubIcon({ className, size = 18, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ flexShrink: 0, display: "inline-block", ...style }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function LinkedInIcon({ className, size = 18, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ flexShrink: 0, display: "inline-block", ...style }}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function TwitterIcon({ className, size = 18, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ flexShrink: 0, display: "inline-block", ...style }}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* --------------------------------------------------
   Core Tech Brand Icons
   -------------------------------------------------- */

export function NextjsIcon({ className, size = 16, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      fill="none"
      className={className}
      style={{ flexShrink: 0, display: "inline-block", ...style }}
      aria-hidden="true"
    >
      <mask height="180" id="mask0_next" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: "alpha" }}>
        <circle cx="90" cy="90" fill="black" r="90" />
      </mask>
      <g mask="url(#mask0_next)">
        <circle cx="90" cy="90" fill="#f4f7fb" r="90" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill="#090d15"
        />
        <rect fill="#090d15" height="72" width="12" x="115" y="54" />
      </g>
    </svg>
  );
}

export function ReactIcon({ className, size = 16, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-11.5 -10.23174 23 20.46348"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0, display: "inline-block", color: "#00d8ff", ...style }}
      aria-hidden="true"
    >
      <circle cx="0" cy="0" r="2.05" fill="#00d8ff" />
      <g stroke="#00d8ff" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function NodeIcon({ className, size = 16, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0, display: "inline-block", color: "#539e43", ...style }}
      aria-hidden="true"
    >
      <path d="M12 2.5a1.8 1.8 0 0 0-.9.25L3.6 7.15A1.8 1.8 0 0 0 2.7 8.7v8.6a1.8 1.8 0 0 0 .9 1.55l7.5 4.4a1.8 1.8 0 0 0 1.8 0l7.5-4.4a1.8 1.8 0 0 0 .9-1.55V8.7a1.8 1.8 0 0 0-.9-1.55L12.9 2.75a1.8 1.8 0 0 0-.9-.25zm0 2.4 6.7 3.9v7.8L12 20.5 5.3 16.6V8.8L12 4.9zm-2.2 4.3v1.8h2.3a1.5 1.5 0 0 1 1.5 1.5v1.4a1.5 1.5 0 0 1-1.5 1.5H9.8V11h-1.6v6.3h3.9a3.1 3.1 0 0 0 3.1-3.1v-1.4a3.1 3.1 0 0 0-3.1-3.1h-2.3z" />
    </svg>
  );
}

export function LaravelIcon({ className, size = 16, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0, display: "inline-block", color: "#ff2d20", ...style }}
      aria-hidden="true"
    >
      <path d="M8.2 2.5 2 6.1l6.2 3.6 6.2-3.6L8.2 2.5zm0 8.4L2 7.3v7.2l6.2 3.6V10.9zm7.6-4.4L9.6 10l6.2 3.6 6.2-3.6-6.2-3.5zm6.2 4.4-6.2 3.6v7.2l6.2-3.6v-7.2zm-7.6 4.4-6.2 3.6v7.2l6.2-3.6v-7.2z" />
    </svg>
  );
}

export function PhpIcon({ className, size = 18, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0, display: "inline-block", color: "#8892be", ...style }}
      aria-hidden="true"
    >
      <path d="M12 3C7 3 2.9 6.6 2.1 11.3c-.9 5 2.3 9.7 7.3 10.4 4.5.7 8.9-2.2 10.3-6.5.4-1.2.5-2.2.5-3.2C20.2 6.9 16.5 3 12 3zm-6.1 12.3-.9-5.1h2.2c1.2 0 1.9.6 1.7 1.7-.2 1.3-1.1 2-2.3 2H6.3l-.4 1.4H4.5zm5.7-1.4h-1.4l1.2-5.1h1.4l-.4 1.9h1.1c1.2 0 1.9.6 1.7 1.7-.2 1.3-1.1 2-2.3 2H11l-.8 1.4zm5.7 1.4-.9-5.1h2.2c1.2 0 1.9.6 1.7 1.7-.2 1.3-1.1 2-2.3 2h-.6l-.4 1.4h-1.4z" />
    </svg>
  );
}

export function MysqlIcon({ className, size = 16, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0, display: "inline-block", color: "#00758f", ...style }}
      aria-hidden="true"
    >
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm3.8 15.6c-.6.3-1.4.4-2.1.4-2.5 0-4.3-1.7-4.3-4.2s1.8-4.2 4.3-4.2c.7 0 1.5.1 2.1.4v1.8c-.6-.4-1.3-.6-2-.6-1.4 0-2.4 1-2.4 2.6s1 2.6 2.4 2.6c.7 0 1.4-.2 2-.6v1.8z" />
    </svg>
  );
}

export function LinuxIcon({ className, size = 16, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0, display: "inline-block", color: "#fcc624", ...style }}
      aria-hidden="true"
    >
      <path d="M12.5 2c-2.3 0-4.2 1.7-4.4 3.9-.2 1.7.3 3.5.3 4.9 0 .6-.4 1.4-1.1 2-1 .9-1.9 2-1.9 3.5 0 2.8 3.1 4.7 6.6 4.7s6.6-1.9 6.6-4.7c0-1.5-.9-2.6-1.9-3.5-.7-.6-1.1-1.4-1.1-2 0-1.4.5-3.2.3-4.9C15.5 3.7 14.5 2 12.5 2zm-1.7 4.8a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm3.4 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm-2.6 2.5c.6 0 1.5.3 1.8.8l-3.6.1c.3-.5 1.2-.9 1.8-.9z" />
    </svg>
  );
}

export function GitIcon({ className, size = 16, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0, display: "inline-block", color: "#f05032", ...style }}
      aria-hidden="true"
    >
      <path d="M21.6 10.9 13.1 2.4a2 2 0 0 0-2.8 0L8.6 4.1l3.6 3.6a2.4 2.4 0 0 1 3 3l3.5 3.5a2.4 2.4 0 1 1-1.4 1.4l-3.2-3.2v4.8a2.4 2.4 0 1 1-2 0V9.8a2.4 2.4 0 0 1-1.3-3.1L7.2 5.3 2.4 10.1a2 2 0 0 0 0 2.8l8.5 8.5a2 2 0 0 0 2.8 0l7.9-7.9a2 2 0 0 0 0-2.6z" />
    </svg>
  );
}

export function TailwindIcon({ className, size = 16, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0, display: "inline-block", color: "#38bdf8", ...style }}
      aria-hidden="true"
    >
      <path d="M12 6c-2.7 0-4.4 1.3-5.2 4 .9-1.3 2.1-1.8 3.5-1.5 1 .2 1.7.9 2.5 1.7C14 11.5 15.6 13 19 13c2.7 0 4.4-1.3 5.2-4-.9 1.3-2.1 1.8-3.5 1.5-1-.2-1.7-.9-2.5-1.7C17 7.5 15.4 6 12 6zm-7 7c-2.7 0-4.4 1.3-5.2 4 .9-1.3 2.1-1.8 3.5-1.5 1 .2 1.7.9 2.5 1.7C7 18.5 8.6 20 12 20c2.7 0 4.4-1.3 5.2-4-.9 1.3-2.1 1.8-3.5 1.5-1-.2-1.7-.9-2.5-1.7C10 14.5 8.4 13 5 13z" />
    </svg>
  );
}


export function HtmlIcon({ className, size = 16, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0, display: "inline-block", color: "#e34f26", ...style }}
      aria-hidden="true"
    >
      <path d="M4.1 2 5.7 20l6.3 1.8 6.3-1.8L19.9 2H4.1zm13.1 5.3-2.7 7.7-2.5.7-2.5-.7-.2-2.1h1.9l.1.9 1 .3 1-.3.3-3.6H7.9l-.3-3.6h9.9z" />
    </svg>
  );
}

export function CssIcon({ className, size = 16, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0, display: "inline-block", color: "#1572b6", ...style }}
      aria-hidden="true"
    >
      <path d="M4.1 2 5.7 20l6.3 1.8 6.3-1.8L19.9 2H4.1zm12.9 6.8h-7.6l.2 2.3h7.2l-.6 6.3-4.2 1.2-4.2-1.2-.3-3h1.9l.1 1.5 2.5.7 2.5-.7.3-3.2H7.4l-.5-6h10.4l-.3 2.4z" />
    </svg>
  );
}

export function JsIcon({ className, size = 16, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0, display: "inline-block", color: "#f7df1e", ...style }}
      aria-hidden="true"
    >
      <path d="M3 3h18v18H3V3zm13.8 14.5c1.4 0 2.4-.7 2.8-1.7l-1.4-.9c-.3.6-.7.9-1.3.9-.7 0-1.1-.4-1.1-1.1v-5.4h-1.6v5.4c0 1.9 1.1 2.8 2.6 2.8zm-5.4-.1c1.3 0 2.2-.6 2.7-1.4l-1.3-.8c-.4.5-.8.8-1.4.8-.7 0-1.2-.4-1.2-1 0-.7.4-1 1.5-1.4l.5-.2c1.7-.6 2.5-1.4 2.5-2.7 0-1.6-1.2-2.7-3-2.7-1.3 0-2.3.5-2.9 1.5l1.3.8c.3-.5.7-.8 1.4-.8.7 0 1.2.4 1.2.9 0 .6-.4.9-1.4 1.3l-.5.2c-1.8.6-2.5 1.5-2.5 2.8.1 1.6 1.4 2.7 3.1 2.7z" />
    </svg>
  );
}

export function JqueryIcon({ className, size = 16, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0, display: "inline-block", color: "#0769ad", ...style }}
      aria-hidden="true"
    >
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm3.8 11.2c-.4 1.2-1.2 2-2.3 2.5-1.1.5-2.5.4-3.6-.1-.5-.2-1-.6-1.3-1.1l1.4-.9c.3.4.6.7 1 .8.8.4 1.7.3 2.3-.1.6-.3 1-.9 1.2-1.6l-2.4-.6c-1.5-.4-2.4-1.3-2.3-2.7.1-1.4 1.2-2.5 2.7-2.7 1.2-.2 2.4.2 3.2.9l-1.1 1.2c-.6-.5-1.4-.7-2.1-.6-.8.1-1.4.6-1.4 1.3 0 .6.4 1 1.3 1.2l2.3.6c1.4.3 2.1 1.2 1.8 2.5z" />
    </svg>
  );
}

export function BootstrapIcon({ className, size = 16, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0, display: "inline-block", color: "#7952b3", ...style }}
      aria-hidden="true"
    >
      <path d="M18.8 4.2C17.6 3 15.6 2.5 12.8 2.5H5.2v19h7.8c2.8 0 4.8-.5 6-1.7 1.1-1.1 1.8-2.8 1.8-5 0-1.6-.5-2.9-1.4-3.8.7-.9 1.1-2.1 1.1-3.6 0-2.1-.6-3.8-1.7-4.9zm-8.8 1.8h2.6c1.4 0 2.4.2 3 .7.6.5.9 1.3.9 2.4 0 1.9-1.2 2.8-3.6 2.8h-2.9V6zm4.1 12.5H10V13h4c1.6 0 2.7.3 3.3.9.7.6 1 1.5 1 2.7-.1 2-1.4 3-4.2 3.1z" />
    </svg>
  );
}

export function CodeigniterIcon({ className, size = 16, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0, display: "inline-block", color: "#ee4326", ...style }}
      aria-hidden="true"
    >
      <path d="M11.9 2C9.4 4.5 8.7 8.2 10.3 11c.2.4.4.8.4 1.2 0 .8-.5 1.5-1.3 1.8-.7.2-1.5 0-2-.5-1.1-1.1-1.2-2.8-.2-4.1C6.2 11.2 5 14 5.3 16.9c.4 3.7 3.5 6.6 7.2 6.8 4.3.3 7.9-2.9 8.2-7.2.2-3.1-1.2-6.1-3.8-7.9-1-.7-1.5-1.9-1.5-3.2 0-1.3-.9-2.5-2.1-3.1-.4-.2-.8-.3-1.4-.3z" />
    </svg>
  );
}

export function CpanelIcon({ className, size = 16, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0, display: "inline-block", color: "#ff6c2c", ...style }}
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5a4.5 4.5 0 0 1-4.5-4.5A4.5 4.5 0 0 1 13 7.5a4.4 4.4 0 0 1 3.2 1.3l-1.4 1.4A2.4 2.4 0 0 0 13 9.5a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.4 2.4 0 0 0 1.8-.7l1.4 1.4a4.4 4.4 0 0 1-3.2 1.3z" />
    </svg>
  );
}

export function NginxIcon({ className, size = 16, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0, display: "inline-block", color: "#009639", ...style }}
      aria-hidden="true"
    >
      <path d="M12 2.2 3.1 7.3v10.4l8.9 5.1 8.9-5.1V7.3L12 2.2zm4.8 13.9-3.2-4.6v4.6h-2.1V8.9h2.1l3.2 4.6V8.9h2.1v7.2h-2.1z" />
    </svg>
  );
}

export function ApacheIcon({ className, size = 16, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0, display: "inline-block", color: "#d22128", ...style }}
      aria-hidden="true"
    >
      <path d="M18.8 2.3c-.6.9-1.2 1.8-1.8 2.6-.9 1.4-1.9 2.8-2.9 4.1-.7.9-1.5 1.7-2.3 2.5-.5.6-1.1 1.1-1.7 1.6-.3.3-.6.6-.9.8-.3.3-.6.5-.9.7l-.4.3c-.3.2-.5.4-.8.5l-.5.3c-.3.1-.5.3-.8.4-.2.1-.4.2-.6.2-.3.1-.5.1-.8.1-.4.1-.7.1-1 .1-.3 0-.6 0-.8-.1-.4-.1-.7-.2-1-.3l-.4-.2-.3-.2-.3-.2-.2-.2-.2-.2-.2-.2c-.3-.4-.4-.8-.4-1.3 0-.4.1-.8.3-1.2.2-.4.4-.7.7-1 .5-.6 1.1-1.2 1.7-1.8.8-.8 1.7-1.6 2.6-2.4 1-.8 2-1.6 3.1-2.4 1.1-.7 2.3-1.4 3.5-2 .5-.2 1.1-.5 1.6-.7.4-.2.9-.3 1.3-.4.2-.1.5-.1.7-.1.2 0 .4 0 .6.1.3 0 .5.1.7.2.3.1.5.3.7.5.3.3.5.7.6 1.1.1.5.1 1-.1 1.4z" />
    </svg>
  );
}

export function PostmanIcon({ className, size = 16, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0, display: "inline-block", color: "#ff6c37", ...style }}
      aria-hidden="true"
    >
      <path d="M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2zm4.8 7.4-4.5 4.5a1.8 1.8 0 0 1-2.5 0l-1.6-1.6a1.2 1.2 0 1 1 1.7-1.7l1.1 1.1 3.7-3.7a1.2 1.2 0 1 1 1.7 1.7z" />
    </svg>
  );
}

export function VscodeIcon({ className, size = 16, style }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ flexShrink: 0, display: "inline-block", color: "#007acc", ...style }}
      aria-hidden="true"
    >
      <path d="M17.5 2.2 8.7 9.8 4.2 6.3a1.4 1.4 0 0 0-1.8.2L1.2 7.7a1.3 1.3 0 0 0 0 1.9l4 3.6-4 3.6a1.3 1.3 0 0 0 0 1.9l1.2 1.2a1.4 1.4 0 0 0 1.8.2l4.5-3.5 8.8 7.6a1.5 1.5 0 0 0 2.2-.8l3.1-15a1.5 1.5 0 0 0-1.8-1.7zm-2.8 13.9-6-4.6 6-4.6v9.2z" />
    </svg>
  );
}
