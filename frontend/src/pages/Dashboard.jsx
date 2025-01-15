import React, { useState, useEffect } from 'react';
import { CDBContainer, CDBRow, CDBCol } from 'cdbreact';
import HouseReports from '../components/reports/HouseReports';
import TenantReports from '../components/reports/TenantReports';
import { fetchHouses } from '../services/houseService';
import { fetchTenants } from '../services/tenantServices';
import PaymentReports from '../components/reports/PaymentReports';
import { fetchPayments } from '../services/paymentService';

const Dashboard = () => {
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
      // console.log('Fetched Houses:', house_resp);
      // console.log('Fetched Houses:', tenant_resp);
      // console.log('Fetched payments:', payment_resp);
    } catch (error) {
      console.error('Error fetching houses:', error);
    }
  };

  // Fetch houses when component is mounted
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this runs only once when mounted

  return (
    <CDBContainer style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      <CDBRow>
        <CDBCol md="6">
          <HouseReports houses={houses} />
        </CDBCol>
        <CDBCol md="6">
          <TenantReports tenants={tenants} />
        </CDBCol>
      </CDBRow>
      <CDBRow>
        <CDBCol md="6">
            <PaymentReports payments={payments} />
          </CDBCol>
      </CDBRow>
    </CDBContainer>
  );
};

export default Dashboard;
