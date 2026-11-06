"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type TextRevealProps = {
  children: React.ReactNode;
  className?: string;
};

export default function TextReveal({
  children,
  className = "",
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
        ease: "power4.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}