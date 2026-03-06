"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled || mobileOpen
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

        <div className="flex items-center gap-4">
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus-visible:outline-none"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-white/70 transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <span className={`block w-5 h-px bg-white/70 transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-white/70 transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-surface-base/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="flex flex-col items-center gap-6 py-8 font-display text-sm font-medium tracking-wide text-white/50">
              <a
                href="#services"
                onClick={() => setMobileOpen(false)}
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                SERVICES
              </a>
              <a
                href="#work"
                onClick={() => setMobileOpen(false)}
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                WORK
              </a>
              <a
                href="#about"
                onClick={() => setMobileOpen(false)}
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                ABOUT
              </a>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                CONTACT
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
