
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import TenantsTable from '../components/tenants/TenantsTable';
import { fetchHouses } from '@/services/houseService';
import { fetchTenants } from '@/services/tenantService';

const Tenants: React.FC = () => {
  const [tenantsData, setTenantsData] = useState([])
  const [housesData, setHousesData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Promise.all([
          fetchHouses(),
          fetchTenants()
        ])
        setHousesData(response[0])
        setTenantsData(response[1])
      } catch (error) {
        console.error('Error fetching data:', error)
        error
      }
    }
    fetchData()
  }, [])

const vacantHouses = housesData.filter((house) => house.occupied === false)

  return (
    <Layout>
      <div className="page-container">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Tenants</h1>
          <p className="text-muted-foreground mt-1">
            Manage your residential and commercial tenants.
          </p>
        </div>
        
        <TenantsTable tenants={tenantsData} setTenantsData={setTenantsData} housesData={vacantHouses} />
      </div>
    </Layout>
  );
};

export default Tenants;
