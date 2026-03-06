"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { EASE_CINEMATIC } from "@/lib/animations";

export default function ContactForm() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

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
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-cyan/[0.08] blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent-pink/[0.06] blur-[120px]" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
          className="text-center mb-16"
        >
          <p className="font-mono text-[10px] tracking-[0.4em] text-cyan/60 uppercase mb-5">
            Drop a Query
          </p>
          <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl tracking-[-0.03em] text-white">
            Let&apos;s Build Something
            <br />
            <span className="text-gradient-cyan">Together</span>
          </h2>
          <p className="font-display text-base md:text-lg text-white/50 mt-6 max-w-xl mx-auto leading-relaxed">
            Tell us about your business and what you&apos;d like to achieve.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="thank-you"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan/10 border border-cyan/20 mb-8">
                <svg className="w-10 h-10 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-2xl md:text-4xl text-white mb-4 tracking-[-0.02em]">
                Thank You!
              </h3>
              <p className="font-display text-base md:text-lg text-white/50 max-w-md mx-auto leading-relaxed">
                We&apos;ve received your query and will reach out within <span className="text-cyan font-medium">24 hours</span>.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_CINEMATIC }}
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 md:p-12 border border-white/10"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="businessName" className="block font-display text-sm font-medium text-white/70 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-display text-sm
                      focus:outline-none focus:ring-2 focus:ring-cyan/30 focus:border-cyan/30
                      placeholder:text-white/30 transition-shadow duration-200"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label htmlFor="personName" className="block font-display text-sm font-medium text-white/70 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="personName"
                    name="personName"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-display text-sm
                      focus:outline-none focus:ring-2 focus:ring-cyan/30 focus:border-cyan/30
                      placeholder:text-white/30 transition-shadow duration-200"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-display text-sm font-medium text-white/70 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-display text-sm
                      focus:outline-none focus:ring-2 focus:ring-cyan/30 focus:border-cyan/30
                      placeholder:text-white/30 transition-shadow duration-200"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block font-display text-sm font-medium text-white/70 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-display text-sm
                      focus:outline-none focus:ring-2 focus:ring-cyan/30 focus:border-cyan/30
                      placeholder:text-white/30 transition-shadow duration-200"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label htmlFor="query" className="block font-display text-sm font-medium text-white/70 mb-2">
                  What would you like to work on?
                </label>
                <textarea
                  id="query"
                  name="query"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-display text-sm
                    focus:outline-none focus:ring-2 focus:ring-cyan/30 focus:border-cyan/30
                    placeholder:text-white/30 transition-shadow duration-200 resize-none"
                  placeholder="Tell us about your project, goals, and how we can help..."
                />
              </div>

              {error && (
                <p className="font-display text-sm text-red-400 mb-4">{error}</p>
              )}

              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-white/30">
                  We&apos;ll respond within 24 hours
                </p>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 font-display font-bold text-sm px-8 py-3.5 bg-cyan text-white rounded-full
                    hover:shadow-[0_4px_24px_rgba(99,102,241,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50
                    active:scale-95 transition-shadow duration-300 disabled:opacity-70"
                >
                  {sending ? "Sending..." : "Send Query"}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
