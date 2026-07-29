import {
  type ComponentType,
  type ReactNode,
  useState,
  type MouseEvent,
} from "react";
import { motion } from "motion/react";
import { fadeInScaleUp } from "../../animations/variants";
import { ChevronDown } from "lucide-react";
import { faqs } from "../../config/faqs";

function Collapsible({
  icon: Icon,
  title,
  children,
  isOpen,
  onToggle,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onToggle: (e: MouseEvent) => void;
}) {
  return (
    <div className="border border-foreground/10 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="flex items-center gap-3 w-full p-4 text-left hover:bg-foreground/5 transition-colors duration-200"
      >
        <Icon className="w-5 h-5 text-accent shrink-0" />
        <span className="font-medium flex-1">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-foreground/50 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="p-4 pt-0 text-sm text-foreground/80 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.div
      variants={fadeInScaleUp}
      className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 pb-8"
    >
      <h2 className="text-2xl font-semibold tracking-tight mb-14 mt-6">
        Sobre Transfer
      </h2>

      <div className="w-full space-y-3">
        {faqs.map((faq, i) => (
          <Collapsible
            key={i}
            icon={faq.icon}
            title={faq.title}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          >
            {faq.content}
          </Collapsible>
        ))}
      </div>
    </motion.div>
  );
}
