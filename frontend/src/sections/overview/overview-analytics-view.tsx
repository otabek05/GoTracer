import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Button,
  Collapse,
  IconButton,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useWebSocket } from "src/hook/WebsocketContext";
import { MessageType, NetworkLayer, TrafficOptions, TransportLayer } from "src/types/ws_sending";
import { Icon } from "@iconify/react";
import { PacketItem } from "./layers";

interface CollapsibleItemProps {
  data: any;
  label?: string;
  level?: number;
}

const CollapsibleItem = ({ data, label, level = 0 }: CollapsibleItemProps) => {
  const [open, setOpen] = useState(false); // default closed

  const isObject = typeof data === "object" && data !== null;

  return (
    <Box sx={{ pl: level * 2, width: "100%" }}>
      <Button
        fullWidth
        variant="text"
        onClick={() => setOpen(!open)}
        endIcon={
          <Icon icon={open ? "solar:chevron-up-bold" : "solar:chevron-down-bold"} />
        }
        sx={{
          justifyContent: "space-between",
          textTransform: "none",
          color: "inherit",
          py: 1,
        }}
      >
        {label ? `${label}${!isObject ? `: ${data}` : ""}` : String(data)}
      </Button>

      {isObject && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {Object.entries(data).map(([key, value]) => (
            <CollapsibleItem key={key} data={value} label={key} level={level + 1} />
          ))}
        </Collapse>
      )}

      {/* Divider between items */}
      {level === 0 && <Divider sx={{ my: 0.5, bgcolor: "#30363d" }} />}
    </Box>
  );
};

export default function OverviewAnalyticsView() {
  const { connected, messages, send, connect, clearMessages } = useWebSocket();

  const [trafficOption, setTrafficOption] = useState<TrafficOptions>(TrafficOptions.Both);
  const [networkLayer, setNetworkLayer] = useState<NetworkLayer>(NetworkLayer.Unknown);
  const [transportLayer, setTransportLayer] = useState<TransportLayer>(TransportLayer.Unknown);

  const handleApply = () => {
    send({
      type: MessageType.StartCapturing,
      message: {},
      trafficOptions: trafficOption,
      networkLayer: networkLayer,
      transport: transportLayer,
      isOutgoing: true,
    });
  };

  useEffect(() => {
    connect("ws://localhost:8080/ws");
  }, []);

  return (
    <Box sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Traffic</InputLabel>
          <Select
            value={trafficOption}
            label="Traffic"
            onChange={(e) => setTrafficOption(e.target.value as TrafficOptions)}
          >
            <MenuItem value={TrafficOptions.Incoming}>Incoming</MenuItem>
            <MenuItem value={TrafficOptions.Outgoing}>Outgoing</MenuItem>
            <MenuItem value={TrafficOptions.Both}>Both</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Network Layer</InputLabel>
          <Select
            value={networkLayer}
            label="Network Layer"
            onChange={(e) => setNetworkLayer(e.target.value as NetworkLayer)}
          >
            <MenuItem value={NetworkLayer.IPv4}>IPv4</MenuItem>
            <MenuItem value={NetworkLayer.IPv6}>IPv6</MenuItem>
            <MenuItem value={NetworkLayer.ICMP}>ICMP</MenuItem>
            <MenuItem value={NetworkLayer.Unknown}>Any</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Transport</InputLabel>
          <Select
            value={transportLayer}
            label="Transport"
            onChange={(e) => setTransportLayer(e.target.value as TransportLayer)}
          >
            <MenuItem value={TransportLayer.TCP}>TCP</MenuItem>
            <MenuItem value={TransportLayer.UDP}>UDP</MenuItem>
            <MenuItem value={TransportLayer.Unknown}>Any</MenuItem>
          </Select>
        </FormControl>

        <Box
          onClick={handleApply}
          sx={{
            px: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            bgcolor: "primary.main",
            color: "white",
            cursor: "pointer",
          }}
        >
          Apply
        </Box>

        <Button variant="outlined" color="secondary" onClick={clearMessages} sx={{ ml: 2 }}>
          Clear
        </Button>
      </Box>

      <Typography variant="body2" sx={{ mt: 1, opacity: 0.6 }}>
        WebSocket Status: {connected ? "🟢 Connected" : "🔴 Disconnected"}
      </Typography>

      <Paper
        sx={{
          p: 2,
          mt: 1,
          flexGrow: 1,
          overflowY: "auto",
          bgcolor: "#0d1117",
          color: "#c9d1d9",
          borderRadius: 2,
          border: "1px solid #30363d",
          fontFamily: "monospace",
        }}
      >
        {messages.length === 0 ? (
          <Typography sx={{ color: "#8b949e" }}>No packets yet...</Typography>
        ) : (
          messages.map((msg, idx) => <PacketItem key={idx} packet={msg} />)
        )}

      </Paper>
    </Box>
  );
}

