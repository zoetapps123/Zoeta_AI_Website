"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { animate, stagger } from "animejs";
import { EASE_CINEMATIC } from "@/lib/animations";
import { useAnimeRipple } from "@/lib/useAnime";

export default function ContactForm() {
  const ref = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const { ref: buttonRef, trigger: rippleTrigger } = useAnimeRipple();

  // Staggered form field entrance
  useEffect(() => {
    if (!isInView || !formRef.current) return;
    animate(formRef.current.querySelectorAll(".anime-form-field"), {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 700,
      delay: stagger(100, { start: 400 }),
      ease: "outExpo",
    });
    const btn = formRef.current.querySelector(".anime-submit-btn");
    if (btn) {
      animate(btn, {
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.95, 1],
        duration: 600,
        delay: 900,
        ease: "outExpo",
      });
    }
  }, [isInView]);

  // Input focus glow
  useEffect(() => {
    if (!formRef.current) return;
    const inputs = formRef.current.querySelectorAll("input, textarea");
    const handleFocus = (e: Event) => {
      animate(e.target as HTMLElement, {
        boxShadow: "0 0 0 4px rgba(129, 140, 248, 0.15)",
        borderColor: "rgba(129, 140, 248, 0.3)",
        duration: 400,
        ease: "outExpo",
      });
    };
    const handleBlur = (e: Event) => {
      animate(e.target as HTMLElement, {
        boxShadow: "0 0 0 0 rgba(129, 140, 248, 0)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        duration: 400,
        ease: "outExpo",
      });
    };
    inputs.forEach((input) => {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
    });
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
    };
  }, []);

  // Success animation
  useEffect(() => {
    if (!submitted) return;
    animate(".anime-success-circle", {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 600,
      ease: "outExpo",
    });
    animate(".anime-success-text", {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      delay: 400,
      ease: "outExpo",
    });

    // Confetti particles
    const container = document.querySelector(".anime-success-container");
    if (container) {
      const particles: HTMLDivElement[] = [];
      const colors = ["#818CF8", "#F472B6", "#C084FC", "#FB923C", "#34D399"];
      for (let i = 0; i < 30; i++) {
        const p = document.createElement("div");
        p.style.cssText = `position:absolute;width:${3 + Math.random() * 6}px;height:${3 + Math.random() * 6}px;background:${colors[Math.floor(Math.random() * colors.length)]};border-radius:${Math.random() > 0.5 ? "50%" : "2px"};left:50%;top:50%;pointer-events:none;`;
        container.appendChild(p);
        particles.push(p);
      }
      animate(particles, {
        translateX: () => (-200 + Math.random() * 400),
        translateY: () => (-200 + Math.random() * 300),
        rotate: () => Math.random() * 360,
        scale: [1, 0],
        opacity: [1, 0],
        duration: 1200,
        delay: stagger(20, { start: 300 }),
        ease: "outExpo",
        onComplete: () => particles.forEach((p) => p.remove()),
      });
    }
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      businessName: formData.get("businessName") as string,
      personName: formData.get("personName") as string,
      email: formData.get("email") as string,
      location: formData.get("location") as string,
      query: formData.get("query") as string,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly at zoetapps123@gmail.com");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-cyan/[0.08] blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent-pink/[0.06] blur-[120px]" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
          className="text-center mb-16"
        >
          <p className="font-mono text-[10px] tracking-[0.4em] text-cyan/60 uppercase mb-5">Drop a Query</p>
          <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl tracking-[-0.03em] text-white">
            Let&apos;s Build Something<br /><span className="text-gradient-cyan">Together</span>
          </h2>
          <p className="font-display text-base md:text-lg text-white/50 mt-6 max-w-xl mx-auto leading-relaxed">
            Tell us about your business and what you&apos;d like to achieve.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="thank-you" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE_CINEMATIC }} className="anime-success-container text-center py-20 relative">
              <div className="anime-success-circle inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan/10 border border-cyan/20 mb-8" style={{ opacity: 0 }}>
                <svg className="w-10 h-10 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <div className="anime-success-text" style={{ opacity: 0 }}>
                <h3 className="font-display font-bold text-2xl md:text-4xl text-white mb-4 tracking-[-0.02em]">Thank You!</h3>
                <p className="font-display text-base md:text-lg text-white/50 max-w-md mx-auto leading-relaxed">
                  We&apos;ve received your query and will reach out within <span className="text-cyan font-medium">24 hours</span>.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.form key="form" ref={formRef} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE_CINEMATIC }} onSubmit={handleSubmit} className="rounded-2xl p-6 sm:p-8 md:p-12 border border-white/10" style={{ background: "rgba(255, 255, 255, 0.04)", backdropFilter: "blur(12px)", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="anime-form-field" style={{ opacity: 0 }}>
                  <label htmlFor="businessName" className="block font-display text-sm font-medium text-white/70 mb-2">Business Name</label>
                  <input type="text" id="businessName" name="businessName" required className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-display text-sm focus:outline-none placeholder:text-white/30 transition-colors duration-200" placeholder="Your company name" />
                </div>
                <div className="anime-form-field" style={{ opacity: 0 }}>
                  <label htmlFor="personName" className="block font-display text-sm font-medium text-white/70 mb-2">Your Name</label>
                  <input type="text" id="personName" name="personName" required className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-display text-sm focus:outline-none placeholder:text-white/30 transition-colors duration-200" placeholder="Your full name" />
                </div>
                <div className="anime-form-field" style={{ opacity: 0 }}>
                  <label htmlFor="email" className="block font-display text-sm font-medium text-white/70 mb-2">Email Address</label>
                  <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-display text-sm focus:outline-none placeholder:text-white/30 transition-colors duration-200" placeholder="you@company.com" />
                </div>
                <div className="anime-form-field" style={{ opacity: 0 }}>
                  <label htmlFor="location" className="block font-display text-sm font-medium text-white/70 mb-2">Location</label>
                  <input type="text" id="location" name="location" required className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-display text-sm focus:outline-none placeholder:text-white/30 transition-colors duration-200" placeholder="City, Country" />
                </div>
              </div>
              <div className="anime-form-field mb-8" style={{ opacity: 0 }}>
                <label htmlFor="query" className="block font-display text-sm font-medium text-white/70 mb-2">What would you like to work on?</label>
                <textarea id="query" name="query" rows={5} required className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-display text-sm focus:outline-none placeholder:text-white/30 transition-colors duration-200 resize-none" placeholder="Tell us about your project, goals, and how we can help..." />
              </div>
              {error && <p className="font-display text-sm text-red-400 mb-4">{error}</p>}
              <div className="anime-form-field flex flex-col-reverse sm:flex-row items-center justify-between gap-4" style={{ opacity: 0 }}>
                <p className="font-mono text-xs text-white/30">We&apos;ll respond within 24 hours</p>
                <button ref={buttonRef as React.RefObject<HTMLButtonElement>} type="submit" disabled={sending} onClick={(e) => !sending && rippleTrigger(e)} className="anime-submit-btn relative inline-flex items-center gap-2 font-display font-bold text-sm px-8 py-3.5 bg-cyan text-white rounded-full hover:shadow-[0_4px_24px_rgba(99,102,241,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50 active:scale-95 transition-shadow duration-300 disabled:opacity-70 overflow-hidden">
                  {sending ? "Sending..." : "Send Query"}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
