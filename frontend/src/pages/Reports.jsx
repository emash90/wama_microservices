import React, { useState, useEffect } from 'react'
import MonthlyReports from '../components/reports/MonthlyReports'
import { fetchHouses } from '../services/houseService';
import { fetchTenants } from '../services/tenantServices';
import { fetchPayments } from '../services/paymentService';

const Reports = () => {
    const [houses, setHouses] = useState([]);
    const [tenants, setTenants] = useState([]);
    const [payments, setPayments] = useState([]);
  
    // Function to fetch all houses
    const fetchData = async () => {
      try {
        const house_resp = await fetchHouses();
        const tenant_resp = await fetchTenants();
        const payment_resp = await fetchPayments()
        setHouses(house_resp); 
        setTenants(tenant_resp); 
        setPayments(payment_resp)
        console.log('Fetched Houses:', house_resp);
        console.log('Fetched tenants:', tenant_resp);
        console.log('Fetched payments:', payment_resp);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };
  
    // Fetch houses when component is mounted
    useEffect(() => {
      fetchData();
    }, []);
  return (
    <MonthlyReports tenants={tenants} houses={houses} payments={payments} />
  )
}

export default Reports
