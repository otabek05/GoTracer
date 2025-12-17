import type { NetworkInterface } from "./netInterface";



export const MessageTypeList = [
  { label: "Start Capturing", value: "start_capturing" },
  { label: "Stop Capturing", value: "stop_capturing" },
  { label: "Reset", value: "reset" },
  { label: "Restart", value: "restart" },
  { label: "Start Nmap", value: "start_nmap" },
  { label: "Stop Nmap", value: "stop_nmap" },
]as const ;

export type MessageType = typeof MessageTypeList[number]["value"];

export const TrafficOptionsList = [
  { label: "Incoming", value: "incoming" },
  { label: "Outgoing", value: "outgoing" },
  { label: "Any", value: "any" },
] as const ;

export type TrafficOptions =
  typeof TrafficOptionsList[number]["value"];

export const NetworkLayerList = [
  { label: "IPv4", value: "ipv4" },
  { label: "IPv6", value: "ipv6" },
  { label: "ICMP", value: "icmp" },
  { label: "Any", value: "any" },
] as const ;

export type NetworkLayer =
  typeof NetworkLayerList[number]["value"];

export const TransportLayerList = [
  { label: "TCP", value: "tcp" },
  { label: "UDP", value: "udp" },
  { label: "Any", value: "any" },
] as const;

export type TransportLayer =
  typeof TransportLayerList[number]["value"];

export const ApplicationLayerList = [
  { label: "Any", value: "any" },
  { label: "Well Known", value: "well-known" },
  { label: "Custom", value: "custom" },
] as const;

export type ApplicationLayer =
  typeof ApplicationLayerList[number]["value"];

export interface WebSocketTX {
  type: MessageType;
  message?: any;
  trafficOptions?: TrafficOptions;
  networkLayer?: NetworkLayer;
  transport?: TransportLayer;
  applicationLayer?: ApplicationLayer;
  interface?: NetworkInterface;
  services?: string[] | null;
  ipv4?: string 
} 