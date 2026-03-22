"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { animate, stagger } from "animejs";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useAnimeTextScramble } from "@/lib/useAnime";

const projects = [
  {
    slug: "size",
    client: "SIZE",
    url: "size.co.uk",
    description:
      "Major UK streetwear & sneaker retailer. Complete website overhaul + AI-powered product cataloguing system.",
    result:
      "Automated cataloguing across 10,000+ SKUs. Reduced manual tagging time by 80%.",
    tags: ["Website", "AI Cataloguing", "E-Commerce"],
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=400&fit=crop",
    metric: "80%",
    metricLabel: "Reduction in manual tagging",
  },
  {
    slug: "gymbox",
    client: "Gymbox",
    url: "gymbox.com",
    description:
      "London's most rebellious gym chain. Website redesign, AI-personalised coaching engine, and mobile app development.",
    result:
      "2x member engagement through personalised AI coaching. Mobile app launched with 10K+ downloads in first month.",
    tags: ["Website", "AI Coaching", "Mobile App"],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
    metric: "2x",
    metricLabel: "Member engagement increase",
  },
  {
    slug: "rumble-boxing",
    client: "Rumble Boxing",
    url: "rumbleboxing.com",
    description:
      "Premium group fitness boxing brand. AI voice agents for class reservations and marketing outbound agentic solutions.",
    result:
      "50% reduction in missed reservations. AI outbound agents generated 3x more qualified leads per month.",
    tags: ["AI Voice Agents", "Reservations", "Marketing Automation"],
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=400&fit=crop",
    metric: "3x",
    metricLabel: "Qualified leads generated",
  },
  {
    slug: "hair-and-co-bklyn",
    client: "Hair and Co Bklyn",
    url: "hairandcobklyn.com",
    description:
      "Brooklyn's premier hair salon. Complete website redesign, AI reservation agents, and custom CRM solution.",
    result:
      "Online bookings increased 4x. Custom CRM reduced no-shows by 60%. Modern web presence drove 2x foot traffic.",
    tags: ["Website Redesign", "Reservation Agents", "Custom CRM"],
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop",
    metric: "4x",
    metricLabel: "Online bookings increase",
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef as React.RefObject<HTMLDivElement>, { once: true, margin: "-80px" });

  const { ref: clientRef, display: clientDisplay } = useAnimeTextScramble(project.client, { delay: 300 + index * 150 });

  // Staggered tag cascade
  useEffect(() => {
    if (!isInView || !tagsRef.current) return;

    const tags = tagsRef.current.querySelectorAll(".anime-tag");
    animate(tags, {
      opacity: [0, 1],
      translateX: [-20, 0],
      scale: [0.8, 1],
      duration: 600,
      delay: stagger(80, { start: 500 + index * 100 }),
      ease: "out(3)",
    });
  }, [isInView, index]);

  // Image reveal with clip-path
  useEffect(() => {
    if (!isInView || !cardRef.current) return;

    const img = cardRef.current.querySelector(".anime-img-reveal");
    if (img) {
      animate(img, {
        clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
        duration: 1200,
        delay: 200 + index * 100,
        ease: "inOutQuart",
      });
    }
  }, [isInView, index]);

  // Metric number pulse
  useEffect(() => {
    if (!isInView || !cardRef.current) return;

    const metric = cardRef.current.querySelector(".anime-metric");
    if (metric) {
      animate(metric, {
        scale: [0.5, 1.15, 1],
        opacity: [0, 1],
        duration: 800,
        delay: 600 + index * 100,
        ease: "out(3)",
      });
    }
  }, [isInView, index]);

  return (
    <Link href={`/work/${project.slug}`} className="block">
      <motion.div
        ref={cardRef}
        variants={fadeInUp}
        className="group relative rounded-2xl overflow-hidden glass-card hover:border-cyan/20 transition-colors duration-500"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-4 relative overflow-hidden">
            <div className="anime-img-reveal aspect-[3/2] lg:aspect-auto lg:h-full" style={{ clipPath: "inset(0 100% 0 0)" }}>
              <img
                src={project.image}
                alt={project.client}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="anime-metric font-display font-bold text-3xl md:text-4xl text-white tracking-[-0.03em]" style={{ opacity: 0 }}>
                  {project.metric}
                </span>
                <p className="font-mono text-[10px] text-white/60 mt-1 tracking-wider uppercase">
                  {project.metricLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <h3
                ref={clientRef as React.RefObject<HTMLHeadingElement>}
                className="font-display font-bold text-xl md:text-2xl tracking-[-0.02em] text-white font-mono"
              >
                {clientDisplay || project.client}
              </h3>
              <span className="font-mono text-[10px] text-white/30 tracking-wider">
                {project.url}
              </span>
            </div>

            <p className="font-display text-base text-white/60 leading-[1.7] mb-3">
              {project.description}
            </p>

            <p className="font-display text-sm text-white/35 leading-[1.7] mb-6">
              {project.result}
            </p>

            <div ref={tagsRef} className="flex flex-wrap items-center gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="anime-tag font-mono text-[10px] px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-cyan-400/70 tracking-wider
                    group-hover:bg-cyan/10 group-hover:border-cyan/20 group-hover:text-cyan-400 transition-colors duration-500"
                  style={{ opacity: 0 }}
                >
                  {tag}
                </span>
              ))}

              <div className="ml-auto flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-mono text-[10px] text-cyan-400/60 tracking-wider uppercase">View Case Study</span>
                <svg className="w-5 h-5 text-cyan-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-r from-cyan/[0.02] to-transparent" />
      </motion.div>
    </Link>
  );
}

export default function FeaturedWork() {
  const ref = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !headerRef.current) return;

    animate(headerRef.current.querySelectorAll(".anime-work-header"), {
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 1000,
      delay: stagger(120),
      ease: "outExpo",
    });

    const dot = headerRef.current.querySelector(".anime-accent-dot");
    if (dot) {
      animate(dot, {
        scale: [0, 1],
        opacity: [0, 1],
        duration: 500,
        delay: 400,
        ease: "out(3)",
      });
    }
  }, [isInView]);

  return (
    <section id="work" ref={ref} className="section-padding relative">
      <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-indigo-600/8 blur-[120px]" />
      <div className="absolute bottom-[20%] left-[-5%] w-[300px] h-[300px] rounded-full bg-orange-500/6 blur-[100px]" />

      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div>
            <p className="anime-work-header font-mono text-[10px] tracking-[0.4em] text-cyan-400/50 uppercase mb-5" style={{ opacity: 0 }}>
              <span className="anime-accent-dot inline-block w-2 h-2 rounded-full bg-cyan-400/60 mr-2 align-middle" style={{ opacity: 0 }} />
              Featured Work
            </p>
            <h2 className="anime-work-header font-display font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-[-0.03em] text-white" style={{ opacity: 0 }}>
              Results That
              <br />
              <span className="text-gradient-cyan">Speak Volumes</span>
            </h2>
          </div>
          <p className="anime-work-header font-display text-base text-white/40 max-w-xs leading-[1.8] tracking-wide" style={{ opacity: 0 }}>
            Real clients. Real metrics. Real ROI.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-6"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.client} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
