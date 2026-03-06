"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-surface-base/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-24 py-5">
        <a href="#" className="font-display font-bold text-xl tracking-[-0.03em] text-white">
          ZOETA<span className="text-gradient-cyan">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8 font-display text-sm font-medium tracking-wide text-white/50">
          <a
            href="#services"
            className="hover:text-cyan-400 transition-colors duration-300 focus-visible:outline-none focus-visible:text-cyan-400"
          >
            SERVICES
          </a>
          <a
            href="#work"
            className="hover:text-cyan-400 transition-colors duration-300 focus-visible:outline-none focus-visible:text-cyan-400"
          >
            WORK
          </a>
          <a
            href="#about"
            className="hover:text-cyan-400 transition-colors duration-300 focus-visible:outline-none focus-visible:text-cyan-400"
          >
            ABOUT
          </a>
        </div>

        <MagneticButton strength={0.2}>
          <a
            href="#contact"
            className="font-display text-sm font-semibold px-5 py-2.5 bg-cyan text-white rounded-full
              hover:shadow-[0_4px_24px_rgba(99,102,241,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50
              active:scale-95 transition-shadow duration-300"
          >
            Let&apos;s Talk
          </a>
        </MagneticButton>
      </div>
    </motion.nav>
  );
}
