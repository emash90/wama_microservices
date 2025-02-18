
"use client";

import React, { useEffect, useState } from "react";
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import ListHouses from '@/app/(DashboardLayout)/houses/components/ListHouses';
import {fetchHouses } from '@/services/houseService'

interface House {
  _id: string;
  house_number: string;
  house_location: string;
  house_price: number;
  house_type: number;
  occupied: boolean;
}
const House: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([]);

  // Fetch houses from API
  useEffect(() => {
    const fetchAllHouses = async () => {
      try {
        const data = await fetchHouses()
        console.log("data ==>", data)
        setHouses(data);
      } catch (error) {
        console.error("Failed to fetch houses:", error);
      }
    };

    fetchAllHouses();
  }, []);

  const dummyHouseData = [
    {
      _id: "67aa1ddb8ea32554177b27a2",
      house_number: "t65",
      house_type: 1,
      house_location: "next to county hospital",
      house_price: 45000,
      occupied: true,
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
      occupied: true,
      createdAt: "2025-02-11T10:15:30.500+00:00",
      updatedAt: "2025-02-11T11:20:40.600+00:00",
      __v: 0,
    },
  ];
  return (
    <PageContainer title="Houses" description="manage all houses">
      <DashboardCard>
        <Typography>
          <ListHouses houses={houses} setHouses={setHouses} />
        </Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default House;