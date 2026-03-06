"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_CINEMATIC } from "@/lib/animations";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const imgRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };

    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section id="about" ref={ref} className="section-padding relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-600/8 blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-600/6 blur-[120px]" />

      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.3em] text-cyan-400/50 uppercase mb-16"
        >
          The Founder
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
            className="lg:col-span-2 relative"
            ref={imgRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setMousePos({ x: 0, y: 0 });
            }}
          >
            <div
              className="relative rounded-2xl overflow-hidden group"
              style={{
                transform: isHovered
                  ? `perspective(800px) rotateY(${mousePos.x * 0.3}deg) rotateX(${-mousePos.y * 0.3}deg)`
                  : "perspective(800px) rotateY(0deg) rotateX(0deg)",
                transition: "transform 0.3s ease-out",
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src="/images/founder.jpeg"
                  alt="Piyush Pratap Singh — Founder, Zoeta AI"
                  className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/15 via-transparent to-purple-600/15 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Corner frame accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-cyan-400/30" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-cyan-400/30" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-cyan-400/30" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-cyan-400/30" />

                {/* Data overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[9px] text-white/90 tracking-[0.2em] uppercase">
                      System Active
                    </span>
                  </div>
                  <div className="font-mono text-[9px] text-white/50 tracking-wider space-y-0.5">
                    <p>ID: PSS-001 // FOUNDER</p>
                    <p>STATUS: BUILDING THE FUTURE</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow behind image */}
            <div className="absolute -inset-4 bg-indigo-600/[0.06] rounded-3xl blur-2xl -z-10" />
          </motion.div>

          {/* Bio content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_CINEMATIC }}
            className="lg:col-span-3"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] mb-2 leading-[0.95] text-white">
              Piyush Pratap
              <br />
              <span className="text-gradient-cyan">Singh</span>
            </h2>
            <p className="font-display text-base text-cyan-400/60 mb-10 tracking-wider">
              Founder &amp; CEO, Zoeta AI
            </p>

            <div className="space-y-6 font-display text-base text-white/50 leading-[1.8]">
              <p>
                Serial AI builder. 2nd-time founder. 5+ years deep in AI &amp;
                agentic automation.
              </p>
              <p>
                Previously Co-founded{" "}
                <span className="text-white/80 font-medium">MyMirro</span> — an
                AI fashion-tech company where he launched 3 paying products and
                led the company to a{" "}
                <span className="text-cyan-400 font-medium">
                  $120K USD acquisition
                </span>{" "}
                as a white-labeled solution.
              </p>
              <p>
                Now building Zoeta AI to help businesses deploy AI systems that
                actually move the needle.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              {[
                { value: "5+", label: "Years in AI" },
                { value: "$120K", label: "Exit Value" },
                { value: "2x", label: "Founder" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display font-bold text-2xl md:text-3xl text-gradient-cyan tracking-[-0.02em]">
                    {stat.value}
                  </p>
                  <p className="font-display text-xs text-white/30 mt-1 tracking-wider uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="https://www.linkedin.com/in/piyushpps/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-display text-sm text-white/40 tracking-wider
                  hover:text-cyan-400 transition-colors duration-300 focus-visible:outline-none focus-visible:text-cyan-400 group"
                data-cursor-hover
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="group-hover:underline underline-offset-4">Connect on LinkedIn</span>
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
