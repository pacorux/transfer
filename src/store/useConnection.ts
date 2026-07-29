import { create } from "zustand";

interface ConnectionState {
  mode: "send" | "receive";
  peerId: string | null;
  generatePeerId: () => void;
  remotePeerId: string | null;
  setRemotePeerId: (id: string) => void;
  isConnected: boolean;
}

export const useConnection = create<ConnectionState>((set) => ({
  mode: "send",
  peerId: null,
  generatePeerId: () => {
    set({ peerId: Math.floor(10000 + Math.random() * 90000).toString() });
  },
  remotePeerId: null,
  setRemotePeerId: (id) => {
    set({ remotePeerId: id });
  },
  isConnected: false,
}));
