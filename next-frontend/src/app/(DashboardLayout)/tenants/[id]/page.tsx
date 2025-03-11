"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { 
  Container, Typography, Box, CircularProgress, Paper, Divider, Chip, Stack 
} from "@mui/material";
import { Person, Email, Home, Phone, CalendarToday, CheckCircle, Cancel } from "@mui/icons-material";
import { fetchTenantById } from "@/services/tenantServices";

interface Tenant {
  _id: string;
  tenant_first_name: string;
  tenant_last_name: string;
  tenant_email: string;
  tenant_phone: string;
  tenant_house?: string;
  balance: number;
  active: boolean;
}

const ViewTenant = () => {
  const { id } = useParams();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const data = await fetchTenantById(id as string);
        setTenant(data);
      } catch (error) {
        console.error("Failed to fetch tenant:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTenant();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress size={50} />
        </Box>
      </Container>
    );
  }

  if (!tenant) {
    return (
      <Container>
        <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
          Tenant not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ padding: 4, marginTop: 5, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          🏠 Tenant Details
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Stack spacing={2}>
          <Box display="flex" alignItems="center">
            <Person sx={{ color: "primary.main", mr: 1 }} />
            <Typography variant="h6">
              <strong>Name:</strong> {tenant.tenant_first_name} {tenant.tenant_last_name}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Email sx={{ color: "secondary.main", mr: 1 }} />
            <Typography variant="h6">
              <strong>Email:</strong> {tenant.tenant_email}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Phone sx={{ color: "green", mr: 1 }} />
            <Typography variant="h6">
              <strong>Phone:</strong> {tenant.tenant_phone}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Home sx={{ color: "purple", mr: 1 }} />
            <Typography variant="h6">
              <strong>House Number:</strong> {tenant.tenant_house}
            </Typography>
          </Box>

  
          <Box display="flex" alignItems="center">
            {tenant.active ? (
              <CheckCircle sx={{ color: "green", mr: 1 }} />
            ) : (
              <Cancel sx={{ color: "red", mr: 1 }} />
            )}
            <Typography variant="h6">
              <strong>Status:</strong> 
              <Chip
                label={tenant.active ? "Active" : "Inactive"}
                color={tenant.active ? "success" : "error"}
                sx={{ ml: 1 }}
              />
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ViewTenant;
