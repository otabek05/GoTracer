import {
  Box,
  Typography,
  Paper,
  Button,
  Collapse,
  IconButton,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { ParsedPacket } from "src/types/ws_receiving";

interface PacketItemProps {
  packet: ParsedPacket;
}

const LayerItem = ({ label, data }: { label: string; data: any }) => {
  const [open, setOpen] = useState(false);
  const isObject = typeof data === "object" && data !== null;

  return (
    <Box sx={{ width: "100%", pl: 2 }}>
      <Button
        fullWidth
        variant="text"
        onClick={() => setOpen(!open)}
        endIcon={
          isObject ? (
            <Icon icon={open ? "solar:chevron-up-bold" : "solar:chevron-down-bold"} />
          ) : undefined
        }
        sx={{ justifyContent: "space-between", textTransform: "none", color: "inherit", py: 0.5 }}
      >
        {label}{!isObject ? `: ${data}` : ""}
      </Button>

      {isObject && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {Object.entries(data).map(([key, value]) => (
            <LayerItem key={key} label={key} data={value} />
          ))}
        </Collapse>
      )}
    </Box>
  );
};

export const PacketItem = ({ packet }: PacketItemProps) => {
  const [open, setOpen] = useState(false);

  const directionIcon =
    packet.direction === "incoming" ? "material-symbols:arrow-downward" : "material-symbols:arrow-upward";

  return (
    <Box sx={{ width: "100%" }}>
      <Button
        fullWidth
        variant="contained"
        color={packet.direction === "incoming" ? "success" : "primary"}
        onClick={() => setOpen(!open)}
        endIcon={<Icon icon={open ? "solar:chevron-up-bold" : "solar:chevron-down-bold"} />}
        sx={{
          justifyContent: "space-between",
          textTransform: "none",
          py: 1,
          mb: 0.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Icon icon={directionIcon} width={20} height={20} color={packet.direction == "incoming" ? "primary" : "success"} />
          <Typography sx={{ fontFamily: "monospace" }}>
            {packet.time}
          </Typography>
        </Box>
        <Typography sx={{ fontFamily: "monospace", fontSize: 12 }}>{packet.time}</Typography>
      </Button>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ pl: 2 }}>
          {packet.ethernet && <LayerItem label="Ethernet" data={packet.ethernet} />}
          {packet.ipv4 && <LayerItem label="IPv4" data={packet.ipv4} />}
          {packet.ipv6 && <LayerItem label="IPv6" data={packet.ipv6} />}
          {packet.tcp && <LayerItem label="TCP" data={packet.tcp} />}
          {packet.udp && <LayerItem label="UDP" data={packet.udp} />}
          {packet.icmp && <LayerItem label="ICMP" data={packet.icmp} />}
          {packet.arp && <LayerItem label="ARP" data={packet.arp} />}
          {packet.dns && <LayerItem label="DNS" data={packet.dns} />}
          {packet.http && <LayerItem label="HTTP" data={packet.http} />}
          {packet.https && <LayerItem label="HTTPS" data={packet.https} />}
          {packet.dhcp && <LayerItem label="DHCP" data={packet.dhcp} />}
          {packet.application && <LayerItem label={packet.application.protocol} data={packet.application.data} />}
        </Box>
      </Collapse>

      <Divider sx={{ my: 0.5, bgcolor: "#30363d" }} />
    </Box>
  );
};
