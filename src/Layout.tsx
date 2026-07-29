import { motion } from "motion/react";
import { parentContainer } from "./animations/variants";
import { Navbar } from "./components/layout/Navbar";
import { Background } from "./components/layout/Background";
import { Toast } from "@heroui/react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <motion.div
      className="flex flex-col items-start justify-start h-dvh overflow-auto"
      variants={parentContainer}
      initial="hidden"
      animate="show"
    >
      <Toast.Provider placement="top" />

      <Navbar />

      <main className="flex-1 w-full md:p-4 md:pt-0">
        <div className="h-full w-full max-w-6xl mx-auto p-4 bg-background/80 md:rounded-(--radius) shadow">
          {children}
        </div>
      </main>

      <Background />
    </motion.div>
  );
}
