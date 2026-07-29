import { useState, useRef } from "react";
import { Button, Card } from "@heroui/react";
import { FileIcon, SendIcon, XIcon } from "lucide-react";
import { formatFileSize } from "../../../utils/format";

interface FilePickerProps {
  onSendFile: (file: File) => void;
  disabled: boolean;
}

export function FilePicker({ onSendFile, disabled }: FilePickerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] ?? null);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSend = () => {
    if (selectedFile) {
      onSendFile(selectedFile);
      clearSelection();
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <Card.Header>
        <h3 className="text-lg font-semibold">Seleccionar archivo</h3>
      </Card.Header>
      <Card.Content className="flex flex-col gap-4">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />

        <Button
          variant="outline"
          onPress={() => fileInputRef.current?.click()}
          className="w-full"
        >
          <FileIcon />
          Elegir archivo
        </Button>

        {selectedFile && (
          <div className="flex items-center justify-between w-full py-2 px-3 bg-foreground/5 rounded-lg">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm font-medium truncate">
                {selectedFile.name}
              </span>
              <span className="text-xs text-foreground/60 shrink-0">
                {formatFileSize(selectedFile.size)}
              </span>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            className="flex-1"
            isDisabled={disabled || !selectedFile}
            onPress={handleSend}
          >
            <SendIcon />
            Enviar
          </Button>

          {selectedFile && (
            <Button variant="outline" isIconOnly onPress={clearSelection}>
              <XIcon />
            </Button>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}
