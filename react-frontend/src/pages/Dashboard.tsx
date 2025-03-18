
import React from 'react';
import Layout from '../components/layout/Layout';
import DashboardCards from '../components/dashboard/DashboardCards';
import DashboardCharts from '../components/dashboard/DashboardCharts';
import { getDashboardStats, getMonthlyRevenue, getPropertyTypeDistribution } from '../data/mockData';

const Dashboard: React.FC = () => {
  const stats = getDashboardStats();
  const monthlyRevenue = getMonthlyRevenue();
  const propertyDistribution = getPropertyTypeDistribution();

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
