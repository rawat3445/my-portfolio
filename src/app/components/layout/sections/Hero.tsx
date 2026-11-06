"use client";

import { useEffect, useRef } from "react";
import TextReveal from "@/app/components/animations/TextReveal";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    const spotlight = spotlightRef.current;
    const title = titleRef.current;

    if (!hero || !content || !spotlight || !title) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = hero.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Hero content movement
      const moveX = (x / rect.width - 0.5) * 12;
      const moveY = (y / rect.height - 0.5) * 12;

      content.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;

      // Spotlight movement
      spotlight.style.transform = `translate3d(${x - 250}px, ${
        y - 250
      }px, 0)`;

      // Title magnetic movement
      const titleRect = title.getBoundingClientRect();

      const titleCenterX = titleRect.left + titleRect.width / 2;
      const titleCenterY = titleRect.top + titleRect.height / 2;

      const distanceX = event.clientX - titleCenterX;
      const distanceY = event.clientY - titleCenterY;

      const distance = Math.sqrt(
        distanceX * distanceX + distanceY * distanceY
      );

      const magneticRadius = 500;

      if (distance < magneticRadius) {
        const strength = 1 - distance / magneticRadius;

        const titleMoveX = distanceX * strength * 0.035;
        const titleMoveY = distanceY * strength * 0.035;

        title.style.transform = `translate3d(${titleMoveX}px, ${titleMoveY}px, 0)`;
      } else {
        title.style.transform = "translate3d(0, 0, 0)";
      }
    };

    const handleMouseLeave = () => {
      content.style.transform = "translate3d(0, 0, 0)";
      spotlight.style.transform = "translate3d(-500px, -500px, 0)";
      title.style.transform = "translate3d(0, 0, 0)";
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden px-6 md:px-10"
    >
      {/* Cursor Spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-white/[0.035] blur-[100px] transition-transform duration-500 ease-out"
      />

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-7xl transition-transform duration-300 ease-out"
      >
        <p className="mb-6 text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
          Web Developer
        </p>

        <TextReveal>
          <h1
            ref={titleRef}
            className="text-[clamp(4rem,12vw,11rem)] font-medium leading-[0.85] tracking-[-0.06em] transition-transform duration-300 ease-out"
          >
            Suraj
            <br />
            Rawat<span className="text-[var(--muted)]">.</span>
          </h1>
        </TextReveal>

        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <TextReveal delay={0.3}>
            <p className="max-w-xl text-lg leading-relaxed text-[var(--muted)] md:text-xl">
              I build modern digital experiences with clean interfaces,
              thoughtful interactions, and scalable technology.
            </p>
          </TextReveal>

          <TextReveal delay={0.5}>
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
              <span className="h-2 w-2 rounded-full bg-[var(--foreground)]" />
              Available for work
            </div>
          </TextReveal>
        </div>
      </div>
    </section>
  );
}