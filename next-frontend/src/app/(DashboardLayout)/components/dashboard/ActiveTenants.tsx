'use client';

import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface TenantDataChartProps {
  tenantData?: {
    active: boolean;
  }[];
}

const ActiveTenants: React.FC<TenantDataChartProps> = ({ tenantData = [] }) => {
  const theme = useTheme();

  // Tenant Data Chart Statistics
  const activeCount = tenantData.filter((tenant) => tenant.active).length;
  const inactiveCount = tenantData.length - activeCount;
  const hasTenantData = tenantData.length > 0;

  const tenantChartOptions = {
    chart: { type: 'donut', fontFamily: "'Plus Jakarta Sans', sans-serif", foreColor: '#adb0bb', height: 200 },
    colors: [theme.palette.primary.main, theme.palette.error.main],
    plotOptions: { pie: { startAngle: 0, endAngle: 360, donut: { size: '75%', background: 'transparent' } } },
    tooltip: { theme: theme.palette.mode === 'dark' ? 'dark' : 'light' },
    stroke: { show: false },
    dataLabels: { enabled: false },
    legend: { position: 'bottom' },
    labels: ['Active Tenants', 'Inactive Tenants'],
  };

  const tenantChartSeries = [activeCount, inactiveCount];

  return (
    <DashboardCard title="Tenant Data">
      <Grid container spacing={2} alignItems="center">
        {/* Tenant Data Chart */}
        <Grid item xs={8} display="flex" justifyContent="center">
          {hasTenantData ? (
            <Chart options={tenantChartOptions} series={tenantChartSeries} type="donut" width="100%" height="200px" />
          ) : (
            <Typography align="center" color="textSecondary">No tenant data available.</Typography>
          )}
        </Grid>

        {/* Tenant Count Display (Right Side) */}
        <Grid item xs={4}>
          <Box textAlign="right">
            <Typography variant="body2" color="textSecondary">
              Active Tenants: <strong>{activeCount}</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Inactive Tenants: <strong>{inactiveCount}</strong>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default ActiveTenants;
