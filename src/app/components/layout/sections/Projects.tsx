"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "GIPS College Website",
    type: "Institutional Website",
    description:
      "A complete multi-page college website built from scratch with Next.js, featuring modern UI, responsive layouts, animations, and structured content across 60+ pages.",
    technologies: "Next.js · TypeScript · Tailwind CSS · GSAP",
    image: "/projects/gips.png",
  },
  {
    number: "02",
    title: "College Management Portal",
    type: "Web Application",
    description:
      "A college portal with student, faculty, and staff authentication, attendance management, results, notices, and role-based features.",
    technologies: "Next.js · Node.js · MongoDB · NextAuth",
    image: "/projects/portal.png",
  },
  {
    number: "03",
    title: "Optometrists Society",
    type: "Client Website",
    description:
      "A professional website developed for the Optometrists Society with a responsive interface and modern web experience.",
    technologies: "Next.js · React · Tailwind CSS",
    image: "/projects/optometrists.png",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-item", {
        y: 180,
        opacity: 0,
        duration: 1.5,
        stagger: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    const preview = previewRef.current;

    if (!preview) return;

    gsap.to(preview, {
      x: event.clientX + 30,
      y: event.clientY + 30,
      duration: 0.45,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const handleProjectMove = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    const preview = previewRef.current;
    const project = event.currentTarget;

    if (!preview) return;

    const rect = project.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const rotateY = (mouseX / rect.width - 0.5) * 6;
    const rotateX = (mouseY / rect.height - 0.5) * -6;

    gsap.to(preview, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const showPreview = (
  image: string,
  event: React.MouseEvent<HTMLElement>
) => {
  setActiveImage(image);

  const preview = previewRef.current;

  if (!preview) return;

  gsap.set(preview, {
    x: event.clientX + 30,
    y: event.clientY + 30,
  });

  gsap.to(preview, {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    duration: 0.35,
    ease: "power3.out",
  });
 };

  const hidePreview = () => {
    if (!previewRef.current) return;

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.9,
      rotateX: 0,
      rotateY: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative border-t border-[var(--border)] px-6 py-32 md:px-10 md:py-40"
      onMouseMove={handleMouseMove}
      onMouseLeave={hidePreview}
    >
      {/* Floating Project Preview */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-44 w-64 -translate-x-1/2 -translate-y-1/2 scale-90 overflow-hidden rounded-xl border border-white/10 bg-[#111] opacity-0 shadow-2xl md:block"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {activeImage && (
          <Image
            src={activeImage}
            alt="Project preview"
            fill
            sizes="256px"
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-20 flex items-end justify-between">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
            Selected Work
          </p>

          <span className="hidden text-sm text-[var(--muted)] md:block">
            03 Projects
          </span>
        </div>

        <div>
          {projects.map((project) => (
            <article
              key={project.number}
              className="project-item group border-b border-[var(--border)] py-10 md:py-14"
              onMouseEnter={(event) => showPreview(project.image, event)}
              onMouseMove={handleProjectMove}
              onMouseLeave={hidePreview}
            >
              <div className="grid gap-8 md:grid-cols-[0.1fr_0.3fr_0.6fr]">
                <span className="text-sm text-[var(--muted)]">
                  {project.number}
                </span>

                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                    {project.type}
                  </p>

                  <h3 className="text-3xl font-medium tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                    {project.title}
                  </h3>
                </div>

                <div className="max-w-xl">
                  <p className="leading-relaxed text-[var(--muted)]">
                    {project.description}
                  </p>

                  <p className="mt-6 text-sm text-[var(--foreground)]">
                    {project.technologies}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}