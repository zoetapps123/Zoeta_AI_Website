"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import MagneticButton from "@/components/animations/MagneticButton";

const ParticleCanvas = dynamic(() => import("./HeroParticles"), {
  ssr: false,
});

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [glitch, setGlitch] = useState(false);
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });

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

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#0B0F19" }}
    >
      <ParticleCanvas />

      {/* Colorful gradient orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[120px]" />
      <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] rounded-full bg-pink-500/10 blur-[100px]" />
      <div className="absolute bottom-[20%] left-[15%] w-[250px] h-[250px] rounded-full bg-orange-500/8 blur-[80px]" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,15,25,0.5)_70%)] z-10" />

      {/* Grid lines */}
      <div className="absolute inset-0 z-10 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      <div className="relative z-20 text-center w-full px-6">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
          className="font-mono text-[10px] md:text-[11px] text-cyan-400/70 uppercase mb-10 md:mb-14 tracking-[0.5em]"
        >
          Agentic Automation Studio
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
          className="relative mb-10 md:mb-14"
          onClick={triggerGlitch}
        >
          <h1
            className="font-display font-bold leading-none select-none relative inline-block text-white"
            style={{ fontSize: "clamp(5rem, 18vw, 16rem)", letterSpacing: "-0.04em" }}
          >
            <span className="relative z-10">
              ZOETA
              <span className="text-gradient-cyan">.</span>
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

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: EASE }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mx-auto mt-6"
          />
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
          className="max-w-2xl mx-auto mb-6"
        >
          <p className="font-display font-light text-lg md:text-xl lg:text-2xl text-white/70 leading-[1.6] tracking-[-0.01em]">
            &ldquo;We engineer AI systems that deliver
            <span className="text-cyan-400 font-normal"> measurable ROI</span>
            ;not promises.&rdquo;
          </p>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3, ease: EASE }}
          className="font-display text-sm md:text-base text-white/40 tracking-wide mb-14"
        >
          AI Agents &nbsp;&middot;&nbsp; Premium Websites &nbsp;&middot;&nbsp; Custom Workflows
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6, ease: EASE }}
        >
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
              <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-transform transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="font-display text-[9px] tracking-[0.4em] text-white/20 uppercase">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-6 bg-gradient-to-b from-white/30 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
