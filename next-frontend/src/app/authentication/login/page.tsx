"use client";
import { useState } from "react";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography, TextField, Button, Alert, CircularProgress } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import { loginUser } from "@/services/authService";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

const Login2 = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Validate form before submitting
  const validateForm = () => {
    if (!user.email || !user.password) {
      setError("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      setError("Invalid email format.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await loginUser(user);
      if (response?.status === 200 && response.data?.token) {
        console.log("response --->", response)
        // if (typeof window !== "undefined") {
        //   localStorage.setItem("token", response.data.token);
        // }
        router.push("/");
      } else {
        setError(response.data?.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while logging in. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Login" description="This is the Login page">
      <Box sx={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Card elevation={9} sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "400px" }}>
          {/* Logo */}
          <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
            <Logo />
          </Box>

          <Typography variant="h5" textAlign="center" fontWeight="600" mb={2}>
            Login
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleLogin}>
            <TextField fullWidth margin="normal" label="Email" variant="outlined" name="email" type="email" value={user.email} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Password" type="password" variant="outlined" name="password" value={user.password} onChange={handleChange} required />

            <Button 
              fullWidth 
              variant="contained" 
              color="primary" 
              type="submit" 
              disabled={loading} 
              sx={{ mt: 2 }}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
            <Typography color="textSecondary" variant="body2">
              No account?
            </Typography>
            <Typography component={Link} href="/authentication/register" fontWeight="500" sx={{ textDecoration: "none", color: "primary.main" }}>
              Sign Up
            </Typography>
          </Stack>
        </Card>
      </Box>
    </PageContainer>
  );
};

export default Login2;
