
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import PaymentsTable from '../components/payments/PaymentsTable';
import { RealPayment as Payment, RealTenant as Tenant } from '../data/mockData';
import { addPayment, fetchPayments } from '@/services/paymentService';
import { fetchTenants } from '@/services/tenantService';

const Payments: React.FC = () => {

  const [paymentData, setPaymentData] = useState<Payment[]>([]);
  const [tenantData, setTenantData] = useState<Tenant[]>([]);

  useEffect(() => {
    const fecthData = async () => {
      const resp = await Promise.all([
        fetchPayments(),
        fetchTenants()
      ])
      console.log("resp", resp)
      setPaymentData(resp[0])
      setTenantData(resp[1])
    }
    fecthData()
  }, [])


  const onAddPayment = async (data) => {
    try {
      const response = await addPayment(data)
      setPaymentData([response, ...paymentData])
    } catch (error) {
      console.log(error)

    }
  }

  return (
    <Layout>
      <div className="page-container">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage all rent payments for your properties.
          </p>
        </div>
        
        <PaymentsTable payments={paymentData} setPaymentData={setPaymentData} tenantData={tenantData} onAddPayment={onAddPayment} />
      </div>
    </Layout>
  );
};

export default Payments;
