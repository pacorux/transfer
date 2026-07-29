import { Chip } from "@heroui/react";
import { useConnection } from "../../../store/useConnection";

const statusConfig: Record<
  string,
  { label: string; color: "default" | "success" | "warning" | "danger" }
> = {
  disconnected: { label: "Desconectado", color: "default" },
  connecting: { label: "Conectando...", color: "warning" },
  connected: { label: "Conectado", color: "success" },
};

export function ConnectionStatus() {
  const { connectionStatus } = useConnection();

  const { label, color } =
    statusConfig[connectionStatus] ?? statusConfig.disconnected;

  return (
    <Chip variant="soft" color={color} size="sm" className="select-none">
      {label}
    </Chip>
  );
}
