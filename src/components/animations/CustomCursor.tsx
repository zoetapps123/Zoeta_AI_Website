"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 };
  const outerX = useSpring(cursorX, springConfig);
  const outerY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);

    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [data-cursor-hover], input, textarea, select")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [data-cursor-hover], input, textarea, select")
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-cyan"
          animate={{
            width: isHovering ? 12 : 6,
            height: isHovering ? 12 : 6,
            opacity: isHovering ? 0.8 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border border-cyan/50"
          animate={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            borderColor: isHovering
              ? "rgba(0, 240, 255, 0.8)"
              : "rgba(0, 240, 255, 0.3)",
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}
