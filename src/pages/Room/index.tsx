import { useEffect } from "react";
import { motion } from "motion/react";
import { useConnection } from "../../store/useConnection";
import { fadeInScaleUp } from "../../animations/variants";
import { PeerIdGenerator } from "./components/PeerIdGenerator";
import { RemotePeerIdForm } from "./components/RemotePeerIdForm";
import { FilePicker } from "./components/FilePicker";
import { FileTransferList } from "./components/FileTransferList";
import { ConnectionStatus } from "./components/ConnectionStatus";
import { useConnectionManager } from "./hooks/useConnectionManager";
import { useFileTransfer } from "./hooks/useFileTransfer";
import { RoomHeader } from "./components/RoomHeader";

export function RoomPage() {
  const { mode, isConnected, generatePeerId } = useConnection();

  const { transfers, sendFile, handleIncomingData } = useFileTransfer();
  const { connectionRef, connectToPeer, disconnect } = useConnectionManager({
    onData: handleIncomingData,
  });

  useEffect(() => {
    generatePeerId();
  }, []);

  const sendSelectedFile = (file: File) => {
    sendFile(file, connectionRef.current);
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <RoomHeader />

      <motion.div
        variants={fadeInScaleUp}
        className="flex flex-col items-center w-full gap-6 py-4"
      >
        {mode === "send" && (
          <>
            <PeerIdGenerator />
            <ConnectionStatus />

            {isConnected && (
              <>
                <FilePicker
                  onSendFile={sendSelectedFile}
                  disabled={!isConnected}
                />
                <FileTransferList transfers={transfers} />
              </>
            )}
          </>
        )}

        {mode === "receive" && (
          <>
            <RemotePeerIdForm
              onConnect={connectToPeer}
              onDisconnect={disconnect}
            />
            <ConnectionStatus />

            {isConnected && <FileTransferList transfers={transfers} />}
          </>
        )}
      </motion.div>
    </div>
  );
}
