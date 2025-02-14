"use client";

import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import ListTenants from "@/app/(DashboardLayout)/tenants/components/ListTenants";

const Tenant: React.FC = () => {
  const [tenants, setTenants] = useState([]);
  const [vacantHouses, setvacantHouses] = useState([]);

  const dummyTenantData = [
    {
      _id: "67aa1e291df76c3e24296440",
      tenant_first_name: "Nyamiru",
      tenant_last_name: "Wameru",
      tenant_phone: "0722222222",
      tenant_house_id: "67aa1ddb8ea32554177b27a2",
      tenant_email: "rosekairu@gmail.com",
      tenant_rent: 45000,
      active: true,
      balance: 89980,
      createdAt: "2025-02-10T15:41:29.102+00:00",
      updatedAt: "2025-02-10T15:44:02.501+00:00",
      __v: 0,
    },
    {
      _id: "67aa1e291df76c3e24296441",
      tenant_first_name: "James",
      tenant_last_name: "Muriuki",
      tenant_phone: "0711111111",
      tenant_house_id: "67aa1ddb8ea32554177b27a3",
      tenant_email: "jamesmuriuki@gmail.com",
      tenant_rent: 60000,
      active: false,
      balance: 45000,
      createdAt: "2025-02-11T09:30:10.500+00:00",
      updatedAt: "2025-02-11T10:45:22.200+00:00",
      __v: 0,
    },
    {
      _id: "67aa1e291df76c3e24296442",
      tenant_first_name: "Angela",
      tenant_last_name: "Kamau",
      tenant_phone: "0733333333",
      tenant_house_id: "67aa1ddb8ea32554177b27a4",
      tenant_email: "angelakamau@gmail.com",
      tenant_rent: 30000,
      active: true,
      balance: 120000,
      createdAt: "2025-02-12T08:20:15.750+00:00",
      updatedAt: "2025-02-12T09:10:30.800+00:00",
      __v: 0,
    },
  ];

  const dummyVacantHouseData = [
    {
      _id: "67aa1ddb8ea32554177b27a2",
      house_number: "t65",
      house_type: 1,
      house_location: "next to county hospital",
      house_price: 45000,
      occupied: false,
      createdAt: "2025-02-10T15:40:11.731+00:00",
      updatedAt: "2025-02-10T15:41:29.736+00:00",
      __v: 0,
    },
    {
      _id: "67aa1ddb8ea32554177b27a3",
      house_number: "b12",
      house_type: 0,
      house_location: "near central park",
      house_price: 60000,
      occupied: false,
      createdAt: "2025-02-10T16:00:00.000+00:00",
      updatedAt: "2025-02-10T16:05:00.000+00:00",
      __v: 0,
    },
    {
      _id: "67aa1ddb8ea32554177b27a4",
      house_number: "c78",
      house_type: 1,
      house_location: "behind school district",
      house_price: 30000,
      occupied: false,
      createdAt: "2025-02-11T10:15:30.500+00:00",
      updatedAt: "2025-02-11T11:20:40.600+00:00",
      __v: 0,
    },
  ];

  // useEffect(() => {
  //   const fetchTenants = async () => {
  //     try {
  //       const response = await
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch tenants");
  //       }
  //       const data = await response.json();
  //       setTenants(data);
  //     } catch (error) {
  //       console.error("Error fetching tenants:", error);
  //     }
  //   };

  //   fetchTenants();
  // }, []);

  return (
    <PageContainer title="Tenants" description="Manage all tenants">
      <DashboardCard>
        <Typography>
          <ListTenants tenants={dummyTenantData} setTenants={setTenants} vacantHouses={dummyVacantHouseData} />
        </Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Tenant;