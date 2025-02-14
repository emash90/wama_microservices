"use client";
import { useState } from "react";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography, TextField, Button, Alert } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import { loginUser } from "@/services/authService";
import { useRouter } from "next/navigation";

const Login2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const response = await loginUser({ email, password });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        router.push("/dashboard"); // Redirect to dashboard
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while logging in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: "100vh" }}>
          <Grid item xs={12} sm={12} lg={4} xl={3} display="flex" justifyContent="center" alignItems="center">
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={2}>
                Login
              </Typography>
              {error && <Alert severity="error">{error}</Alert>}
              <form onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button fullWidth variant="contained" color="primary" type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
              <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="500">
                  No Account?
                </Typography>
                <Typography
                  component={Link}
                  href="/authentication/register"
                  fontWeight="500"
                  sx={{ textDecoration: "none", color: "primary.main" }}
                >
                  Sign Up
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;