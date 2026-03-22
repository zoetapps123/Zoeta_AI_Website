"use client";

import { useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { animate, stagger, createTimeline } from "animejs";
import { useAnimeTextScramble } from "@/lib/useAnime";

const EASE_CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface CaseStudy {
  slug: string;
  client: string;
  url: string;
  headline: string;
  heroImage: string;
  tags: string[];
  metric: string;
  metricLabel: string;
  duration: string;
  industry: string;
  overview: string;
  challenge: string;
  approach: {
    title: string;
    detail: string;
  }[];
  results: {
    stat: string;
    label: string;
    detail: string;
  }[];
  timeline: {
    week: string;
    milestone: string;
  }[];
  testimonial?: {
    quote: string;
    name: string;
    role: string;
  };
  techStack: string[];
}

const caseStudies: Record<string, CaseStudy> = {
  size: {
    slug: "size",
    client: "SIZE",
    url: "size.co.uk",
    headline: "AI-Powered Cataloguing for 10,000+ SKUs",
    heroImage:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&h=600&fit=crop",
    tags: ["Website", "AI Cataloguing", "E-Commerce"],
    metric: "80%",
    metricLabel: "Reduction in manual tagging",
    duration: "6 weeks",
    industry: "Streetwear & Sneaker Retail",
    overview:
      "SIZE is one of the UK's largest streetwear and sneaker retailers with over 10,000 active SKUs across their online store. Their product cataloguing process was entirely manual — a team of 4 people spent an average of 12 hours per week tagging products with categories, attributes, and search keywords. Errors were frequent, inconsistent tagging hurt search relevance, and new product drops were delayed by the bottleneck.",
    challenge:
      "The existing workflow relied on spreadsheet-based tagging with no standardisation. Product images arrived from suppliers in inconsistent formats. The team needed a system that could auto-classify products from images and supplier data, apply consistent taxonomy, and integrate directly into their Shopify-based storefront — without disrupting the existing product pipeline.",
    approach: [
      {
        title: "Audit & Taxonomy Design",
        detail:
          "We audited 2 years of product data, identified 340+ unique attribute combinations, and built a standardised taxonomy of 85 categories with hierarchical tagging rules. This became the foundation for the AI model's classification targets.",
      },
      {
        title: "Multi-Modal Classification Pipeline",
        detail:
          "Built a pipeline combining GPT-4 Vision for image-based classification with structured text extraction from supplier CSV feeds. The system cross-references both signals to assign category, colour, material, gender, and 12 other attributes with confidence scoring.",
      },
      {
        title: "Human-in-the-Loop Review Interface",
        detail:
          "Developed a lightweight internal review dashboard where the team only needs to verify low-confidence classifications (typically <15% of items). High-confidence items flow straight into the catalogue — cutting the team's review workload by 80%.",
      },
      {
        title: "Shopify Integration & Go-Live",
        detail:
          "Integrated the pipeline directly into their existing Shopify product upload workflow via a custom app. New products are auto-tagged within minutes of upload. Deployed with a 2-week parallel run alongside the manual process to validate accuracy.",
      },
    ],
    results: [
      {
        stat: "80%",
        label: "Reduction in manual tagging time",
        detail:
          "Team went from 12 hours/week of manual tagging to reviewing only edge cases — about 2.5 hours/week.",
      },
      {
        stat: "94.7%",
        label: "Classification accuracy",
        detail:
          "Across 10,000+ SKUs, the system matched or exceeded human accuracy on product categorisation.",
      },
      {
        stat: "3x",
        label: "Faster product drops",
        detail:
          "New product lines now go live within hours of supplier delivery, not days.",
      },
    ],
    timeline: [
      { week: "Week 1", milestone: "Data audit and taxonomy design" },
      { week: "Week 2-3", milestone: "AI classification pipeline development" },
      { week: "Week 4", milestone: "Review dashboard and Shopify integration" },
      { week: "Week 5-6", milestone: "Parallel validation run and go-live" },
    ],
    testimonial: {
      quote:
        "We were spending entire days just tagging products. Now the system handles it automatically and our team focuses on merchandising strategy instead.",
      name: "Operations Lead",
      role: "SIZE",
    },
    techStack: [
      "GPT-4 Vision",
      "Python",
      "Shopify API",
      "Next.js",
      "PostgreSQL",
      "Redis",
    ],
  },
  gymbox: {
    slug: "gymbox",
    client: "Gymbox",
    url: "gymbox.com",
    headline: "AI Coaching Engine That Doubled Member Engagement",
    heroImage:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=600&fit=crop",
    tags: ["Website", "AI Coaching", "Mobile App"],
    metric: "2x",
    metricLabel: "Member engagement increase",
    duration: "8 weeks",
    industry: "Fitness & Wellness",
    overview:
      "Gymbox is London's most rebellious gym chain — known for unconventional classes and a strong brand identity. Despite high brand awareness, member retention was plateauing. Members signed up excited but engagement dropped off after the first month. The team wanted a way to keep members engaged through personalised coaching without hiring a fleet of personal trainers.",
    challenge:
      "Gymbox had no unified digital experience — their website was outdated, class booking was clunky, and there was zero personalisation in the member journey. They needed a complete digital overhaul: a modern web presence that matched their brand energy, a mobile app for daily engagement, and an AI-powered coaching engine that could deliver personalised workout and class recommendations at scale.",
    approach: [
      {
        title: "Member Data Analysis",
        detail:
          "Analysed 18 months of booking data, check-in patterns, and class attendance across 7 locations. Identified 5 distinct member personas based on workout frequency, class preferences, and engagement patterns.",
      },
      {
        title: "AI Coaching Engine",
        detail:
          "Built a recommendation engine that combines member history, stated goals, class schedules, and real-time capacity data. The system generates weekly personalised plans — suggesting specific classes, times, and progressive challenges tailored to each member's fitness level and preferences.",
      },
      {
        title: "Mobile App Development",
        detail:
          "Designed and shipped a React Native app with class booking, AI-generated workout plans, progress tracking, and push notifications. The coaching engine feeds directly into the app's home screen with daily recommendations.",
      },
      {
        title: "Website Redesign",
        detail:
          "Rebuilt the marketing site from scratch with a bold, editorial design matching Gymbox's brand DNA. Integrated class schedules, location pages, and a streamlined signup flow that feeds directly into the personalisation engine.",
      },
    ],
    results: [
      {
        stat: "2x",
        label: "Member engagement",
        detail:
          "Average weekly sessions per member went from 1.8 to 3.6 within 3 months of launch.",
      },
      {
        stat: "10K+",
        label: "App downloads in month 1",
        detail:
          "Organic adoption driven by in-gym promotion and the quality of personalised recommendations.",
      },
      {
        stat: "35%",
        label: "Improvement in 90-day retention",
        detail:
          "Members using the AI coaching features were significantly more likely to stay past the 3-month mark.",
      },
    ],
    timeline: [
      { week: "Week 1-2", milestone: "Data analysis and persona modelling" },
      {
        week: "Week 3-4",
        milestone: "AI coaching engine and recommendation system",
      },
      { week: "Week 5-6", milestone: "Mobile app development and testing" },
      {
        week: "Week 7-8",
        milestone: "Website redesign, integration, and launch",
      },
    ],
    testimonial: {
      quote:
        "The AI coaching engine feels like having a personal trainer in your pocket. Members are booking more classes and sticking around longer.",
      name: "Head of Digital",
      role: "Gymbox",
    },
    techStack: [
      "React Native",
      "Next.js",
      "Python",
      "OpenAI API",
      "PostgreSQL",
      "Firebase",
    ],
  },
  "rumble-boxing": {
    slug: "rumble-boxing",
    client: "Rumble Boxing",
    url: "rumbleboxing.com",
    headline: "AI Voice Agents That 3x'd Qualified Lead Generation",
    heroImage:
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&h=600&fit=crop",
    tags: ["AI Voice Agents", "Reservations", "Marketing Automation"],
    metric: "3x",
    metricLabel: "Qualified leads generated",
    duration: "4 weeks",
    industry: "Group Fitness",
    overview:
      "Rumble Boxing is a premium group fitness brand with locations across the US. Their front desk team was overwhelmed with reservation calls, missed follow-ups, and manual lead qualification. Marketing was spending heavily on ad campaigns but conversion from lead to booked class was leaking at every stage — voicemails went unreturned, web leads sat in a spreadsheet, and no-shows were eating into class capacity.",
    challenge:
      "The team needed a system that could handle inbound reservation calls 24/7, follow up with web leads automatically, reduce no-shows through smart reminders, and qualify leads before they reached the sales team. All without feeling robotic or damaging the brand's premium, high-energy positioning.",
    approach: [
      {
        title: "Voice Agent Design",
        detail:
          "Built a custom AI voice agent trained on Rumble's brand voice, class structure, pricing, and FAQ corpus. The agent handles inbound calls — booking classes, answering questions, and routing complex queries to staff. Designed with natural conversational flow, not IVR-style menus.",
      },
      {
        title: "Outbound Lead Qualification",
        detail:
          "Deployed an agentic outbound system that calls web leads within 5 minutes of form submission. The agent qualifies interest, answers initial questions, and books trial classes — all before a human touches the lead. Unqualified leads are filtered out automatically.",
      },
      {
        title: "Smart Reservation Management",
        detail:
          "Integrated an automated reminder system with escalating touchpoints: confirmation call 24h before class, text reminder 2h before, and waitlist auto-fill when cancellations happen. Reduced no-show rates dramatically.",
      },
      {
        title: "Analytics Dashboard",
        detail:
          "Built a real-time dashboard showing call volume, booking conversion rates, lead quality scores, and agent performance metrics. The team can see exactly how the AI is performing and adjust scripts in real-time.",
      },
    ],
    results: [
      {
        stat: "3x",
        label: "Qualified leads per month",
        detail:
          "Outbound AI agents reached leads faster and more consistently than the manual process ever could.",
      },
      {
        stat: "50%",
        label: "Reduction in missed reservations",
        detail:
          "Smart reminders and auto-waitlist filling cut no-shows in half across all locations.",
      },
      {
        stat: "90%",
        label: "Calls handled without human",
        detail:
          "The voice agent resolves 9 out of 10 inbound calls autonomously, freeing staff for in-person experience.",
      },
    ],
    timeline: [
      {
        week: "Week 1",
        milestone: "Voice agent training and brand voice calibration",
      },
      {
        week: "Week 2",
        milestone: "Outbound lead qualification system deployment",
      },
      {
        week: "Week 3",
        milestone: "Reservation management and reminder automation",
      },
      { week: "Week 4", milestone: "Dashboard, testing, and full rollout" },
    ],
    testimonial: {
      quote:
        "Our front desk used to dread the phone ringing. Now the AI handles the routine calls and our team focuses on delivering an amazing in-studio experience.",
      name: "Regional Manager",
      role: "Rumble Boxing",
    },
    techStack: [
      "Vapi",
      "OpenAI API",
      "Twilio",
      "Node.js",
      "PostgreSQL",
      "Next.js",
    ],
  },
  "hair-and-co-bklyn": {
    slug: "hair-and-co-bklyn",
    client: "Hair and Co Bklyn",
    url: "hairandcobklyn.com",
    headline: "From Manual Bookings to 4x Online Reservations",
    heroImage:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=600&fit=crop",
    tags: ["Website Redesign", "Reservation Agents", "Custom CRM"],
    metric: "4x",
    metricLabel: "Online bookings increase",
    duration: "5 weeks",
    industry: "Beauty & Salon",
    overview:
      "Hair and Co Bklyn is a premium salon in Brooklyn known for precision cuts and a loyal clientele. Despite a strong local reputation, their digital presence was nearly non-existent — an outdated single-page site, no online booking, and client management done through a mix of Instagram DMs, phone calls, and a paper appointment book. Walk-ins and no-shows were unpredictable, and the owner was spending hours each week on scheduling alone.",
    challenge:
      "The salon needed a complete digital transformation: a modern website that reflected their premium positioning, an online booking system that clients would actually use, a way to reduce no-shows without being annoying, and a client management system that could track preferences, visit history, and automate follow-ups — all without adding complexity to the stylist's daily workflow.",
    approach: [
      {
        title: "Website Redesign",
        detail:
          "Built a sleek, editorial-style website showcasing their portfolio, stylist profiles, and services. Integrated online booking directly into the site with real-time availability pulled from the new CRM. Designed mobile-first — 85% of their traffic comes from phones.",
      },
      {
        title: "AI Reservation Agent",
        detail:
          "Deployed an AI-powered booking agent that handles DM inquiries and website chat. The agent checks availability, suggests times, books appointments, and sends confirmations — all in the client's preferred communication channel (Instagram, SMS, or web chat).",
      },
      {
        title: "Custom CRM Build",
        detail:
          "Built a lightweight CRM tailored for salon operations: client profiles with hair type, colour history, preferred stylist, and visit frequency. Automated reminders at 24h and 2h before appointments. Re-engagement messages for clients who haven't visited in 6+ weeks.",
      },
      {
        title: "No-Show Prevention System",
        detail:
          "Implemented a deposit-based booking system for first-time clients and a smart reminder sequence for returning clients. The CRM flags chronic no-shows and requires prepayment. Combined with AI reminders, this reduced no-shows by 60%.",
      },
    ],
    results: [
      {
        stat: "4x",
        label: "Online bookings",
        detail:
          "Went from ~20 online bookings/month to 80+ within 6 weeks of launch, with phone bookings dropping proportionally.",
      },
      {
        stat: "60%",
        label: "Reduction in no-shows",
        detail:
          "Combination of deposits, smart reminders, and re-confirmation calls cut no-shows from ~18% to under 7%.",
      },
      {
        stat: "2x",
        label: "Foot traffic increase",
        detail:
          "Modern web presence and local SEO optimisation drove significantly more discovery from new clients in the area.",
      },
    ],
    timeline: [
      {
        week: "Week 1",
        milestone: "Discovery, branding, and website design",
      },
      {
        week: "Week 2-3",
        milestone: "CRM development and booking system integration",
      },
      {
        week: "Week 4",
        milestone: "AI reservation agent and multi-channel setup",
      },
      {
        week: "Week 5",
        milestone: "Testing, staff training, and go-live",
      },
    ],
    testimonial: {
      quote:
        "I used to spend my Sundays doing scheduling. Now clients book themselves, get reminders, and I just show up and do hair. It's completely changed how I run the business.",
      name: "Owner & Lead Stylist",
      role: "Hair and Co Bklyn",
    },
    techStack: [
      "Next.js",
      "OpenAI API",
      "Twilio",
      "Instagram API",
      "PostgreSQL",
      "Stripe",
    ],
  },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.4em] text-cyan-400/50 uppercase mb-5">
      {children}
    </p>
  );
}

