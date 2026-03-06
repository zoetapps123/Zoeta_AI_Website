"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  scrub?: boolean;
  start?: string;
  end?: string;
}

export default function ScrollRevealText({
  children,
  className = "",
  as: Tag = "p",
  scrub = true,
  start = "top 85%",
  end = "top 30%",
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const words = containerRef.current.querySelectorAll(".word");

      gsap.fromTo(
        words,
        { opacity: 0.15, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            end,
            scrub: scrub ? 1 : false,
          },
        }
      );
    },
    { scope: containerRef }
  );

  const wordsArray = children.split(" ");

  return (
    <div ref={containerRef}>
      <Tag className={className}>
        {wordsArray.map((word, i) => (
          <span key={i} className="word inline-block mr-[0.3em]">
            {word}
          </span>
        ))}
      </Tag>
    </div>
  );
}
