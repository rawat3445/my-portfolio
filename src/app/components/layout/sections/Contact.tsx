"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-content", {
        y: 200,
        opacity: 0,
        scale: 0.92,
        duration: 1.6,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

         
  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
  const link = linkRef.current;

  if (!link) return;

  const rect = link.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const moveX = (event.clientX - centerX) * 0.25;
  const moveY = (event.clientY - centerY) * 0.25;

  gsap.to(link, {
    x: moveX,
    y: moveY,
    duration: 0.35,
    ease: "power3.out",
    overwrite: true,
  });
};

const handleMouseLeave = () => {
  if (!linkRef.current) return;

  gsap.to(linkRef.current, {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: "elastic.out(1, 0.15)",
  });
};

  

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="border-t border-[var(--border)] px-6 py-32 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="contact-content grid gap-16 md:grid-cols-[0.35fr_0.65fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
              Contact
            </p>
          </div>

          <div>
            <h2 className="max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-8xl">
              Have a project
              <br />
              in mind?
            </h2>

            <p className="mt-10 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
              I&apos;m open to freelance projects, collaborations, and
              interesting opportunities. Let&apos;s build something useful
              together.
            </p>

            <a
              ref={linkRef}
              href="mailto:your-email@example.com"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="mt-10 inline-flex border-b border-[var(--foreground)] pb-2 text-lg transition-all duration-300 hover:opacity-60"
            >
              Let&apos;s talk ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}