/** Animated approach step with anime.js number reveal */
function ApproachStep({ step, index }: { step: { title: string; detail: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { ref: numRef, display: numDisplay } = useAnimeTextScramble(
    String(index + 1).padStart(2, "0"),
    { delay: index * 100 }
  );

  // Line drawing animation
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const line = ref.current?.querySelector(".anime-step-line");
          if (line) {
            animate(line, {
              scaleX: [0, 1],
              opacity: [0, 0.1],
              duration: 800,
              delay: 300 + index * 100,
              ease: "outExpo",
            });
          }
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: EASE_CINEMATIC,
      }}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 group relative"
    >
      <div className="md:col-span-1">
        <span
          ref={numRef as React.RefObject<HTMLSpanElement>}
          className="font-mono text-[11px] text-cyan-400/40 tracking-wider"
        >
          {numDisplay || String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="md:col-span-3">
        <h3 className="font-display font-semibold text-lg text-white/80">
          {step.title}
        </h3>
      </div>
      <div className="md:col-span-8">
        <p className="font-display text-base text-white/45 leading-[1.8]">
          {step.detail}
        </p>
      </div>
      {/* Subtle bottom line */}
      <div
        className="anime-step-line absolute bottom-0 left-0 right-0 h-px bg-white"
        style={{ transformOrigin: "left", opacity: 0 }}
      />
    </motion.div>
  );
}

