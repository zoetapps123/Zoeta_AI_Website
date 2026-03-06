"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer, EASE_CINEMATIC } from "@/lib/animations";

const projects = [
  {
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

export default function FeaturedWork() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" ref={ref} className="section-padding relative">
      {/* Background orbs */}
      <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-indigo-600/8 blur-[120px]" />
      <div className="absolute bottom-[20%] left-[-5%] w-[300px] h-[300px] rounded-full bg-orange-500/6 blur-[100px]" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] text-cyan-400/50 uppercase mb-5">
              Featured Work
            </p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-[-0.03em] text-white">
              Results That
              <br />
              <span className="text-gradient-cyan">Speak Volumes</span>
            </h2>
          </div>
          <p className="font-display text-base text-white/40 max-w-xs leading-[1.8] tracking-wide">
            Real clients. Real metrics. Real ROI.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.client}
              variants={fadeInUp}
              className="group relative rounded-2xl overflow-hidden glass-card hover:border-cyan/20 transition-colors duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left: Image + metric */}
                <div className="lg:col-span-4 relative overflow-hidden">
                  <div className="aspect-[3/2] lg:aspect-auto lg:h-full">
                    <img
                      src={project.image}
                      alt={project.client}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="font-display font-bold text-3xl md:text-4xl text-white tracking-[-0.03em]">
                        {project.metric}
                      </span>
                      <p className="font-mono text-[10px] text-white/60 mt-1 tracking-wider uppercase">
                        {project.metricLabel}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="lg:col-span-8 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="font-display font-bold text-xl md:text-2xl tracking-[-0.02em] text-white">
                      {project.client}
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

                  <div className="flex flex-wrap items-center gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-cyan-400/70 tracking-wider
                          group-hover:bg-cyan/10 group-hover:border-cyan/20 group-hover:text-cyan-400 transition-colors duration-500"
                      >
                        {tag}
                      </span>
                    ))}

                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <svg className="w-5 h-5 text-cyan-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
