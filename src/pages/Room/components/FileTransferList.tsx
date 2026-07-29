import type { FileTransfer } from "../hooks/useFileTransfer";
import { Card, ProgressBar } from "@heroui/react";
import { formatFileSize } from "../../../utils/format";
import {
  CheckIcon,
  ClockIcon,
  AlertCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react";

interface FileTransferListProps {
  transfers: FileTransfer[];
}

const statusIcons: Record<FileTransfer["status"], React.ReactNode> = {
  pending: <ClockIcon className="w-4 h-4 text-foreground/50" />,
  transferring: undefined,
  completed: <CheckIcon className="w-4 h-4 text-success" />,
  error: <AlertCircleIcon className="w-4 h-4 text-danger" />,
};

const statusLabels: Record<FileTransfer["status"], string> = {
  pending: "Pendiente",
  transferring: "Transfiriendo...",
  completed: "Completado",
  error: "Error",
};

export function FileTransferList({ transfers }: FileTransferListProps) {
  if (transfers.length === 0) {
    return (
      <p className="text-sm text-foreground/50 text-center py-8">
        Ninguna transferencia aún
      </p>
    );
  }

  return (
    <div className="w-full max-w-lg space-y-2">
      <h3 className="text-lg font-semibold">Transferencias</h3>

      {transfers.map((t) => (
        <Card key={t.id} className="w-full">
          <Card.Content className="flex flex-col gap-2 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                {t.direction === "outgoing" ? (
                  <ArrowUpIcon className="w-4 h-4 shrink-0 text-foreground/60" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4 shrink-0 text-foreground/60" />
                )}
                <span className="text-sm font-medium truncate">{t.name}</span>
                <span className="text-xs text-foreground/50 shrink-0">
                  {formatFileSize(t.size)}
                </span>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {statusIcons[t.status]}
                <span className="text-xs text-foreground/60">
                  {statusLabels[t.status]}
                </span>
              </div>
            </div>

            <ProgressBar
              value={t.progress}
              size="sm"
              color={t.status === "error" ? "danger" : "accent"}
            />

            <span className="text-xs text-foreground/50 text-right">
              {t.progress}%
            </span>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}
