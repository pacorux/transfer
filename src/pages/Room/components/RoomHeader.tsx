import { motion } from "motion/react";
import { Button } from "@heroui/react";
import { fadeInScaleUp } from "../../../animations/variants";
import { useConnection } from "../../../store/useConnection";
import { DownloadIcon, SendIcon } from "lucide-react";

export function RoomHeader() {
  const { mode, setMode } = useConnection();

  return (
    <motion.header variants={fadeInScaleUp} className="flex gap-2">
      <Button
        variant={mode === "send" ? "tertiary" : "ghost"}
        onPress={() => setMode("send")}
      >
        <SendIcon />
        Enviar
      </Button>
      <Button
        variant={mode === "receive" ? "tertiary" : "ghost"}
        onPress={() => setMode("receive")}
      >
        <DownloadIcon />
        Recibir
      </Button>
    </motion.header>
  );
}
