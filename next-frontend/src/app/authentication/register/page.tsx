"use client";
import { useState } from "react";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography, TextField, Button, Alert, CircularProgress } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import { registerUser } from "@/services/authService";
import { useRouter } from "next/navigation";

const Register2 = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

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
    if (!user.first_name || !user.last_name || !user.email || !user.password) {
      setError("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      setError("Invalid email format.");
      return false;
    }
    if (user.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await registerUser(user);
      
      if (response?.status === 201) {
        router.push("/"); // Redirect to home
      } else {
        setError(response?.data?.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while registering. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Register" description="This is the Register page">
      <Box sx={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Card elevation={9} sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "400px" }}>
          {/* Logo */}
          <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
            <Logo />
          </Box>

          <Typography variant="h5" textAlign="center" fontWeight="600" mb={2}>
            Register
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleRegister}>
            <TextField fullWidth margin="normal" label="First Name" variant="outlined" name="first_name" value={user.first_name} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Last Name" variant="outlined" name="last_name" value={user.last_name} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Email" variant="outlined" type="email" name="email" value={user.email} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Password" type="password" variant="outlined" name="password" value={user.password} onChange={handleChange} required />

            <Button 
              fullWidth 
              variant="contained" 
              color="primary" 
              type="submit" 
              disabled={loading} 
              sx={{ mt: 2 }}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              {loading ? "Registering..." : "Sign Up"}
            </Button>
          </form>

          <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
            <Typography color="textSecondary" variant="body2">
              Already have an account?
            </Typography>
            <Typography component={Link} href="/authentication/login" fontWeight="500" sx={{ textDecoration: "none", color: "primary.main" }}>
              Sign In
            </Typography>
          </Stack>
        </Card>
      </Box>
    </PageContainer>
  );
};

export default Register2;
