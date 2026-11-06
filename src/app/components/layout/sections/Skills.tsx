"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "Next.js API", "REST APIs"],
  },
  {
    title: "Database",
    skills: ["MongoDB", "PostgreSQL", "MySQL"],
  },
  {
    title: "Tools & Deployment",
    skills: ["Git", "GitHub", "Vercel", "Hostinger", "GSAP"],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-group", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.25,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLSpanElement>
  ) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const moveX = (x / rect.width - 0.5) * 8;
    const moveY = (y / rect.height - 0.5) * 8;

    gsap.to(element, {
      x: moveX,
      y: moveY,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (
    event: React.MouseEvent<HTMLSpanElement>
  ) => {
    gsap.to(event.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="border-t border-[var(--border)] px-6 py-32 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
            Skills
          </p>
        </div>

        <div className="grid border-t border-[var(--border)] md:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="skill-group border-b border-[var(--border)] py-10 md:px-8 md:py-12 md:first:pl-0"
            >
              <h3 className="mb-6 text-2xl font-medium tracking-[-0.02em]">
                {group.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="inline-block border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)] transition-colors duration-300 hover:text-[var(--foreground)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}