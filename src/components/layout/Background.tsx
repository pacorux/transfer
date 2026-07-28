import { motion } from "motion/react";

export function Background() {
  return (
    <div className="absolute top-0 left-0 h-dvh w-dvw -z-10 overflow-hidden pointer-events-none">
      {/* Layer 1 - Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-background-secondary to-background" />

      {/* Layer 2 - Dot Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--background-tertiary)_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Layer 3 - Lights (Purple, Blue, and Red) */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 aspect-square bg-purple-600/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, 120, -60, 0],
          y: [0, 80, 140, 0],
          scale: [1, 1.25, 0.9, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/3 bg-blue-600/10 w-md aspect-square rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, -100, 70, 0],
          y: [0, -120, -60, 0],
          scale: [1, 0.85, 1.3, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-32 left-1/2 bg-cyan-500/10 w-md aspect-square rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, 90, -90, 0],
          y: [0, -70, 50, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -top-32 -right-32 bg-red-500/10 w-md aspect-square rounded-full blur-3xl pointer-events-none"
        animate={{
          x: [0, 30, -90, 0],
          y: [0, 70, 50, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
