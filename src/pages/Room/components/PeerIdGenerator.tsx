import { Button, Card, toast, Tooltip } from "@heroui/react";
import { useConnection } from "../../../store/useConnection";
import { CopyIcon, RepeatIcon } from "lucide-react";

export function PeerIdGenerator() {
  const { peerId, generatePeerId } = useConnection();

  return (
    <Card className="flex items-center w-full max-w-lg text-center">
      <Card.Header className="mb-4">
        <Card.Title className="text-lg font-semibold">
          Código de vinculación
        </Card.Title>
        <Card.Description>
          Usa este código en tu segundo dispositivo
        </Card.Description>
      </Card.Header>
      <Card.Content className="flex flex-row items-center justify-start">
        <p className="text-2xl font-bold tracking-wide select-all cursor-pointer mr-2">
          {peerId}
        </p>

        <Tooltip delay={200} closeDelay={200}>
          <Button
            size="sm"
            variant="outline"
            isIconOnly
            className="text-foreground/80 hover:text-accent hover:scale-105 active:scale-90 transition-transform"
            onPress={() => {
              if (!peerId) return;
              navigator.clipboard.writeText(peerId);
              toast(`¡Código ${peerId} copiado!`, { variant: "success" });
            }}
          >
            <CopyIcon />
          </Button>
          <Tooltip.Content showArrow placement="bottom">
            Copiar
          </Tooltip.Content>
        </Tooltip>

        <Tooltip delay={200} closeDelay={200}>
          <Button
            size="sm"
            variant="outline"
            isIconOnly
            className="text-foreground/80 hover:text-accent hover:scale-105 active:scale-90 transition-transform"
            onPress={() => generatePeerId()}
          >
            <RepeatIcon />
          </Button>
          <Tooltip.Content showArrow placement="bottom">
            Regenerar
          </Tooltip.Content>
        </Tooltip>
      </Card.Content>
    </Card>
  );
}
