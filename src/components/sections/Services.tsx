"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { animate, stagger } from "animejs";
import { EASE_CINEMATIC } from "@/lib/animations";
import { useAnimeTextScramble } from "@/lib/useAnime";

const services = [
  {
    num: "01",
    title: "Agentic Orchestration",
    subtitle: "Multi-Agent Systems · Reasoning Pipelines",
    description:
      "Design and deploy autonomous multi-agent systems that reason, plan, and execute across your entire stack. Not simple bots — orchestrated intelligence.",
    image: "https://placehold.co/900x1100/1a1040/818CF8?text=AGENTIC%0AORCH&font=montserrat",
    overlayColor: "rgba(99,102,241,0.08)",
    glowColor: "rgba(99,102,241,0.15)",
    accentColor: "#818CF8",
  },
  {
    num: "02",
    title: "AI Agents",
    subtitle: "Voice · Lead Gen · Chatbots",
    description:
      "Intelligent agents that sell, support, and scale — 24/7. Voice calling, chat qualification, booking automation.",
    image: "https://placehold.co/900x1100/1a0f20/F472B6?text=AI%0AAGENTS&font=montserrat",
    overlayColor: "rgba(244,114,182,0.08)",
    glowColor: "rgba(244,114,182,0.12)",
    accentColor: "#F472B6",
  },
  {
    num: "03",
    title: "AI Consultancy",
    subtitle: "Strategy That Ships",
    description:
      "Execution-driven AI strategy from someone who's shipped products, not slide decks. We identify, build, and deploy.",
    image: "https://placehold.co/900x1100/150f28/C084FC?text=STRATEGY%0A%26%20AI&font=montserrat",
    overlayColor: "rgba(192,132,252,0.08)",
    glowColor: "rgba(192,132,252,0.12)",
    accentColor: "#C084FC",
  },
  {
    num: "04",
    title: "Custom Workflows",
    subtitle: "Built to Ship Fast",
    description:
      "We build what your business needs — in days, not quarters. Automation pipelines, integrations, deployment.",
    image: "https://placehold.co/900x1100/0f1a18/34D399?text=AUTO%0AMATE&font=montserrat",
    overlayColor: "rgba(52,211,153,0.08)",
    glowColor: "rgba(52,211,153,0.12)",
    accentColor: "#34D399",
  },
];

