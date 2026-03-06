export const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE_CINEMATIC,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: EASE_CINEMATIC,
    },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const letterReveal = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: "0%",
    transition: {
      duration: 0.6,
      ease: EASE_CINEMATIC,
      delay: i * 0.03,
    },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: EASE_CINEMATIC,
    },
  },
};
