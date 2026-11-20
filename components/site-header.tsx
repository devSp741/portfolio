"use client";

import { useEffect, useRef, useState } from "react";
import siteData from "../data/site.json";
import { ArrowRight, Menu, X } from "./icons";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const { brand, navigation, talkButton } = siteData;

  const isClickingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const sectionIds = navigation
      .map((item) => item.href.replace("#", ""))
      .filter(Boolean);

    let ticking = false;

    const handleScroll = () => {
      if (isClickingRef.current) {
        return;
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Near the very top, activate Home
          if (window.scrollY < 80) {
            setActiveSection("#home");
            ticking = false;
            return;
          }

          // If scrolled to the bottom of the page, activate Contact
          if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 60
          ) {
            setActiveSection("#contact");
            ticking = false;
            return;
          }

          // Check sections with offset
          const scrollPosition = window.scrollY + 140;

          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const id = sectionIds[i];
            const el = document.getElementById(id);
            if (el) {
              const top = el.offsetTop;
              if (scrollPosition >= top) {
                setActiveSection(`#${id}`);
                break;
              }
            }
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, [navigation]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveSection(href);
    setIsOpen(false);

    // Lock scroll-spy updates during the programmatic smooth scroll
    isClickingRef.current = true;
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    // Release the lock after the smooth scroll animation completes
    clickTimeoutRef.current = setTimeout(() => {
      isClickingRef.current = false;
    }, 850);
  };

  return (
    <header className="site-header">
      <div className="container nav">
        <a
          className="brand"
          href="#home"
          aria-label={`${brand.fullName} home`}
          onClick={(e) => handleNavClick(e, "#home")}
        >
          <span>{brand.monogramFirst}</span>
          <span>{brand.monogramSecond}</span>
        </a>

        <nav
          className={`nav-links ${isOpen ? "open" : ""}`}
          id="site-nav"
          aria-label="Main navigation"
        >
          {navigation.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                className={isActive ? "active" : ""}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <a
          className="talk-link"
          href={talkButton.href}
          onClick={(e) => handleNavClick(e, talkButton.href)}
        >
          <span>{talkButton.label}</span>
          <ArrowRight size={13} aria-hidden="true" />
        </a>

        <button
          className="menu-toggle"
          id="menu-toggle"
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          aria-controls="site-nav"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </header>
  );
}
