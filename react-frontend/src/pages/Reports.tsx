
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import ReportsGenerator from '../components/reports/ReportsGenerator';
import { RealPayment as Payment } from '../data/mockData';
import { fetchPayments } from '@/services/paymentService';

const Reports: React.FC = () => {

  const [paymentData, setPaymentData] = useState<Payment[]>([]);
  useEffect(() => {
    const getPayments = async () => {
      const resp = await fetchPayments();
      setPaymentData(resp);
    }
    getPayments();
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
        
        <ReportsGenerator payments={paymentData} />
      </div>
    </Layout>
  );
};

export default Reports;
