import React, { createContext, useContext, useRef, useState, useCallback } from "react";
import { ParsedPacket, WSReceiving } from "src/types/ws_receiving";
import { MessageType, WSIncomingMessage, WSOutgoingMessage } from "src/types/ws_sending";

interface WebSocketContextType {
  connected: boolean;
  messages: ParsedPacket[];
  connect: (url: string) => void;
  disconnect: () => void;
  send: (msg: WSOutgoingMessage) => void;
  startCapturing: () => void;
  stopCapturing: () => void;
  clearMessages: ()=> void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const ws = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<ParsedPacket[]>([]);

  const connect = useCallback((url: string) => {
    if (ws.current) ws.current.close();
    ws.current = new WebSocket(url);

    ws.current.onopen = () => setConnected(true);
    ws.current.onclose = () => setConnected(false);

    ws.current.onmessage = (event) => {
      try {
        const data: WSReceiving = JSON.parse(event.data);
        if (data.type == "packets" && data.packets) {
            setMessages((prev) => [...prev, data.packets!]);

        }
      } catch {
        console.log("raw:", event.data);
      }
    };
  }, []);

  const disconnect = () => ws.current?.close();
  const send = (msg: WSOutgoingMessage) => ws.current?.send(JSON.stringify(msg));

  const startCapturing = () => send({ type: MessageType.StartCapturing, isOutgoing: true });
  const stopCapturing = () => send({ type: MessageType.StopCapturing, isOutgoing: true });

  const clearMessages = ()=> setMessages([])

  return (
    <WebSocketContext.Provider
      value={{
        connected,
        messages,
        connect,
        disconnect,
        send,
        startCapturing,
        stopCapturing,
        clearMessages,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}; // ← ★ 필수!!

export const useWebSocket = () => {
  const ctx = useContext(WebSocketContext);
  if (!ctx) throw new Error("useWebSocket must be used inside WebSocketProvider");
  return ctx;
};
