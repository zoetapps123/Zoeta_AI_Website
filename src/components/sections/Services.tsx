"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { EASE_CINEMATIC } from "@/lib/animations";

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
  },
];

function ServiceBlock({ service, index }: { service: (typeof services)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.1]);

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

          {/* Color overlay */}
          <div className="absolute inset-0" style={{ background: service.overlayColor }} />

          {/* Gradient fade */}
          <div className={`absolute inset-0 bg-gradient-to-${isEven ? "r" : "l"} from-transparent via-transparent to-surface-base/80`} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-base/40 via-transparent to-surface-base/20" />

          {/* Corner markers */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/10" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/10" />

          {/* Module label */}
          <div className="absolute top-6 right-6 font-mono text-[9px] text-white/20 tracking-[0.3em]">
            SVC_{service.num}
          </div>
        </motion.div>

        {/* Content side */}
        <div
          className={`relative flex items-center ${
            isEven ? "order-2 lg:pl-16 xl:pl-24" : "order-2 lg:order-1 lg:pr-16 xl:pr-24"
          } px-6 sm:px-8 md:px-12 py-12 sm:py-16 lg:py-0`}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE_CINEMATIC }}
            className="w-full max-w-lg"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-xs text-cyan-400/50 tracking-[0.2em]">{service.num}</span>
              <div className="w-16 h-px bg-gradient-to-r from-cyan-400/30 to-transparent" />
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[-0.03em] leading-[1.05] mb-3 text-white">
              {service.title}
            </h3>

            <p className="font-mono text-[11px] text-cyan-400/50 tracking-[0.2em] uppercase mb-8">
              {service.subtitle}
            </p>

            <p className="font-display text-base text-white/50 leading-[1.8] mb-10">
              {service.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
}

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="relative">
      {/* Background gradient orbs */}
      <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] rounded-full bg-purple-600/8 blur-[120px]" />
      <div className="absolute bottom-[30%] right-[-5%] w-[350px] h-[350px] rounded-full bg-pink-500/6 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] text-cyan-400/50 uppercase mb-5">
              What We Build
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.05] text-white">
              Four Pillars of
              <br />
              <span className="text-gradient-cyan">Execution</span>
            </h2>
          </div>
          <p className="font-display text-base text-white/40 max-w-xs leading-[1.8] tracking-wide">
            Each pillar engineered to deliver compounding returns.
          </p>
        </motion.div>
      </div>

      {services.map((service, i) => (
        <ServiceBlock key={service.num} service={service} index={i} />
      ))}
    </section>
  );
}
