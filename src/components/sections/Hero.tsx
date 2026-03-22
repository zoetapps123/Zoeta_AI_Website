"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { animate, createTimeline, stagger, random } from "animejs";
import MagneticButton from "@/components/animations/MagneticButton";
import { useAnimeMorphBlob } from "@/lib/useAnime";

const ParticleCanvas = dynamic(() => import("./HeroParticles"), {
  ssr: false,
  loading: () => null,
});

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  return isMobile;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Splits text into individual letter spans for anime.js targeting */
function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={`anime-hero-letter inline-block ${className ?? ""}`}
          style={{ opacity: 0 }}
        >
          {char}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const [glitch, setGlitch] = useState(false);
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Morphing blobs
  const blob1 = useAnimeMorphBlob();
  const blob2 = useAnimeMorphBlob();

  const triggerGlitch = useCallback(() => {
    setGlitch(true);
    setGlitchOffset({
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 4,
    });
    setTimeout(() => {
      setGlitchOffset({
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 3,
      });
    }, 50);
    setTimeout(() => {
      setGlitchOffset({ x: 0, y: 0 });
    }, 100);
    setTimeout(() => setGlitch(false), 150);
  }, []);

  useEffect(() => {
    const interval = setInterval(triggerGlitch, 3500);
    return () => clearInterval(interval);
  }, [triggerGlitch]);

  // Master anime.js entrance timeline
  useEffect(() => {
    const tl = createTimeline({
      defaults: { ease: "outExpo" },
    });

    // 1. Letters cascade in with wave
    tl.add(".anime-hero-letter", {
      opacity: [0, 1],
      translateY: [80, 0],
      rotateX: [90, 0],
      scale: [0.5, 1],
      duration: 1200,
      delay: stagger(60, { start: 300 }),
    });

    // 2. Decorative line draws in
    tl.add(lineRef.current!, {
      scaleX: [0, 1],
      opacity: [0, 1],
      duration: 800,
    }, "-=600");

    // 3. Subtitle slides up
    tl.add(subtitleRef.current!, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
    }, "-=400");

    // 4. Services text
    tl.add(".anime-service-dot", {
      opacity: [0, 1],
      scale: [0, 1],
      duration: 500,
      delay: stagger(100),
    }, "-=400");

    tl.add(servicesRef.current!, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
    }, "-=500");

    // 5. CTA button rises up
    tl.add(ctaRef.current!, {
      opacity: [0, 1],
      translateY: [30, 0],
      scale: [0.9, 1],
      duration: 800,
    }, "-=300");

    // 6. Background orbs pulse in
    tl.add(".anime-orb", {
      opacity: [0, 1],
      scale: [0.3, 1],
      duration: 2000,
      delay: stagger(200),
      ease: "outSine",
    }, "-=1200");

    // 7. Grid lines fade in
    tl.add(".anime-grid", {
      opacity: [0, 0.03],
      duration: 1500,
    }, "-=1500");

    return () => { tl.pause(); };
  }, []);

  // Floating particles around the title
  useEffect(() => {
    if (isMobile) return;
    const container = sectionRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < 20; i++) {
      const p = document.createElement("div");
      p.className = "anime-floating-particle";
      p.style.cssText = `
        position: absolute;
        width: ${2 + Math.random() * 4}px;
        height: ${2 + Math.random() * 4}px;
        background: rgba(129, 140, 248, ${0.2 + Math.random() * 0.4});
        border-radius: 50%;
        pointer-events: none;
        z-index: 15;
        left: ${10 + Math.random() * 80}%;
        top: ${10 + Math.random() * 80}%;
      `;
      container.appendChild(p);
      particles.push(p);
    }

    const anim = animate(particles, {
      translateX: () => random(-100, 100),
      translateY: () => random(-100, 100),
      opacity: [0.8, 0.1],
      scale: [1.5, 0.5],
      duration: 4000,
      delay: stagger(200),
      loop: true,
      alternate: true,
      ease: "inOutSine",
    });

    return () => {
      anim.pause();
      particles.forEach((p) => p.remove());
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#0B0F19" }}
    >
      {!isMobile && <ParticleCanvas />}

      {/* Morphing gradient orbs */}
      <div
        ref={blob1}
        className="anime-orb absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 blur-[60px] md:blur-[120px]"
        style={{ opacity: 0 }}
      />
      <div
        ref={blob2}
        className="anime-orb absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/15 blur-[60px] md:blur-[120px]"
        style={{ opacity: 0 }}
      />
      <div className="anime-orb absolute top-[30%] right-[10%] w-[300px] h-[300px] rounded-full bg-pink-500/10 blur-[50px] md:blur-[100px]" style={{ opacity: 0 }} />
      <div className="anime-orb absolute bottom-[20%] left-[15%] w-[250px] h-[250px] rounded-full bg-orange-500/8 blur-[40px] md:blur-[80px]" style={{ opacity: 0 }} />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,15,25,0.5)_70%)] z-10" />

      {/* Grid lines */}
      <div className="anime-grid absolute inset-0 z-10" style={{
        backgroundImage: "linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        opacity: 0,
      }} />

      <div className="relative z-20 text-center w-full px-6">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: isMobile ? 0.6 : 1.2, delay: isMobile ? 0.1 : 0.3, ease: EASE }}
          className="font-mono text-[9px] md:text-[11px] text-cyan-400/70 uppercase mb-8 md:mb-14 tracking-[0.3em] md:tracking-[0.5em]"
        >
          Agentic Automation Studio
        </motion.p>

        <div className="relative mb-8 md:mb-14" onClick={triggerGlitch}>
          <h1
            className="font-display font-bold leading-none select-none relative inline-block text-white"
            style={{ fontSize: "clamp(3.5rem, 18vw, 16rem)", letterSpacing: "-0.04em", perspective: "1000px" }}
          >
            <span className="relative z-10">
              <SplitText text="ZOETA" />
              <span className="anime-hero-letter inline-block text-gradient-cyan" style={{ opacity: 0 }}>.</span>
            </span>

            {glitch && (
              <>
                <span
                  className="absolute inset-0 z-20"
                  style={{
                    color: "rgba(129, 140, 248, 0.7)",
                    transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`,
                    clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)",
                  }}
                  aria-hidden
                >
                  ZOETA<span className="text-cyan">.</span>
                </span>
                <span
                  className="absolute inset-0 z-20"
                  style={{
                    color: "rgba(244, 114, 182, 0.5)",
                    transform: `translate(${-glitchOffset.x}px, ${-glitchOffset.y}px)`,
                    clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
                  }}
                  aria-hidden
                >
                  ZOETA<span className="text-cyan">.</span>
                </span>
              </>
            )}

            <span
              className="absolute inset-0 blur-[80px] opacity-20 -z-10"
              style={{ color: "#6366F1" }}
              aria-hidden
            >
              ZOETA.
            </span>
          </h1>

          <div
            ref={lineRef}
            className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mx-auto mt-6"
            style={{ opacity: 0, transformOrigin: "center" }}
          />
        </div>

        <div ref={subtitleRef} className="max-w-xl mx-auto mb-6" style={{ opacity: 0 }}>
          <p className="font-display font-medium text-sm sm:text-base md:text-lg text-white/50 leading-[1.7] tracking-[0.04em] uppercase">
            AI that ships.{" "}
            <span className="text-gradient-cyan font-semibold">Results that compound.</span>
          </p>
        </div>

        <p
          ref={servicesRef}
          className="font-display text-xs sm:text-sm md:text-base text-white/40 tracking-wide mb-10 md:mb-14"
          style={{ opacity: 0 }}
        >
          <span className="anime-service-dot inline-block w-1.5 h-1.5 rounded-full bg-cyan-400/60 mr-2 align-middle" />
          AI Agents
          <span className="anime-service-dot inline-block w-1 h-1 rounded-full bg-white/20 mx-3 align-middle" />
          Premium Websites
          <span className="anime-service-dot inline-block w-1 h-1 rounded-full bg-white/20 mx-3 align-middle" />
          Custom Workflows
        </p>

        <div ref={ctaRef} style={{ opacity: 0 }}>
          <MagneticButton>
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-3 font-display font-semibold text-[13px] md:text-sm tracking-wide
                px-10 py-4 rounded-full bg-cyan text-white
                hover:shadow-[0_4px_30px_rgba(99,102,241,0.5)]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/40
                active:scale-[0.97] transition-shadow duration-500 animate-glow-pulse"
            >
              <span>Start a Project</span>
              <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
