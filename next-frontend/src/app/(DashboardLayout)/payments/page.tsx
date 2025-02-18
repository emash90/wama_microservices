"use client";
import { useState } from 'react';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import ListPayments from '@/app/(DashboardLayout)/payments/components/ListPayments';

interface Payment {
  _id: string;
  tenant_id: string;
  house_id: string;
  amount_due: number;
  amount_paid: number;
  balance: number;
  date_paid: string;
  full_payment: boolean;
  payment_mode: string;
  month: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Payment: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);

  const dummyPayments = [
    {
      "_id": "67b1a1af0b614a937be1d01",
      "tenant_id": "67aa1e291df76c3e24296441",
      "house_id": "67aa1ddb8ea32554177b27b1",
      "amount_due": 50000,
      "amount_paid": 50000,
      "balance": 0,
      "date_paid": "2025-01-05T00:00:00.000+00:00",
      "full_payment": true,
      "payment_mode": "Bank Transfer",
      "month": "January",
      "status": "confirmed",
      "createdAt": "2025-01-05T12:30:15.641+00:00",
      "updatedAt": "2025-01-05T12:31:00.271+00:00",
      "__v": 0
    },
    {
      "_id": "67b1a2bf0b614a937be1d02",
      "tenant_id": "67aa1e291df76c3e24296442",
      "house_id": "67aa1ddb8ea32554177b27b2",
      "amount_due": 45000,
      "amount_paid": 20000,
      "balance": 25000,
      "date_paid": "2025-01-10T00:00:00.000+00:00",
      "full_payment": false,
      "payment_mode": "Mpesa",
      "month": "January",
      "status": "pending",
      "createdAt": "2025-01-10T09:45:30.641+00:00",
      "updatedAt": "2025-01-10T09:50:00.271+00:00",
      "__v": 0
    },
    {
      "_id": "67b1a3cf0b614a937be1d03",
      "tenant_id": "67aa1e291df76c3e24296443",
      "house_id": "67aa1ddb8ea32554177b27b3",
      "amount_due": 55000,
      "amount_paid": 30000,
      "balance": 25000,
      "date_paid": "2025-02-05T00:00:00.000+00:00",
      "full_payment": false,
      "payment_mode": "Cash",
      "month": "February",
      "status": "pending",
      "createdAt": "2025-02-05T14:20:45.641+00:00",
      "updatedAt": "2025-02-05T14:25:00.271+00:00",
      "__v": 0
    },
    {
      "_id": "67b1a4df0b614a937be1d04",
      "tenant_id": "67aa1e291df76c3e24296444",
      "house_id": "67aa1ddb8ea32554177b27b4",
      "amount_due": 60000,
      "amount_paid": 60000,
      "balance": 0,
      "date_paid": "2025-02-10T00:00:00.000+00:00",
      "full_payment": true,
      "payment_mode": "Mpesa",
      "month": "February",
      "status": "confirmed",
      "createdAt": "2025-02-10T17:10:30.641+00:00",
      "updatedAt": "2025-02-10T17:15:00.271+00:00",
      "__v": 0
    },
    {
      "_id": "67b1a5ef0b614a937be1d05",
      "tenant_id": "67aa1e291df76c3e24296445",
      "house_id": "67aa1ddb8ea32554177b27b5",
      "amount_due": 50000,
      "amount_paid": 25000,
      "balance": 25000,
      "date_paid": "2025-03-01T00:00:00.000+00:00",
      "full_payment": false,
      "payment_mode": "Bank Transfer",
      "month": "March",
      "status": "pending",
      "createdAt": "2025-03-01T08:40:20.641+00:00",
      "updatedAt": "2025-03-01T08:45:00.271+00:00",
      "__v": 0
    }
  ]

  const dummyTenantData = [
    {
      _id: "67aa1e291df76c3e24296440",
      tenant_first_name: "Nyamiru",
      tenant_last_name: "Wameru",
      tenant_phone: "0722222222",
      tenant_house_id: "67aa1ddb8ea32554177b27a2",
      tenant_email: "rosekairu@gmail.com",
      tenant_rent: 45000,
      active: true,
      balance: 89980,
      createdAt: "2025-02-10T15:41:29.102+00:00",
      updatedAt: "2025-02-10T15:44:02.501+00:00",
      __v: 0,
    },
    {
      _id: "67aa1e291df76c3e24296441",
      tenant_first_name: "James",
      tenant_last_name: "Muriuki",
      tenant_phone: "0711111111",
      tenant_house_id: "67aa1ddb8ea32554177b27a3",
      tenant_email: "jamesmuriuki@gmail.com",
      tenant_rent: 60000,
      active: false,
      balance: 45000,
      createdAt: "2025-02-11T09:30:10.500+00:00",
      updatedAt: "2025-02-11T10:45:22.200+00:00",
      __v: 0,
    },
    {
      _id: "67aa1e291df76c3e24296442",
      tenant_first_name: "Angela",
      tenant_last_name: "Kamau",
      tenant_phone: "0733333333",
      tenant_house_id: "67aa1ddb8ea32554177b27a4",
      tenant_email: "angelakamau@gmail.com",
      tenant_rent: 30000,
      active: true,
      balance: 120000,
      createdAt: "2025-02-12T08:20:15.750+00:00",
      updatedAt: "2025-02-12T09:10:30.800+00:00",
      __v: 0,
    },
  ];
  
  return (
    <PageContainer title="Payments" description="this is the payments page">
      <DashboardCard>
        <Typography>
          <ListPayments payments={dummyPayments} tenants={dummyTenantData}/>
        </Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Payment;