import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

export default function Layout() {
  return (
    <Box>
      <TopBar />
      <Toolbar />
      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
