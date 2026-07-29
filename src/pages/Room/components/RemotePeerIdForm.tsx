import { Button, Card, InputOTP, REGEXP_ONLY_DIGITS } from "@heroui/react";
import { useConnection } from "../../../store/useConnection";

interface RemotePeerIdFormProps {
  onConnect: () => void;
  onDisconnect: () => void;
}

export function RemotePeerIdForm({
  onConnect,
  onDisconnect,
}: RemotePeerIdFormProps) {
  const { remotePeerId, setRemotePeerId, isConnected, connectionStatus } =
    useConnection();

  return (
    <Card className="flex items-center w-full max-w-lg text-center">
      <Card.Header className="mb-4">
        <Card.Title className="text-lg font-semibold">
          Establecer conexión
        </Card.Title>
        <Card.Description>Introduce el código de vinculación</Card.Description>
      </Card.Header>

      <Card.Content className="flex items-center justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onConnect();
          }}
        >
          <InputOTP
            id="remoteId"
            variant="secondary"
            className="mb-4"
            maxLength={5}
            pattern={REGEXP_ONLY_DIGITS}
            value={remotePeerId}
            onChange={setRemotePeerId}
            autoFocus
          >
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
              <InputOTP.Slot index={3} />
              <InputOTP.Slot index={4} />
            </InputOTP.Group>
          </InputOTP>

          {!isConnected ? (
            <Button isDisabled={remotePeerId.length != 5} onPress={onConnect}>
              {connectionStatus === "connecting" ? "Conectadno..." : "Conectar"}
            </Button>
          ) : (
            <Button onPress={onDisconnect}>Desconectar</Button>
          )}
        </form>
      </Card.Content>
    </Card>
  );
}
