import Peer from "peerjs";
import { useEffect, useRef, useCallback } from "react";
import { toast } from "@heroui/react";
import { useConnection } from "../../../store/useConnection";

const CONNECTION_TIMEOUT = 5000;

interface UseConnectionManagerOptions {
  onData: (data: unknown) => void;
}

export function useConnectionManager({ onData }: UseConnectionManagerOptions) {
  const {
    peerId,
    remotePeerId,
    setRemotePeerId,
    setIsConnected,
    isConnected,
    setConnectionStatus,
  } = useConnection();

  const peerRef = useRef<Peer | null>(null);
  const connectionRef = useRef<any>(null);
  const onDataRef = useRef(onData);
  const connectionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  onDataRef.current = onData;

  const clearConnectionTimeout = useCallback(() => {
    if (connectionTimeoutRef.current) {
      clearTimeout(connectionTimeoutRef.current);
      connectionTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!peerId) return;

    try {
      const peer = new Peer(peerId);

      peer.on("open", (id) => {
        console.log("Mi ID:", id);
      });

      peer.on("connection", (conn: any) => {
        connectionRef.current = conn;
        setupConnectionEvents(conn);
        console.log(conn);
        toast("Conexión entrante establecida", {
          variant: "success",
          description: `Conexión entre ${peerId} y ${conn.peer} exitosa`,
        });
      });

      peer.on("error", (error: any) => {
        console.error("Error en PeerJS:", error);
        setConnectionStatus("disconnected");
        toast("Los dispositivos no se han podido encontrar", {
          variant: "danger",
          description:
            "Ambos deben tener conexión a internet en la fase inicial para poderse encontrar",
        });
      });

      peerRef.current = peer;

      return () => {
        clearConnectionTimeout();
        peer.destroy();
        peerRef.current = null;
        connectionRef.current = null;
      };
    } catch (error) {
      console.error("Error al inicializar PeerJS:", error);
      toast("Error de inicialización", { variant: "danger" });
    }
  }, [peerId]);

  const setupConnectionEvents = useCallback((conn: any) => {
    conn.on("open", () => {
      clearConnectionTimeout();
      setIsConnected(true);
      setConnectionStatus("connected");
      setRemotePeerId(conn.peer);
    });

    conn.on("data", (data: any) => {
      onDataRef.current(data);
    });

    conn.on("close", () => {
      clearConnectionTimeout();
      setIsConnected(false);
      setConnectionStatus("disconnected");
      setRemotePeerId("");
    });

    conn.on("error", (err: any) => {
      clearConnectionTimeout();
      setConnectionStatus("disconnected");
      console.error("Error en conexión:", err);
      toast("Error en la conexión", { variant: "danger" });
    });
  }, []);

  const connectToPeer = useCallback(() => {
    if (!peerRef.current || !remotePeerId || isConnected) return;

    try {
      setConnectionStatus("connecting");
      clearConnectionTimeout();
      connectionTimeoutRef.current = setTimeout(() => {
        setConnectionStatus("disconnected");
        connectionRef.current = null;
        toast("No se ha podido establecer la conexión", {
          variant: "danger",
          description: "El otro dispositivo no ha respondido",
        });
      }, CONNECTION_TIMEOUT);

      const conn = peerRef.current.connect(remotePeerId);
      connectionRef.current = conn;
      setupConnectionEvents(conn);
    } catch (error: any) {
      clearConnectionTimeout();
      setConnectionStatus("disconnected");
      console.error("Error al conectar:", error);
      toast("No se ha podido conectar con el otro dispositivo", {
        variant: "danger",
      });
    }
  }, [remotePeerId, isConnected]);

  const disconnect = useCallback(() => {
    clearConnectionTimeout();
    connectionRef.current?.close();
    connectionRef.current = null;
    setIsConnected(false);
    setConnectionStatus("disconnected");
    setRemotePeerId("");
  }, []);

  return {
    connectionRef,
    connectToPeer,
    disconnect,
  };
}
