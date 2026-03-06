"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/animations/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const visionGoals = [
  { label: "01", text: "Engineer Outcomes, Not Services" },
  { label: "02", text: "Measurable ROI on Every Build" },
  { label: "03", text: "AI-First. Always." },
  { label: "04", text: "Ship in Days, Not Quarters" },
];

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current || !stageRef.current) return;

      const stage = stageRef.current;
      const rocket = stage.querySelector(".rocket");
      const flame = stage.querySelector(".flame");
      const earth = stage.querySelector(".earth");
      const starsNear = stage.querySelector(".stars-near");
      const starsFar = stage.querySelector(".stars-far");
      const bgLayers = stage.querySelectorAll(".bg-terrain");
      const moon = stage.querySelector(".moon");
      const goals = stage.querySelectorAll(".vision-goal");
      const debris = stage.querySelectorAll(".debris");
      const astronaut = stage.querySelector(".astronaut-final");
      const flag = stage.querySelector(".flag");
      const landing = stage.querySelector(".landing-cta");
      const terrainLabel = stage.querySelector(".terrain-label");
      const rocketGlow = stage.querySelector(".rocket-glow");

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stage,
        pinSpacing: false,
      });

      /* ===== TERRAIN LABEL ===== */
      if (terrainLabel) {
        const labels = ["LEAVING ATMOSPHERE", "DEEP SPACE", "NEBULA PASSAGE", "ASTEROID FIELD", "LUNAR APPROACH"];
        const intervals = [[2, 14], [16, 30], [32, 46], [48, 60], [64, 82]];
        intervals.forEach(([start, end], i) => {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: `${start}% top`,
            end: `${end}% top`,
            onEnter: () => { terrainLabel.textContent = labels[i]; },
            onEnterBack: () => { terrainLabel.textContent = labels[i]; },
          });
          gsap.fromTo(terrainLabel, { opacity: 0 }, {
            opacity: 0.7,
            scrollTrigger: { trigger: sectionRef.current, start: `${start}% top`, end: `${start + 3}% top`, scrub: 1 },
          });
          gsap.to(terrainLabel, {
            opacity: 0,
            scrollTrigger: { trigger: sectionRef.current, start: `${end - 4}% top`, end: `${end}% top`, scrub: 1 },
          });
        });
      }

      /* ===== PHASE 1: LAUNCH (0-15%) ===== */
      if (rocket) {
        gsap.fromTo(rocket, { y: 300, opacity: 0, scale: 0.5 }, {
          y: 0, opacity: 1, scale: 1,
          scrollTrigger: { trigger: sectionRef.current, start: "0% top", end: "8% top", scrub: 1 },
        });
      }
      if (flame) {
        gsap.fromTo(flame, { scaleY: 0, opacity: 0 }, {
          scaleY: 1, opacity: 1,
          scrollTrigger: { trigger: sectionRef.current, start: "3% top", end: "10% top", scrub: 1 },
        });
        // Flame flickers during flight
        gsap.to(flame, {
          scaleX: 0.9,
          scrollTrigger: { trigger: sectionRef.current, start: "10% top", end: "50% top", scrub: 1 },
        });
      }
      if (rocketGlow) {
        gsap.fromTo(rocketGlow, { opacity: 0 }, {
          opacity: 1,
          scrollTrigger: { trigger: sectionRef.current, start: "5% top", end: "12% top", scrub: 1 },
        });
      }
      if (earth) {
        gsap.to(earth, {
          y: 600, scale: 0.2, opacity: 0,
          scrollTrigger: { trigger: sectionRef.current, start: "5% top", end: "22% top", scrub: 1 },
        });
      }

      /* ===== BACKGROUND TERRAIN TRANSITIONS ===== */
      // 5 backgrounds that crossfade as you scroll
      bgLayers.forEach((layer, i) => {
        const fadeIn = 2 + i * 15;
        const fadeOut = fadeIn + 18;
        gsap.fromTo(layer, { opacity: 0 }, {
          opacity: 1,
          scrollTrigger: { trigger: sectionRef.current, start: `${fadeIn}% top`, end: `${fadeIn + 5}% top`, scrub: 1 },
        });
        if (i < bgLayers.length - 1) {
          gsap.to(layer, {
            opacity: 0,
            scrollTrigger: { trigger: sectionRef.current, start: `${fadeOut - 3}% top`, end: `${fadeOut}% top`, scrub: 1 },
          });
        }
      });

      // Parallax star movement
      if (starsNear) {
        gsap.to(starsNear, { y: -1200, scrollTrigger: { trigger: sectionRef.current, start: "0% top", end: "85% top", scrub: 1 } });
      }
      if (starsFar) {
        gsap.to(starsFar, { y: -500, scrollTrigger: { trigger: sectionRef.current, start: "0% top", end: "85% top", scrub: 1 } });
      }

      /* ===== PHASE 2: DISINTEGRATION (30-58%) ===== */
      if (rocket) {
        // Rocket shakes
        gsap.to(rocket, {
          x: 3,
          scrollTrigger: { trigger: sectionRef.current, start: "28% top", end: "35% top", scrub: 1 },
        });
        gsap.to(rocket, {
          x: -3,
          scrollTrigger: { trigger: sectionRef.current, start: "35% top", end: "40% top", scrub: 1 },
        });
        gsap.to(rocket, {
          opacity: 0.3, scale: 0.85,
          scrollTrigger: { trigger: sectionRef.current, start: "35% top", end: "52% top", scrub: 1 },
        });
        gsap.to(rocket, {
          opacity: 0,
          scrollTrigger: { trigger: sectionRef.current, start: "52% top", end: "58% top", scrub: 1 },
        });
      }
      if (flame) {
        gsap.to(flame, {
          opacity: 0, scaleY: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "42% top", end: "55% top", scrub: 1 },
        });
      }
      if (rocketGlow) {
        gsap.to(rocketGlow, {
          opacity: 0,
          scrollTrigger: { trigger: sectionRef.current, start: "45% top", end: "55% top", scrub: 1 },
        });
      }

      // Debris explodes outward
      debris.forEach((piece, i) => {
        const angle = (i / debris.length) * Math.PI * 2;
        const dist = 250 + Math.random() * 200;
        gsap.fromTo(piece, { opacity: 0, x: 0, y: 0, rotation: 0 }, {
          opacity: 0, x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, rotation: Math.random() * 720,
          scrollTrigger: { trigger: sectionRef.current, start: "34% top", end: "58% top", scrub: 1 },
        });
        gsap.fromTo(piece, { opacity: 0 }, {
          opacity: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "34% top", end: "40% top", scrub: 1 },
        });
        gsap.to(piece, {
          opacity: 0,
          scrollTrigger: { trigger: sectionRef.current, start: "50% top", end: "58% top", scrub: 1 },
        });
      });

      // Vision goals — LARGE, center screen
      goals.forEach((goal, i) => {
        const start = 30 + i * 7;
        gsap.fromTo(goal, { opacity: 0, scale: 0.7, y: 80 }, {
          opacity: 1, scale: 1, y: 0,
          scrollTrigger: { trigger: sectionRef.current, start: `${start}% top`, end: `${start + 4}% top`, scrub: 1 },
        });
        gsap.to(goal, {
          opacity: 0, y: -80, scale: 1.2,
          scrollTrigger: { trigger: sectionRef.current, start: `${start + 6}% top`, end: `${start + 10}% top`, scrub: 1 },
        });
      });

      /* ===== PHASE 3: MOON LANDING (62-95%) ===== */
      if (moon) {
        gsap.fromTo(moon, { scale: 0.1, opacity: 0, y: -200 }, {
          scale: 1, opacity: 1, y: 0,
          scrollTrigger: { trigger: sectionRef.current, start: "60% top", end: "78% top", scrub: 1 },
        });
      }
      if (astronaut) {
        gsap.fromTo(astronaut, { opacity: 0, y: -120, scale: 0.3 }, {
          opacity: 1, y: 0, scale: 1,
          scrollTrigger: { trigger: sectionRef.current, start: "74% top", end: "84% top", scrub: 1 },
        });
      }
      if (flag) {
        gsap.fromTo(flag, { opacity: 0, scaleY: 0 }, {
          opacity: 1, scaleY: 1,
          scrollTrigger: { trigger: sectionRef.current, start: "82% top", end: "88% top", scrub: 1 },
        });
      }
      if (landing) {
        gsap.fromTo(landing, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0,
          scrollTrigger: { trigger: sectionRef.current, start: "87% top", end: "94% top", scrub: 1 },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative min-h-[800vh]">
      <div
        ref={stageRef}
        className="h-screen w-full overflow-hidden relative"
        style={{ background: "#050510" }}
      >
        {/* Labels */}
        <div className="absolute top-8 left-8 z-50">
          <p className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase">Our Vision</p>
        </div>
        <div className="absolute top-8 right-8 z-50">
          <p className="terrain-label font-mono text-[10px] tracking-[0.3em] text-indigo-400/0 uppercase font-medium" />
        </div>

        {/* ===== BACKGROUND TERRAIN LAYERS — crossfade on scroll ===== */}
        {/* Layer 1: Earth atmosphere — warm orange-blue gradient */}
        <div className="bg-terrain absolute inset-0 opacity-0" style={{
          background: "linear-gradient(180deg, #0a0a20 0%, #1a1040 30%, #2d1860 50%, #4a2080 70%, #1a0a30 100%)",
        }} />
        {/* Layer 2: Deep space — dark blue-black with distant galaxies */}
        <div className="bg-terrain absolute inset-0 opacity-0" style={{
          background: "radial-gradient(ellipse at 30% 40%, rgba(99,102,241,0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(139,92,246,0.08) 0%, transparent 40%), #050510",
        }} />
        {/* Layer 3: Nebula — vivid purple/pink gas clouds */}
        <div className="bg-terrain absolute inset-0 opacity-0" style={{
          background: "radial-gradient(ellipse at 25% 35%, rgba(236,72,153,0.18) 0%, transparent 45%), radial-gradient(ellipse at 75% 55%, rgba(139,92,246,0.2) 0%, transparent 50%), radial-gradient(ellipse at 50% 70%, rgba(99,102,241,0.1) 0%, transparent 40%), #080515",
        }} />
        {/* Layer 4: Asteroid belt — warm, dusty */}
        <div className="bg-terrain absolute inset-0 opacity-0" style={{
          background: "radial-gradient(ellipse at 40% 50%, rgba(251,146,60,0.08) 0%, transparent 50%), radial-gradient(ellipse at 60% 40%, rgba(234,179,8,0.06) 0%, transparent 40%), #0a0810",
        }} />
        {/* Layer 5: Lunar approach — cool silver-grey */}
        <div className="bg-terrain absolute inset-0 opacity-0" style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(200,200,220,0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(99,102,241,0.05) 0%, transparent 40%), #060810",
        }} />

        {/* ===== STAR LAYERS ===== */}
        <div className="stars-far absolute inset-0" style={{ top: "-30%" }}>
          {Array.from({ length: isMobile ? 40 : 150 }).map((_, i) => (
            <div key={`sf${i}`} className="absolute rounded-full" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 180}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              opacity: Math.random() * 0.5 + 0.1,
              background: Math.random() > 0.85 ? "#C7D2FE" : Math.random() > 0.7 ? "#FDE68A" : "white",
            }} />
          ))}
        </div>
        <div className="stars-near absolute inset-0" style={{ top: "-40%" }}>
          {Array.from({ length: isMobile ? 20 : 80 }).map((_, i) => (
            <div key={`sn${i}`} className="absolute rounded-full bg-white" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 200}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.8 + 0.2,
            }} />
          ))}
        </div>

        {/* ===== EARTH ===== */}
        <div className="earth absolute bottom-[-10%] left-1/2 -translate-x-1/2 z-10">
          <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[550px] md:h-[550px]">
            <div className="absolute inset-0 rounded-full overflow-hidden" style={{
              background: "radial-gradient(circle at 40% 35%, #4a6cf7 0%, #2d4a8c 25%, #1a2d5e 50%, #0d1633 80%, #050510 100%)",
              boxShadow: "0 0 100px rgba(99,102,241,0.2), inset 0 0 60px rgba(99,102,241,0.1)",
            }}>
              <div className="absolute top-[15%] left-[25%] w-[45%] h-[30%] rounded-[40%] bg-[#1a5a2a]/25 blur-sm rotate-12" />
              <div className="absolute top-[50%] left-[10%] w-[30%] h-[20%] rounded-[40%] bg-[#1a5a2a]/20 blur-sm -rotate-6" />
              <div className="absolute top-[30%] right-[15%] w-[20%] h-[28%] rounded-[40%] bg-[#1a5a2a]/20 blur-sm rotate-45" />
            </div>
            <div className="absolute -inset-6 rounded-full" style={{
              background: "radial-gradient(circle, transparent 44%, rgba(100,140,255,0.08) 50%, transparent 56%)",
            }} />
          </div>
        </div>

        {/* ===== ROCKET — MUCH BIGGER ===== */}
        <div className="rocket absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0">
          <svg viewBox="0 0 120 300" fill="none" className="w-32 md:w-48 lg:w-56 h-auto">
            {/* Main fuselage */}
            <path d="M60 0 C60 0 85 40 85 100 L85 210 C85 228 76 236 60 242 C44 236 35 228 35 210 L35 100 C35 40 60 0 60 0Z" fill="#1a1a28" stroke="#444" strokeWidth="0.8" />
            {/* Nose cone panel */}
            <path d="M60 0 C60 0 75 30 75 60 L45 60 C45 30 60 0 60 0Z" fill="#222235" stroke="#6366F1" strokeWidth="0.5" opacity="0.5" />
            {/* Body panels / detail lines */}
            <line x1="35" y1="100" x2="85" y2="100" stroke="#333" strokeWidth="0.3" />
            <line x1="35" y1="160" x2="85" y2="160" stroke="#333" strokeWidth="0.3" />
            <line x1="35" y1="200" x2="85" y2="200" stroke="#333" strokeWidth="0.3" />
            {/* Windows */}
            <circle cx="60" cy="80" r="7" fill="#0a0a20" stroke="#6366F1" strokeWidth="0.6" opacity="0.7">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="60" cy="108" r="5" fill="#0a0a20" stroke="#6366F1" strokeWidth="0.4" opacity="0.5" />
            <circle cx="60" cy="130" r="4" fill="#0a0a20" stroke="#6366F1" strokeWidth="0.3" opacity="0.4" />
            {/* Side boosters */}
            <rect x="35" y="105" width="5" height="75" rx="2" fill="#252535" stroke="#444" strokeWidth="0.3" />
            <rect x="80" y="105" width="5" height="75" rx="2" fill="#252535" stroke="#444" strokeWidth="0.3" />
            {/* Wings */}
            <path d="M35 150 L5 220 L15 225 L35 205Z" fill="#15152a" stroke="#444" strokeWidth="0.6" />
            <path d="M85 150 L115 220 L105 225 L85 205Z" fill="#15152a" stroke="#444" strokeWidth="0.6" />
            {/* Wing accents */}
            <path d="M20 215 L35 195" stroke="#6366F1" strokeWidth="0.3" opacity="0.3" />
            <path d="M100 215 L85 195" stroke="#6366F1" strokeWidth="0.3" opacity="0.3" />
            {/* Tail fins */}
            <path d="M52 215 L48 252 L60 242Z" fill="#222235" stroke="#444" strokeWidth="0.3" />
            <path d="M68 215 L72 252 L60 242Z" fill="#222235" stroke="#444" strokeWidth="0.3" />
            {/* Engine bell */}
            <ellipse cx="60" cy="242" rx="16" ry="6" fill="#111122" stroke="#444" strokeWidth="0.5" />
            <ellipse cx="60" cy="242" rx="10" ry="4" fill="#0a0a18" />
            {/* ZOETA branding on body */}
            <text x="60" y="178" fill="#6366F1" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.35" letterSpacing="2">ZOETA.</text>
            {/* Side flag stripes */}
            <rect x="45" y="145" width="30" height="1.5" rx="0.5" fill="#6366F1" opacity="0.15" />
            <rect x="45" y="150" width="30" height="1.5" rx="0.5" fill="#C084FC" opacity="0.1" />
          </svg>

          {/* Flame — bigger */}
          <div className="flame absolute -bottom-32 left-1/2 -translate-x-1/2 origin-top">
            <div className="relative">
              <div className="w-14 h-40 md:w-20 md:h-52 mx-auto" style={{
                background: "linear-gradient(to bottom, #fff 0%, #FFB86C 10%, #FF6B35 25%, #FFD700 45%, #6366F1 70%, transparent 100%)",
                clipPath: "polygon(12% 0%, 88% 0%, 100% 20%, 70% 100%, 30% 100%, 0% 20%)",
                filter: "blur(3px)",
              }} />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-32 md:w-12 md:h-40" style={{
                background: "linear-gradient(to bottom, white 0%, #FFD700 25%, transparent 100%)",
                clipPath: "polygon(20% 0%, 80% 0%, 90% 20%, 58% 100%, 42% 100%, 10% 20%)",
                filter: "blur(1px)",
              }} />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-orange-500/15 blur-2xl" />
            </div>
          </div>
        </div>

        {/* Rocket ambient glow */}
        <div className="rocket-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 z-15 w-48 h-64 md:w-64 md:h-80 rounded-full opacity-0" style={{
          background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)",
          filter: "blur(30px)",
        }} />

        {/* ===== DEBRIS ===== */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-18">
          {Array.from({ length: isMobile ? 8 : 20 }).map((_, i) => (
            <div key={i} className="debris absolute opacity-0" style={{
              width: `${8 + Math.random() * 14}px`,
              height: `${6 + Math.random() * 10}px`,
              background: i % 5 === 0 ? "#555" : i % 5 === 1 ? "rgba(99,102,241,0.5)" : i % 5 === 2 ? "#2a2a3a" : i % 5 === 3 ? "rgba(192,132,252,0.3)" : "#333",
              clipPath: "polygon(20% 0%, 80% 10%, 100% 60%, 70% 100%, 10% 80%)",
            }} />
          ))}
        </div>

        {/* ===== VISION GOALS — FULL WIDTH, MASSIVE TEXT ===== */}
        {visionGoals.map((goal, i) => {
          return (
            <div key={i} className="vision-goal absolute inset-0 flex items-center justify-center z-30 opacity-0 pointer-events-none">
              <div className="text-center px-6 max-w-4xl">
                <span className="font-mono text-xs md:text-sm text-indigo-400/60 tracking-[0.4em] uppercase block mb-4 md:mb-6">
                  {goal.label}
                </span>
                <p className="font-display font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white/95 leading-[1.1] tracking-[-0.03em]">
                  {goal.text}
                </p>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent mx-auto mt-6" />
              </div>
            </div>
          );
        })}

        {/* ===== MOON ===== */}
        <div className="moon absolute top-[8%] left-1/2 -translate-x-1/2 z-10 opacity-0">
          <div className="relative">
            <div className="w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] md:w-[420px] md:h-[420px] rounded-full" style={{
              background: "radial-gradient(circle at 35% 30%, #e8e4dc 0%, #c4c0b8 15%, #a09c94 35%, #787470 55%, #504c48 75%, #343230 100%)",
              boxShadow: "0 0 120px rgba(220,215,200,0.1), inset -30px -20px 60px rgba(0,0,0,0.4)",
            }}>
              <div className="absolute top-[16%] left-[20%] w-12 h-12 rounded-full bg-black/[0.08] blur-[2px]" />
              <div className="absolute top-[38%] left-[48%] w-16 h-16 rounded-full bg-black/[0.06] blur-[2px]" />
              <div className="absolute top-[60%] left-[25%] w-9 h-9 rounded-full bg-black/[0.08]" />
              <div className="absolute top-[26%] left-[56%] w-6 h-6 rounded-full bg-black/[0.06]" />
              <div className="absolute top-[52%] left-[62%] w-10 h-10 rounded-full bg-black/[0.05] blur-[1px]" />
              <div className="absolute top-[72%] left-[45%] w-7 h-7 rounded-full bg-black/[0.06]" />
            </div>
            <div className="absolute -inset-10 rounded-full bg-white/[0.012] blur-3xl" />

            {/* Surface ground line */}
            <div className="absolute bottom-[7%] left-[12%] right-[12%] h-px bg-white/[0.08]" />

            {/* ===== ASTRONAUT — bigger, more detailed ===== */}
            <div className="astronaut-final absolute bottom-[8%] left-[28%] opacity-0 z-20">
              <svg viewBox="0 0 80 120" fill="none" className="w-16 md:w-24 h-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.12)]">
                {/* Helmet */}
                <ellipse cx="40" cy="22" rx="18" ry="20" fill="#f0ece4" stroke="#ddd" strokeWidth="0.6" />
                {/* Visor */}
                <ellipse cx="40" cy="20" rx="13" ry="14" fill="#12122e" stroke="#6366F1" strokeWidth="0.5" opacity="0.7" />
                {/* Visor reflection arc */}
                <path d="M30 14 Q34 8 42 12" stroke="rgba(99,102,241,0.3)" strokeWidth="1" fill="none" />
                <ellipse cx="34" cy="17" rx="5" ry="7" fill="url(#visorGradV)" opacity="0.4" />
                {/* Helmet top light bar */}
                <rect x="28" y="4" width="24" height="4" rx="2" fill="#444" stroke="#666" strokeWidth="0.3" />
                <circle cx="40" cy="6" r="2" fill="#6366F1" opacity="0.7">
                  <animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="34" cy="6" r="1" fill="#C084FC" opacity="0.4" />
                <circle cx="46" cy="6" r="1" fill="#C084FC" opacity="0.4" />
                {/* Neck ring */}
                <ellipse cx="40" cy="40" rx="14" ry="4" fill="#d0ccc4" stroke="#bbb" strokeWidth="0.3" />
                {/* Torso */}
                <rect x="22" y="42" width="36" height="34" rx="8" fill="#e8e4dc" stroke="#ccc" strokeWidth="0.5" />
                {/* Chest control panel */}
                <rect x="28" y="46" width="24" height="14" rx="3" fill="#d4d0c8" stroke="#bbb" strokeWidth="0.3" />
                <rect x="31" y="49" width="8" height="2.5" rx="0.5" fill="#6366F1" opacity="0.5" />
                <rect x="31" y="53" width="12" height="1.5" rx="0.5" fill="#aaa" />
                <rect x="31" y="56" width="6" height="1.5" rx="0.5" fill="#999" />
                <circle cx="49" cy="50" r="2" fill="#F472B6" opacity="0.5">
                  <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="49" cy="56" r="1.5" fill="#34D399" opacity="0.4" />
                {/* Backpack */}
                <rect x="56" y="44" width="14" height="28" rx="4" fill="#dcd8d0" stroke="#bbb" strokeWidth="0.4" />
                <rect x="58" y="49" width="10" height="4" rx="1.5" fill="#bbb" />
                <rect x="58" y="56" width="10" height="4" rx="1.5" fill="#bbb" />
                <rect x="58" y="63" width="10" height="3" rx="1" fill="#aaa" />
                {/* LEFT ARM — WAVING! */}
                <path d="M22 50 L8 38 L2 26" stroke="#e8e4dc" strokeWidth="6.5" strokeLinecap="round" fill="none" />
                <circle cx="2" cy="25" r="4" fill="#e8e4dc" stroke="#ccc" strokeWidth="0.4" />
                {/* Waving hand fingers */}
                <path d="M0 22 L-2 19" stroke="#e8e4dc" strokeWidth="2" strokeLinecap="round" />
                <path d="M2 22 L2 18" stroke="#e8e4dc" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 22 L6 19" stroke="#e8e4dc" strokeWidth="2" strokeLinecap="round" />
                {/* Right arm */}
                <path d="M58 54 L68 62" stroke="#e8e4dc" strokeWidth="6.5" strokeLinecap="round" fill="none" />
                <circle cx="69" cy="63" r="4" fill="#e8e4dc" stroke="#ccc" strokeWidth="0.4" />
                {/* Legs */}
                <path d="M32 76 L28 98 L22 104" stroke="#e8e4dc" strokeWidth="6.5" strokeLinecap="round" fill="none" />
                <path d="M48 76 L52 98 L58 104" stroke="#e8e4dc" strokeWidth="6.5" strokeLinecap="round" fill="none" />
                {/* Boots */}
                <ellipse cx="21" cy="106" rx="7" ry="4" fill="#aaa" stroke="#888" strokeWidth="0.4" />
                <ellipse cx="59" cy="106" rx="7" ry="4" fill="#aaa" stroke="#888" strokeWidth="0.4" />
                {/* Boot soles */}
                <ellipse cx="21" cy="108" rx="6" ry="2" fill="#777" />
                <ellipse cx="59" cy="108" rx="6" ry="2" fill="#777" />
                <defs>
                  <radialGradient id="visorGradV" cx="0.35" cy="0.35">
                    <stop offset="0%" stopColor="#818CF8" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            {/* ===== FLAG ===== */}
            <div className="flag absolute bottom-[8%] left-[60%] origin-bottom opacity-0 z-20">
              <svg viewBox="0 0 80 85" fill="none" className="w-16 md:w-20 h-auto">
                {/* Pole */}
                <line x1="8" y1="0" x2="8" y2="85" stroke="#ccc" strokeWidth="2" />
                <circle cx="8" cy="0" r="2" fill="#eee" />
                {/* Flag body */}
                <rect x="8" y="4" width="62" height="34" rx="1.5" fill="#0f0f20" stroke="#6366F1" strokeWidth="1" />
                <rect x="10" y="6" width="58" height="30" rx="1" fill="none" stroke="#6366F1" strokeWidth="0.3" opacity="0.3" />
                {/* ZOETA. text */}
                <text x="39" y="26" fill="#6366F1" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  ZOETA.
                </text>
                {/* Subtle wave effect on right edge */}
                <path d="M70 5 Q73 21 70 37" stroke="#6366F1" strokeWidth="0.4" fill="none" opacity="0.2" />
              </svg>
            </div>
          </div>
        </div>

        {/* ===== LANDING CTA ===== */}
        <div className="landing-cta absolute bottom-[6%] left-1/2 -translate-x-1/2 z-40 text-center opacity-0">
          <p className="font-mono text-[10px] tracking-[0.4em] text-indigo-400/50 uppercase mb-3">
            Mission Complete
          </p>
          <p className="font-display font-bold text-2xl md:text-4xl lg:text-5xl tracking-[-0.03em] mb-8 text-white/90">
            Ready for liftoff?
          </p>
          <MagneticButton>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 font-display font-semibold text-sm px-10 py-4 rounded-full bg-indigo-600 text-white
                hover:bg-indigo-500 hover:shadow-[0_4px_40px_rgba(99,102,241,0.4)]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50
                active:scale-[0.97] transition-colors transition-shadow duration-500"
            >
              Work With Us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
