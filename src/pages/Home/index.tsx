import { motion } from "motion/react";
import { Button } from "@heroui/react";
import { useLocation } from "wouter";
import { fadeInScaleUp } from "../../animations/variants";
import { useConnection } from "../../store/useConnection";
import { DownloadIcon, SendIcon } from "lucide-react";

export function HomePage() {
  const [_, setLocation] = useLocation();

  const { setMode } = useConnection();

  return (
    <div className="flex flex-col items-center justify-center h-full pb-8">
      <div className="text-center mb-14">
        <motion.h2
          variants={fadeInScaleUp}
          className="text-2xl font-semibold tracking-tight leading-10"
        >
          Transfiere archivos entre tus dispositivos
        </motion.h2>
        <motion.p
          variants={fadeInScaleUp}
          className="text-sm text-foreground/80"
        >
          Nada sale de tu red local. Privado, seguro, rápido y sin límites
        </motion.p>
      </div>

      <motion.div variants={fadeInScaleUp} className="space-x-4">
        <Button
          className="hover:scale-105 hover:shadow-[0_0_20px_var(--accent)] active:scale-95 transition-all"
          size="lg"
          onPress={() => {
            setMode("send");
            setLocation("/room");
          }}
        >
          <SendIcon />
          Enviar
        </Button>

        <Button
          className="hover:scale-105 active:scale-95 transition-all"
          variant="outline"
          size="lg"
          onPress={() => {
            setMode("receive");
            setLocation("/room");
          }}
        >
          <DownloadIcon />
          Recibir
        </Button>
      </motion.div>
    </div>
  );
}
