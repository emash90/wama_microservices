import React from 'react';
import { CDBContainer, CDBRow, CDBCol, CDBCard, CDBCardBody } from 'cdbreact';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const PaymentReports = ({ payments }) => {
  const totalPayments = payments.length;
  const paidPayments = payments.filter((payment) => payment.status === 'confirmed').length;
  const pendingPayments = payments.filter((payment) => payment.status === 'pending').length;

  const totalRevenue = payments.reduce((sum, payment) => sum + (payment.amount_paid || 0), 0);

  const pieData = {
    labels: ['Confirmed Payments', 'Pending Payments'],
    datasets: [
      {
        data: [paidPayments, pendingPayments],
        backgroundColor: ['#4CAF50', '#FFC107'],
        hoverBackgroundColor: ['#45a049', '#ffb300'],
      },
    ],
  };

  const barData = {
    labels: ['Total Revenue', 'Paid Payments'],
    datasets: [
      {
        label: 'Revenue Distribution',
        data: [totalRevenue, payments.filter((p) => p.status === 'confirmed').reduce((sum, p) => sum + (p.amount_paid || 0), 0)],
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
    <CDBContainer style={{ maxHeight: '80vh', overflowY: 'auto', marginBottom: '50px' }}>
      <CDBRow>
        <CDBCol>
          <h2>Payment Reports</h2>
        </CDBCol>
      </CDBRow>

      <CDBRow>
        <CDBCol>
          <CDBCard>
            <CDBCardBody>
              <h4>Total Payments: {totalPayments}</h4>
              <p>Confirmed Payments: {paidPayments} ({((paidPayments / totalPayments) * 100).toFixed(2)}%)</p>
              <p>Pending Payments: {pendingPayments} ({((pendingPayments / totalPayments) * 100).toFixed(2)}%)</p>
              <p>Total Revenue: Ksh.{totalRevenue.toFixed(2)}</p>
            </CDBCardBody>
          </CDBCard>
        </CDBCol>
      </CDBRow>

      <CDBRow className="mt-4">
        <CDBCol md="6">
          <CDBCard>
            <CDBCardBody>
              <h5>Paid vs Pending Payments</h5>
              <Pie data={pieData} options={pieOptions} />
            </CDBCardBody>
          </CDBCard>
        </CDBCol>
        <CDBCol md="6">
          <CDBCard>
            <CDBCardBody>
              <h5>Revenue Distribution</h5>
              <Bar data={barData} options={barOptions} />
            </CDBCardBody>
          </CDBCard>
        </CDBCol>
      </CDBRow>
    </CDBContainer>
  );
};

export default PaymentReports;
