import React from 'react';
import { CDBContainer, CDBRow, CDBCol, CDBCard, CDBCardBody } from 'cdbreact';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const TenantReports = ({ tenants }) => {
  const totalTenants = tenants.length;
  const activeTenants = tenants.filter((tenant) => tenant.active).length;
  const inactiveTenants = tenants.filter((tenant) => !tenant.active).length;
  const activeResidentialTenants = tenants.filter((tenant) => tenant.active && tenant.house_type === 1).length;
  const activeCommercialTenants = tenants.filter((tenant) => tenant.active && tenant.house_type === 2).length;

  const pieData = {
    labels: ['Active Tenants', 'Inactive Tenants'],
    datasets: [
      {
        data: [activeTenants, inactiveTenants],
        backgroundColor: ['#4CAF50', '#FFC107'],
        hoverBackgroundColor: ['#45a049', '#ffb300'],
      },
    ],
  };

  const barData = {
    labels: ['Active Residential Tenants', 'Active Commercial Tenants'],
    datasets: [
      {
        label: 'Tenant Type',
        data: [activeResidentialTenants, activeCommercialTenants],
        backgroundColor: ['#42A5F5', '#FF7043'],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  return (
    <CDBContainer style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      <CDBRow>
        <CDBCol>
          <h2>Tenant Reports</h2>
        </CDBCol>
      </CDBRow>

      <CDBRow>
        <CDBCol>
          <CDBCard>
            <CDBCardBody>
              <h4>Total Tenants: {totalTenants}</h4>
              <p>Active Tenants: {activeTenants} ({((activeTenants / totalTenants) * 100).toFixed(2)}%)</p>
              <p>Inactive Tenants: {inactiveTenants} ({((inactiveTenants / totalTenants) * 100).toFixed(2)}%)</p>
              <p>Active Residential Tenants: {activeResidentialTenants} ({((activeResidentialTenants / activeTenants) * 100).toFixed(2)}%)</p>
              <p>Active Commercial Tenants: {activeCommercialTenants} ({((activeCommercialTenants / activeTenants) * 100).toFixed(2)}%)</p>
            </CDBCardBody>
          </CDBCard>
        </CDBCol>
      </CDBRow>

      <CDBRow className="mt-4">
        <CDBCol md="6">
          <CDBCard>
            <CDBCardBody>
              <h5>Active vs Inactive Tenants</h5>
              <Pie data={pieData} options={pieOptions} />
            </CDBCardBody>
          </CDBCard>
        </CDBCol>
        <CDBCol md="6">
          <CDBCard>
            <CDBCardBody>
              <h5>Tenant Type Distribution</h5>
              <Bar data={barData} options={barOptions} />
            </CDBCardBody>
          </CDBCard>
        </CDBCol>
      </CDBRow>
    </CDBContainer>
  );
};

export default TenantReports;
