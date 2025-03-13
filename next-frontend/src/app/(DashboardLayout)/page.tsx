'use client'
import { useEffect, useState, useMemo } from 'react';
import { Grid, Box } from '@mui/material';
import dynamic from 'next/dynamic';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { fetchHouses } from '@/services/houseService';
import { fetchTenants } from '@/services/tenantServices';
import type { House, Tenant } from '@/types';


// Lazy Load Components
const HouseDataChart = dynamic(() => import('@/app/(DashboardLayout)/components/dashboard/HouseDataChart'), { ssr: false });
const ActiveTenants = dynamic(() => import('@/app/(DashboardLayout)/components/dashboard/ActiveTenants'), { ssr: false });
const TenantStats = dynamic(() => import('@/app/(DashboardLayout)/components/dashboard/TenantStats'), { ssr: false });
const UpcomingSchedules = dynamic(() => import('@/app/(DashboardLayout)/components/dashboard/UpcomingSchedules'), { ssr: false });
const TopPayingClients = dynamic(() => import('@/app/(DashboardLayout)/components/dashboard/TopPayingClients'), { ssr: false });

const Dashboard = () => {
  const [houseData, setHouseData] = useState<House[]>([]); // ✅ Initialize as an empty array
  const [tenantData, setTenantData] = useState<Tenant[]>([]); // ✅ Initialize as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [houses, tenants] = await Promise.all([
          fetchHouses(),
          fetchTenants()
        ]);

        setHouseData(houses);
        setTenantData(tenants);
        console.log('Tenant Data:', tenants);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const memoizedHouseData = useMemo(() => houseData, [houseData]);
  const memoizedTenantData = useMemo(() => tenantData, [tenantData]);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <HouseDataChart data={memoizedHouseData} />
          </Grid>

          <Grid item xs={12} lg={6}>
            <ActiveTenants tenantData={memoizedTenantData} />
            <TenantStats tenantData={memoizedTenantData} />
          </Grid>

          <Grid item xs={12} lg={4}>
            <UpcomingSchedules />
          </Grid>

          <Grid item xs={12} lg={8}>
            <TopPayingClients />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default Dashboard;
