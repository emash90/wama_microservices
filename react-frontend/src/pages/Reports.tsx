
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import ReportsGenerator from '../components/reports/ReportsGenerator';
import { RealPayment as Payment, RealHouse as House, RealTenant as Tenant } from '../data/mockData';
import { fetchPayments } from '@/services/paymentService';
import { fetchHouses } from '@/services/houseService';
import { fetchTenants } from '@/services/tenantService';

const Reports: React.FC = () => {

  const [paymentData, setPaymentData] = useState<Payment[]>([]);
  const [houseData, setHouseData] = useState<House[]>([]);
  const [tenantData, setTenantData] = useState<Tenant[]>([]);
  useEffect(() => {
    const getData = async () => {
      const responses = await Promise.all([
        fetchPayments(),
        fetchHouses(),
        fetchTenants(),
      ]);
      setPaymentData(responses[0]);
      setHouseData(Array.isArray(responses[1]) ? responses[1] : [responses[1]]);
      setTenantData(responses[2]);
    }
    getData();
  }, []);
  if (!paymentData) {
    return null;
    }

  return (
    <Layout>
      <div className="page-container">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate financial and occupancy reports for your rental properties.
          </p>
        </div>
        
        <ReportsGenerator payments={paymentData} houses={houseData} tenants={tenantData} />
      </div>
    </Layout>
  );
};

export default Reports;