/** Animated result card with stat pop-in */
function ResultCard({ result, index }: { result: { stat: string; label: string; detail: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stat pop-in
          const stat = ref.current?.querySelector(".anime-result-stat");
          if (stat) {
            animate(stat, {
              scale: [0.3, 1.1, 1],
              opacity: [0, 1],
              duration: 800,
              delay: 200 + index * 150,
              ease: "out(3)",
            });
          }
          // Card border glow
          if (ref.current) {
            animate(ref.current, {
              borderColor: [
                "rgba(255,255,255,0.08)",
                "rgba(129,140,248,0.2)",
                "rgba(255,255,255,0.08)",
              ],
              duration: 2000,
              delay: 400 + index * 150,
              ease: "inOutSine",
          });
          }
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: EASE_CINEMATIC,
      }}
      className="glass-card rounded-2xl p-8"
    >
      <p className="anime-result-stat font-display font-bold text-4xl md:text-5xl text-gradient-cyan tracking-[-0.03em] mb-2" style={{ opacity: 0 }}>
        {result.stat}
      </p>
      <p className="font-mono text-[10px] text-cyan-400/50 tracking-wider uppercase mb-4">
        {result.label}
      </p>
      <p className="font-display text-sm text-white/40 leading-[1.7]">
        {result.detail}
      </p>
    </motion.div>
  );
}

