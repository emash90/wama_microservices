import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { fetchTenantById } from '../../services/tenantServices';

const TenantDetails = () => {
  const { id } = useParams(); // Get the tenant ID from the URL
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenantDetails = async () => {
      try {
        const response = await fetchTenantById(id)
        setTenant(response);
      } catch (err) {
        console.error('Error fetching tenant details:', err);
        setError('Failed to load tenant details');
      } finally {
        setLoading(false);
      }
    };

    fetchTenantDetails();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Tenant Details
          </Typography>
          <Typography variant="body1">
            <strong>Name:</strong> 
            <span> {tenant.tenant_first_name} </span><span>{tenant.tenant_last_name} </span>
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {tenant.tenant_phone}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {tenant.tenant_email}
          </Typography>
          <Typography variant="body1">
            <strong>House Number:</strong> {tenant.houseNumber}
          </Typography>
          <Typography variant="body1">
            <strong>Balance:</strong> ${tenant.balance}
          </Typography>
          <Typography variant="body1">
            <strong>Joined Date:</strong> {new Date(tenant.createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantDetails;
