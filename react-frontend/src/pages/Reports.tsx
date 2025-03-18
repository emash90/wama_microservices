
import React from 'react';
import Layout from '../components/layout/Layout';
import ReportsGenerator from '../components/reports/ReportsGenerator';
import { payments } from '../data/mockData';

const Reports: React.FC = () => {
  return (
    <Layout>
      <div className="page-container">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate financial and occupancy reports for your rental properties.
          </p>
        </div>
        
        <ReportsGenerator payments={payments} />
      </div>
    </Layout>
  );
};

export default Reports;
