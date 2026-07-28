import { stagger } from "motion";

export const parentContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delayChildren: stagger(0.2), ease: "easeInOut" as const },
  },
};

export const fadeInScaleUp = {
  hidden: { opacity: 0, scale: 0.8, y: -20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};
