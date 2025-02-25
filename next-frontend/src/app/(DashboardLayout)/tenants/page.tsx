"use client";

import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import ListTenants from "@/app/(DashboardLayout)/tenants/components/ListTenants";
import { fetchTenants } from "@/services/tenantServices";
import { fetchHouses } from "@/services/houseService";
import type { Tenant } from "@/types";


interface VacantHouse {
  _id: string,
  house_number: string,
  house_type: number,
  house_location: string,
  house_price: number,
  occupied: boolean,
}

const Tenant: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [vacantHouses, setvacantHouses] = useState<VacantHouse[]>([]);

  // useEffect(() => {
  //   const fetchAllTenants = async () => {
  //     try {
  //       const data = await fetchTenants()
  //       console.log("data ==>", data)
  //       setTenants(data);
  //     } catch (error) {
  //       console.error("Failed to fetch houses:", error);
  //     }
  //   };
  //   fetchAllTenants();
  // }, [])


  useEffect(() => {
    const fetchAllTenants = async () => {
      try {
        const response = await fetchTenants()
        console.log("response", response)
        if (!response) {
          throw new Error("Failed to fetch tenants");
        }
        setTenants(response);
      } catch (error) {
        console.error("Error fetching tenants:", error);
      }
    };

    const getAllHouses = async () => {
      try {
        const data = await fetchHouses()
        console.log("data ==>", data )
        if(data) {
          const vacant = data.filter((d) => !d.occupied)
        console.log("vacant", vacant )

          setvacantHouses(vacant)
        }
        
      } catch (error) {
        
      }
    }
    getAllHouses()
    fetchAllTenants();
  }, []);

  return (
    <PageContainer title="Tenants" description="Manage all tenants">
      <DashboardCard>
        <Typography>
          <ListTenants tenants={tenants} setTenants={setTenants} vacantHouses={vacantHouses} />
        </Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Tenant;