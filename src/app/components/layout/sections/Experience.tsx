"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    period: "2025 — Present",
    role: "Web Developer",
    company: "Garhwal Institute of Paramedical Sciences",
    description:
      "Developed and maintained the institute website and college portal, including student and faculty features, authentication, attendance, results, and notices.",
  },
  {
    period: "Client Project",
    role: "Web Developer",
    company: "Optometrists Society",
    description:
      "Designed and developed a modern website using Next.js with a focus on responsive layouts, clean UI, and a smooth user experience.",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".experience-item", {
        y: 120,
        opacity: 0,
        duration: 1.5,
        stagger: 0.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="border-t border-[var(--border)] px-6 py-32 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
            Experience
          </p>
        </div>

        <div>
          {experiences.map((experience, index) => (
            <article
              key={experience.company}
              className={`experience-item grid gap-8 py-10 md:grid-cols-[0.2fr_0.25fr_0.55fr] ${
                index !== experiences.length - 1
                  ? "border-b border-[var(--border)]"
                  : ""
              }`}
            >
              <p className="text-sm text-[var(--muted)]">
                {experience.period}
              </p>

              <div>
                <h3 className="text-xl font-medium">{experience.role}</h3>

                <p className="mt-2 text-sm text-[var(--muted)]">
                  {experience.company}
                </p>
              </div>

              <p className="max-w-xl text-base leading-relaxed text-[var(--muted)]">
                {experience.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}