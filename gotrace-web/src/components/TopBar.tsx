import { Box, Typography, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", path: "/", icon: "mdi:view-dashboard-outline" },
  { label: "Traffic", path: "/traffic", icon: "mdi:chart-line" },
  { label: "Settings", path: "/settings", icon: "mdi:cog-outline" },
];

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        height: 40,
        px: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "#f6f6f6",
        borderBottom: "1px solid #ddd",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        userSelect: "none",
      }}
    >
      {/* Mac window buttons */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#ff5f56" }} />
        <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#ffbd2e" }} />
        <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#27c93f" }} />
      </Box>

      {/* Center menu */}
      <Box sx={{ display: "flex", gap: 2 }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <IconButton
              key={item.path}
              size="small"
              onClick={() => navigate(item.path)}
              sx={{
                px: 1,
                borderRadius: 1,
                bgcolor: active ? "#e0e0e0" : "transparent",
              }}
            >
              <Icon icon={item.icon} width={18} />
              <Typography sx={{ ml: 0.5, fontSize: 13 }}>
                {item.label}
              </Typography>
            </IconButton>
          );
        })}
      </Box>

      {/* Right icons */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Icon icon="mdi:wifi" width={18} />
        <Icon icon="mdi:battery" width={18} />
        <Typography sx={{ fontSize: 12 }}>10:42</Typography>
      </Box>
    </Box>
  );
}

