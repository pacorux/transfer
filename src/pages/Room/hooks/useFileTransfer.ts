import { useState, useCallback, useRef } from "react";
import { toast } from "@heroui/react";

const CHUNK_SIZE = 64 * 1024;

export interface FileTransfer {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: "pending" | "transferring" | "completed" | "error";
  direction: "incoming" | "outgoing";
}

interface IncomingFileState {
  chunks: ArrayBuffer[];
  totalChunks: number;
}

export function useFileTransfer() {
  const [transfers, setTransfers] = useState<FileTransfer[]>([]);
  const incomingFilesRef = useRef<Map<string, IncomingFileState>>(new Map());

  const addTransfer = useCallback((transfer: FileTransfer) => {
    setTransfers((prev) => [...prev, transfer]);
  }, []);

  const updateTransfer = useCallback(
    (
      name: string,
      direction: FileTransfer["direction"],
      updates: Partial<FileTransfer>,
    ) => {
      setTransfers((prev) =>
        prev.map((t) =>
          t.name === name && t.direction === direction
            ? { ...t, ...updates }
            : t,
        ),
      );
    },
    [],
  );

  const sendFile = useCallback(
    async (file: File, connection: any) => {
      if (!connection) return;

      const id = `outgoing-${Date.now()}`;

      addTransfer({
        id,
        name: file.name,
        size: file.size,
        progress: 0,
        status: "pending",
        direction: "outgoing",
      });

      try {
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

        connection.send({
          type: "file-header",
          fileName: file.name,
          fileSize: file.size,
          totalChunks,
        });

        updateTransfer(file.name, "outgoing", { status: "transferring" });

        let offset = 0;
        let chunkIndex = 0;

        while (offset < file.size) {
          const end = Math.min(offset + CHUNK_SIZE, file.size);
          const chunk = file.slice(offset, end);
          const arrayBuffer = await chunk.arrayBuffer();

          connection.send({
            type: "file-chunk",
            fileName: file.name,
            chunkIndex,
            data: arrayBuffer,
          });

          offset = end;
          chunkIndex++;
          const progress = Math.round((offset / file.size) * 100);

          updateTransfer(file.name, "outgoing", { progress });
        }

        updateTransfer(file.name, "outgoing", {
          progress: 100,
          status: "completed",
        });

        toast(`"${file.name}" enviado correctamente`, {
          variant: "success",
        });
      } catch (error: any) {
        updateTransfer(file.name, "outgoing", { status: "error" });
        console.error("Error al enviar archivo:", error);
        toast("Error al enviar el archivo", { variant: "danger" });
      }
    },
    [addTransfer, updateTransfer],
  );

  const handleIncomingData = useCallback(
    (data: any) => {
      if (data.type === "file-header") {
        const id = `incoming-${Date.now()}`;

        addTransfer({
          id,
          name: data.fileName,
          size: data.fileSize,
          progress: 0,
          status: "pending",
          direction: "incoming",
        });

        incomingFilesRef.current.set(data.fileName, {
          chunks: [],
          totalChunks: data.totalChunks,
        });
      } else if (data.type === "file-chunk") {
        const fileState = incomingFilesRef.current.get(data.fileName);
        if (!fileState) return;

        fileState.chunks.push(data.data);
        const progress = Math.round(
          (fileState.chunks.length / fileState.totalChunks) * 100,
        );
        const done = progress >= 100;

        updateTransfer(data.fileName, "incoming", {
          progress,
          status: done ? "completed" : "transferring",
        });

        if (done) {
          const blob = new Blob(fileState.chunks);
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = data.fileName;
          a.click();
          URL.revokeObjectURL(url);
          incomingFilesRef.current.delete(data.fileName);

          toast(`"${data.fileName}" recibido`, { variant: "success" });
        }
      }
    },
    [addTransfer, updateTransfer],
  );

  return {
    transfers,
    sendFile,
    handleIncomingData,
  };
}
