
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import HousesTable from '../components/houses/HousesTable';
import { fetchHouses } from '@/services/houseService';

const Houses: React.FC = () => {
  const [housesData, setHousesData] = useState([]);

  useEffect(() => {
    const fetchAllHouses =  async () => {
      const response = await fetchHouses()
      setHousesData(response)
    }
    fetchAllHouses()
  }, [])


  return (
    <Layout>
      <div className="page-container">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground mt-1">
            Manage all your residential and commercial properties.
          </p>
        </div>
        
        <HousesTable houses={housesData} setHousesData={setHousesData} />
      </div>
    </Layout>
  );
};

export default Houses;
