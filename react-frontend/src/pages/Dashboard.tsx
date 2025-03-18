
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import DashboardCards from '../components/dashboard/DashboardCards';
import DashboardCharts from '../components/dashboard/DashboardCharts';
import { getDashboardStats, getMonthlyRevenue, getPropertyTypeDistribution } from '../data/mockData';
import { fetchPayments } from '@/services/paymentService';
import { fetchTenants } from '@/services/tenantService';
import { fetchHouses } from '@/services/houseService';
import { RealPayment as Payment, RealTenant as Tenant, RealHouse as House } from '../data/mockData';

const Dashboard: React.FC = () => {
  const [paymentData, setPaymentData] = useState<Payment[]>([]);
  const [tenantData, setTenantData] = useState<Tenant[]>([]);
  const [houseData, setHouseData] = useState<House[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.all([
          fetchPayments(),
          fetchTenants(),
          fetchHouses()
        ])
        setPaymentData(data[0])
        setTenantData(data[1])
        setHouseData(data[2])
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [])
  
  
  
  const stats = getDashboardStats(houseData, tenantData, paymentData)
  const monthlyRevenue = getMonthlyRevenue(paymentData);
  const propertyDistribution = getPropertyTypeDistribution(houseData);

  return (
    <Layout>
      <div className="page-container">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your rental properties, tenants, and financial performance.
          </p>
        </div>
        
        <DashboardCards stats={stats} />
        <DashboardCharts 
          monthlyRevenue={monthlyRevenue} 
          propertyDistribution={propertyDistribution} 
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
