"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/animations/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const lines = sectionRef.current.querySelectorAll(".cta-line");
      const button = sectionRef.current.querySelector(".cta-button");

      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${10 + i * 15}% bottom`,
              end: `${25 + i * 15}% bottom`,
              scrub: 1,
            },
          }
        );
      });

      if (button) {
        gsap.fromTo(
          button,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "50% bottom",
              end: "70% bottom",
              scrub: 1,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[60vh] flex items-center justify-center px-6 md:px-12 lg:px-24 py-24"
    >
      {/* Background orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/[0.08] blur-[120px]" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-pink-500/[0.06] blur-[80px]" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <p className="cta-line font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.1] mb-6 text-white">
          Ready to stop guessing
          <br />
          and start scaling?
        </p>

        <p className="cta-line font-display text-base md:text-lg text-white/40 mb-16 max-w-xl mx-auto leading-[1.7]">
          Let&apos;s build something that pays for itself.
        </p>

        <div className="cta-button">
          <MagneticButton strength={0.2}>
            <a
              href="#contact"
              className="inline-block font-display font-bold text-lg md:text-xl px-12 py-5 bg-cyan text-white rounded-full
                hover:shadow-[0_4px_40px_rgba(99,102,241,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50
                active:scale-95 transition-shadow duration-300 animate-glow-pulse"
            >
              Let&apos;s Work Together
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