function ServiceBlock({ service, index }: { service: (typeof services)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.1]);

  const { ref: scrambleRef, display: scrambleDisplay } = useAnimeTextScramble(
    `SVC_${service.num}`,
    { delay: 200 }
  );

  // Staggered content reveal
  useEffect(() => {
    if (!isInView || !contentRef.current) return;

    const items = contentRef.current.querySelectorAll(".anime-svc-item");
    animate(items, {
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 900,
      delay: stagger(120, { start: 200 }),
      ease: "outExpo",
    });
  }, [isInView]);

  // Accent line
  useEffect(() => {
    if (!isInView || !numRef.current) return;

    const line = numRef.current.querySelector(".anime-accent-line");
    if (line) {
      animate(line, {
        scaleX: [0, 1],
        opacity: [0, 1],
        duration: 1000,
        delay: 400,
        ease: "outExpo",
      });
    }
  }, [isInView]);

  // Corner markers
  useEffect(() => {
    if (!isInView) return;
    const corners = ref.current?.querySelectorAll(".anime-corner");
    if (corners) {
      animate(corners, {
        opacity: [0, 1],
        scale: [0, 1],
        duration: 600,
        delay: stagger(100, { start: 500 }),
        ease: "out(3)",
      });
    }
  }, [isInView]);

  return (
    <div ref={ref} className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[75vh] items-stretch">
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
          className={`relative overflow-hidden min-h-[400px] lg:min-h-0 ${
            isEven ? "order-1" : "order-1 lg:order-2"
          }`}
        >
          <motion.div style={{ y: parallaxY, scale: imgScale }} className="absolute inset-[-10%]">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          <div className="absolute inset-0" style={{ background: service.overlayColor }} />
          <div className={`absolute inset-0 bg-gradient-to-${isEven ? "r" : "l"} from-transparent via-transparent to-surface-base/80`} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-base/40 via-transparent to-surface-base/20" />

          <div className="anime-corner absolute top-6 left-6 w-8 h-8 border-t border-l" style={{ borderColor: `${service.accentColor}30`, opacity: 0 }} />
          <div className="anime-corner absolute bottom-6 right-6 w-8 h-8 border-b border-r" style={{ borderColor: `${service.accentColor}30`, opacity: 0 }} />

          <div
            ref={scrambleRef as React.RefObject<HTMLDivElement>}
            className="absolute top-6 right-6 font-mono text-[9px] text-white/20 tracking-[0.3em]"
          >
            {scrambleDisplay || `SVC_${service.num}`}
          </div>

          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ background: `radial-gradient(circle at center, ${service.glowColor}, transparent 70%)` }}
          />
        </motion.div>

        {/* Content side */}
        <div
          className={`relative flex items-center ${
            isEven ? "order-2 lg:pl-16 xl:pl-24" : "order-2 lg:order-1 lg:pr-16 xl:pr-24"
          } px-6 sm:px-8 md:px-12 py-12 sm:py-16 lg:py-0`}
        >
          <div ref={contentRef} className="w-full max-w-lg">
            <div ref={numRef} className="anime-svc-item flex items-center gap-4 mb-8" style={{ opacity: 0 }}>
              <span className="font-mono text-xs tracking-[0.2em]" style={{ color: `${service.accentColor}80` }}>
                {service.num}
              </span>
              <div
                className="anime-accent-line w-16 h-px"
                style={{ background: `linear-gradient(to right, ${service.accentColor}50, transparent)`, transformOrigin: "left", opacity: 0 }}
              />
            </div>

            <h3 className="anime-svc-item font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[-0.03em] leading-[1.05] mb-3 text-white" style={{ opacity: 0 }}>
              {service.title}
            </h3>

            <p className="anime-svc-item font-mono text-[11px] tracking-[0.2em] uppercase mb-8" style={{ color: `${service.accentColor}80`, opacity: 0 }}>
              {service.subtitle}
            </p>

            <p className="anime-svc-item font-display text-base text-white/50 leading-[1.8] mb-10" style={{ opacity: 0 }}>
              {service.description}
            </p>
          </div>
        </div>
      </div>

      <div className="anime-divider w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
}

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Header entrance
  useEffect(() => {
    if (!isInView || !headerRef.current) return;

    animate(headerRef.current.querySelectorAll(".anime-header-item"), {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 900,
      delay: stagger(150),
      ease: "outExpo",
    });

    const underline = headerRef.current.querySelector(".anime-header-underline");
    if (underline) {
      animate(underline, {
        scaleX: [0, 1],
        opacity: [0, 1],
        duration: 800,
        delay: 600,
        ease: "outExpo",
      });
    }
  }, [isInView]);

  return (
    <section id="services" ref={ref} className="relative">
      <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] rounded-full bg-purple-600/8 blur-[120px]" />
      <div className="absolute bottom-[30%] right-[-5%] w-[350px] h-[350px] rounded-full bg-pink-500/6 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-20">
        <div ref={headerRef}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="anime-header-item font-mono text-[10px] tracking-[0.4em] text-cyan-400/50 uppercase mb-5" style={{ opacity: 0 }}>
                What We Build
              </p>
              <h2 className="anime-header-item font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.05] text-white" style={{ opacity: 0 }}>
                Four Pillars of
                <br />
                <span className="relative inline-block">
                  <span className="text-gradient-cyan">Execution</span>
                  <span
                    className="anime-header-underline absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    style={{ transformOrigin: "left", opacity: 0 }}
                  />
                </span>
              </h2>
            </div>
            <p className="anime-header-item font-display text-base text-white/40 max-w-xs leading-[1.8] tracking-wide" style={{ opacity: 0 }}>
              Each pillar engineered to deliver compounding returns.
            </p>
          </div>
        </div>
      </div>

      {services.map((service, i) => (
        <ServiceBlock key={service.num} service={service} index={i} />
      ))}
    </section>
  );
}
