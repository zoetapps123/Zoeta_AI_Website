"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { animate, createTimeline, stagger, set, random } from "animejs";

// Re-export for convenience in components
export { animate, createTimeline, stagger, set, random };

/**
 * Scramble/decode text effect — text appears to "decode" from random chars.
 */
export function useAnimeTextScramble(text: string, options?: { delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  const hasPlayed = useRef(false);
  const [display, setDisplay] = useState("");
  const scrambleChars = "!@#$%^&*()_+{}|:<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true;
          const obj = { progress: 0 };
          animate(obj, {
            progress: 1,
            duration: 1200,
            delay: options?.delay ?? 0,
            ease: "inOutQuad",
            onUpdate: () => {
              const revealed = Math.floor(obj.progress * text.length);
              let result = "";
              for (let i = 0; i < text.length; i++) {
                if (i < revealed) {
                  result += text[i];
                } else if (text[i] === " ") {
                  result += " ";
                } else {
                  result += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                }
              }
              setDisplay(result);
            },
            onComplete: () => setDisplay(text),
          });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, scrambleChars, options?.delay]);

  return { ref, display };
}

/**
 * Morphing background blob animation.
 */
export function useAnimeMorphBlob() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const anim = animate(el, {
      borderRadius: [
        { to: "60% 40% 30% 70% / 60% 30% 70% 40%" },
        { to: "40% 60% 60% 40% / 50% 60% 40% 50%" },
        { to: "30% 70% 70% 30% / 30% 30% 70% 70%" },
      ],
      scale: [
        { to: 1.05 },
        { to: 0.95 },
        { to: 1 },
      ],
      duration: 8000,
      ease: "inOutSine",
      loop: true,
      alternate: true,
    });

    return () => { anim.pause(); };
  }, []);

  return ref;
}

/**
 * Ripple effect on click.
 */
export function useAnimeRipple() {
  const ref = useRef<HTMLElement>(null);

  const trigger = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(129, 140, 248, 0.3);
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
      pointer-events: none;
      z-index: 10;
    `;

    el.style.position = "relative";
    el.style.overflow = "hidden";
    el.appendChild(ripple);

    animate(ripple, {
      scale: [0, 2.5],
      opacity: [1, 0],
      duration: 600,
      ease: "outExpo",
      onComplete: () => ripple.remove(),
    });
  }, []);

  return { ref, trigger };
}
