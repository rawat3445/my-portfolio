"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type TextRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function TextReveal({
  children,
  className = "",
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.from(element, {
        y: 120,
        opacity: 0,
        duration: 1.2,
        delay,
        ease: "power4.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}