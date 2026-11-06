"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      });

      timeline
        .from(".about-label", {
          x: -40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".about-heading",
          {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.4"
        )
        .from(
          ".about-text",
          {
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="border-t border-[var(--border)] px-6 py-32 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-[0.35fr_0.65fr]">
          <div className="about-label">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
              About
            </p>
          </div>

          <div>
            <h2 className="about-heading max-w-4xl text-4xl font-medium leading-tight tracking-[-0.03em] md:text-6xl">
              I build websites that are designed to look good, feel fast, and
              actually solve problems.
            </h2>

            <div className="mt-10 space-y-6">
              <p className="about-text max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
                I&apos;m a web developer focused on building modern digital
                experiences using technologies like Next.js, React, TypeScript,
                Node.js, and modern databases.
              </p>

              <p className="about-text max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
                From websites and portals to interactive interfaces, I enjoy
                turning ideas into reliable products with clean design and
                thoughtful interactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}