/** Animated timeline with sequential dot pulses */
function TimelineItem({ item, index }: { item: { week: string; milestone: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const dot = ref.current?.querySelector(".anime-timeline-dot");
          if (dot) {
            animate(dot, {
              scale: [0, 1.5, 1],
              opacity: [0, 1],
              backgroundColor: ["rgba(129,140,248,0)", "rgba(129,140,248,0.6)", "rgba(129,140,248,0.4)"],
              duration: 600,
              delay: index * 120,
              ease: "out(3)",
            });
          }
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: EASE_CINEMATIC,
      }}
      className="flex items-start gap-6 py-5 border-b border-white/5 last:border-0"
    >
      <div className="flex items-center gap-3 min-w-[120px]">
        <div className="anime-timeline-dot w-2 h-2 rounded-full bg-cyan-400/40" style={{ opacity: 0 }} />
        <span className="font-mono text-[11px] text-cyan-400/50 tracking-wider">
          {item.week}
        </span>
      </div>
      <p className="font-display text-base text-white/60">
        {item.milestone}
      </p>
    </motion.div>
  );
}

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const study = caseStudies[slug];
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const techRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLElement>(null);

  // Hero entrance timeline
  useEffect(() => {
    if (!heroInView || !heroRef.current) return;

    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(heroRef.current.querySelectorAll(".anime-hero-item"), {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      delay: stagger(100),
    });

    // Quick stats pop
    tl.add(heroRef.current.querySelectorAll(".anime-quick-stat"), {
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 600,
      delay: stagger(80),
      ease: "out(3)",
    }, "-=400");

    // Stats border
    const statsLine = heroRef.current.querySelector(".anime-stats-line");
    if (statsLine) {
      tl.add(statsLine, {
        scaleX: [0, 1],
        opacity: [0, 1],
        duration: 800,
      }, "-=800");
    }
  }, [heroInView]);

  // Tech stack cascade
  useEffect(() => {
    if (!techRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const techTags = techRef.current?.querySelectorAll(".anime-tech-tag");
          if (techTags) {
          animate(techTags, {
            opacity: [0, 1],
            translateY: [15, 0],
            scale: [0.85, 1],
            duration: 500,
            delay: stagger(60),
            ease: "out(3)",
          });
          }
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(techRef.current);
    return () => observer.disconnect();
  }, []);

  // Testimonial quote animation
  useEffect(() => {
    if (!quoteRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const quoteItems = quoteRef.current?.querySelectorAll(".anime-quote-item");
          if (quoteItems) {
          animate(quoteItems, {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            delay: stagger(150),
            ease: "outExpo",
          });
          }
          // Quote marks animation
          const quoteMark = quoteRef.current?.querySelector(".anime-quote-mark");
          if (quoteMark) {
            animate(quoteMark, {
              opacity: [0, 0.1],
              scale: [0.5, 1],
              duration: 1000,
              ease: "outExpo",
            });
          }
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(quoteRef.current);
    return () => observer.disconnect();
  }, []);

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display font-bold text-4xl text-white mb-4">
            Case study not found
          </h1>
          <Link
            href="/#work"
            className="font-mono text-sm text-cyan-400/70 hover:text-cyan-400 transition-colors"
          >
            Back to work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={study.heroImage}
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/60 via-[#0B0F19]/90 to-[#0B0F19]" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div>
            <Link
              href="/#work"
              className="anime-hero-item inline-flex items-center gap-2 font-mono text-[11px] text-white/40 tracking-wider hover:text-cyan-400 transition-colors mb-10 group"
              style={{ opacity: 0 }}
            >
              <svg
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              BACK TO WORK
            </Link>

            <div className="anime-hero-item flex flex-wrap items-center gap-3 mb-6" style={{ opacity: 0 }}>
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-cyan-400/70 tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="anime-hero-item font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.05] text-white mb-4" style={{ opacity: 0 }}>
              {study.client}
            </h1>
            <p className="anime-hero-item font-display text-lg md:text-xl text-white/50 max-w-2xl leading-[1.7] mb-10" style={{ opacity: 0 }}>
              {study.headline}
            </p>

            {/* Quick stats */}
            <div className="relative pt-8">
              <div className="anime-stats-line absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/10 via-cyan-400/20 to-white/10" style={{ transformOrigin: "left", opacity: 0 }} />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="anime-quick-stat" style={{ opacity: 0 }}>
                  <p className="font-display font-bold text-2xl md:text-3xl text-gradient-cyan tracking-[-0.02em]">
                    {study.metric}
                  </p>
                  <p className="font-mono text-[10px] text-white/30 mt-1 tracking-wider uppercase">
                    {study.metricLabel}
                  </p>
                </div>
                <div className="anime-quick-stat" style={{ opacity: 0 }}>
                  <p className="font-display font-bold text-2xl md:text-3xl text-gradient-cyan tracking-[-0.02em]">
                    {study.duration}
                  </p>
                  <p className="font-mono text-[10px] text-white/30 mt-1 tracking-wider uppercase">
                    Delivery Time
                  </p>
                </div>
                <div className="anime-quick-stat" style={{ opacity: 0 }}>
                  <p className="font-display text-sm text-white/60">{study.industry}</p>
                  <p className="font-mono text-[10px] text-white/30 mt-1 tracking-wider uppercase">
                    Industry
                  </p>
                </div>
                <div className="anime-quick-stat" style={{ opacity: 0 }}>
                  <p className="font-display text-sm text-white/60">{study.url}</p>
                  <p className="font-mono text-[10px] text-white/30 mt-1 tracking-wider uppercase">
                    Client
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <SectionLabel>Overview</SectionLabel>
              <p className="font-display text-base text-white/50 leading-[1.9]">
                {study.overview}
              </p>
            </div>
            <div className="lg:col-span-2">
              <SectionLabel>The Challenge</SectionLabel>
              <p className="font-display text-base text-white/40 leading-[1.9]">
                {study.challenge}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>

      {/* Our Approach */}
      <section className="px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>How We Built It</SectionLabel>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl tracking-[-0.03em] text-white mb-12">
            Our Approach
          </h2>

          <div className="space-y-8">
            {study.approach.map((step, i) => (
              <ApproachStep key={step.title} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>

      {/* Results */}
      <section className="px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>The Results</SectionLabel>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl tracking-[-0.03em] text-white mb-12">
            What We Delivered
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {study.results.map((result, i) => (
              <ResultCard key={result.label} result={result} index={i} />
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>

      {/* Timeline */}
      <section className="px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Delivery Timeline</SectionLabel>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl tracking-[-0.03em] text-white mb-12">
            Shipped in {study.duration}
          </h2>

          <div className="space-y-0">
            {study.timeline.map((item, i) => (
              <TimelineItem key={item.week} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {study.testimonial && (
        <>
          <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          </div>
          <section ref={quoteRef} className="px-6 md:px-12 lg:px-24 py-20">
            <div className="max-w-5xl mx-auto relative">
              {/* Large decorative quote mark */}
              <div className="anime-quote-mark absolute -top-4 -left-4 font-display text-[120px] leading-none text-cyan-400 pointer-events-none select-none" style={{ opacity: 0 }}>
                &ldquo;
              </div>
              <SectionLabel>Client Feedback</SectionLabel>
              <blockquote className="anime-quote-item font-display text-xl md:text-2xl lg:text-3xl text-white/70 leading-[1.5] tracking-[-0.01em] mb-8 max-w-3xl" style={{ opacity: 0 }}>
                &ldquo;{study.testimonial.quote}&rdquo;
              </blockquote>
              <div className="anime-quote-item" style={{ opacity: 0 }}>
                <p className="font-display text-sm text-white/60 font-medium">
                  {study.testimonial.name}
                </p>
                <p className="font-mono text-[10px] text-white/30 tracking-wider mt-1">
                  {study.testimonial.role}
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>

      {/* Tech Stack */}
      <section className="px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Tech Stack</SectionLabel>
          <div ref={techRef} className="flex flex-wrap gap-3">
            {study.techStack.map((tech) => (
              <span
                key={tech}
                className="anime-tech-tag font-mono text-[11px] px-4 py-2 rounded-lg bg-white/5 border border-white/8 text-white/50 tracking-wider"
                style={{ opacity: 0 }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 lg:px-24 py-20 pb-32">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl tracking-[-0.02em] text-white mb-4">
            Want similar results?
          </h2>
          <p className="font-display text-base text-white/40 mb-8 max-w-md mx-auto">
            Let&apos;s talk about what AI can do for your business.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 font-display text-sm font-medium px-8 py-3.5 rounded-xl
                bg-gradient-to-r from-indigo-500 to-purple-500 text-white
                hover:from-indigo-400 hover:to-purple-400 transition-colors duration-300
                shadow-lg shadow-indigo-500/20"
            >
              Get in Touch
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/#work"
              className="font-display text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              View More Work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
