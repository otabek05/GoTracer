import { Box, Button, TextField, Typography, Paper } from "@mui/material";

export default function Login() {
  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#f5f5f7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 360,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          GoTrace
        </Typography>

        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          mb={3}
        >
          Sign in to continue
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, borderRadius: 2 }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}

