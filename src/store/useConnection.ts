import { create } from "zustand";

interface ConnectionState {
  mode: "send" | "receive";
  setMode: (mode: "send" | "receive") => void;
  peerId: string | null;
  generatePeerId: () => void;
  remotePeerId: string;
  setRemotePeerId: (id: string) => void;
  isConnected: boolean;
  setIsConnected: (isConnected: boolean) => void;
  connectionStatus: "disconnected" | "connecting" | "connected";
  setConnectionStatus: (
    connectionStatus: "disconnected" | "connecting" | "connected",
  ) => void;
}

export const useConnection = create<ConnectionState>((set) => ({
  mode: "send",
  setMode: (mode) => {
    set({ mode });
  },
  peerId: null,
  generatePeerId: () => {
    set({ peerId: Math.floor(10000 + Math.random() * 90000).toString() });
  },
  remotePeerId: "",
  setRemotePeerId: (id) => {
    set({ remotePeerId: id });
  },
  isConnected: false,
  setIsConnected: (isConnected) => set({ isConnected }),
  connectionStatus: "disconnected",
  setConnectionStatus: (connectionStatus) => set({ connectionStatus }),
}));
