import React from "react";
import { ReactNode } from "react";

import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import Link from "next/link";

interface RegisterProps {
  title?: string;
  subtitle?: ReactNode;
  subtext?: ReactNode;
}

const AuthRegister = ({ title, subtitle, subtext }: RegisterProps) => (
  <Box sx={{ maxWidth: 400, mx: "auto", p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
    {title && (
      <Typography fontWeight={700} variant="h4" mb={2} textAlign="center">
        {title}
      </Typography>
    )}

    {subtext && <Box mb={2}>{subtext}</Box>}

    <Stack spacing={2}>
      <TextField label="First Name" variant="outlined" fullWidth />
      <TextField label="Last Name" variant="outlined" fullWidth />
      <TextField label="Email Address" variant="outlined" fullWidth type="email" />
      <TextField label="Password" variant="outlined" fullWidth type="password" />
    </Stack>

    <Button
      color="primary"
      variant="contained"
      size="large"
      fullWidth
      sx={{ mt: 3 }}
      component={Link}
      href="/authentication/login"
    >
      Sign Up
    </Button>
    {subtitle && <Box mt={2}>{subtitle}</Box>}
  </Box>
);

export default AuthRegister;
