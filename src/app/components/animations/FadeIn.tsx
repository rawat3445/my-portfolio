"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
};

export default function FadeIn({
  children,
  className = "",
}: FadeInProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.from(element, {
        y: 80,
        opacity: 0,
        scale: 0.97,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once: true,
        },
      });
    }, elementRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}