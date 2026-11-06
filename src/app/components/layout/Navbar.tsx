"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const header = headerRef.current;

    if (!header) return;

    const updateNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 20) {
        header.style.transform = "translateY(0)";
      } else if (currentScrollY > lastScrollY.current) {
        header.style.transform = "translateY(0)";
      } else {
        header.style.transform = "translateY(0)";
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateNavbar);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed left-0 top-0 z-50 w-full px-6 py-5 transition-transform duration-500 ease-out md:px-10"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.15)] backdrop-blur-xl">
        <Link
          href="/"
          className="group text-sm font-medium tracking-[0.15em]"
        >
          SR
          <span className="ml-1 inline-block transition-transform duration-300 group-hover:rotate-12">
            .
          </span>
        </Link>

        <div className="flex items-center gap-6 md:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-xs uppercase tracking-[0.18em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--foreground)]"
            >
              {link.label}

              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--foreground)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}