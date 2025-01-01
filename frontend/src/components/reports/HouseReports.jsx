import React from 'react';
import { CDBContainer, CDBRow, CDBCol, CDBCard, CDBCardBody } from 'cdbreact';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const HouseReports = ({ houses }) => {
  const totalHouses = houses.length;
  const vacantHouses = houses.filter((house) => !house.occupied).length;
  const occupiedHouses = houses.filter((house) => house.occupied).length;
  const residentialHouses = houses.filter((house) => house.house_type === 1).length;
  const commercialHouses = houses.filter((house) => house.house_type !== 1).length;

  const pieData = {
    labels: ['Occupied Houses', 'Vacant Houses'],
    datasets: [
      {
        data: [occupiedHouses, vacantHouses],
        backgroundColor: ['#4CAF50', '#FFC107'],
        hoverBackgroundColor: ['#45a049', '#ffb300'],
      },
    ],
  };

  const barData = {
    labels: ['Residential Houses', 'Commercial Houses'],
    datasets: [
      {
        label: 'House Types',
        data: [residentialHouses, commercialHouses],
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
    <CDBContainer style={{ maxHeight: '70vh', overflowY: 'auto' }}>
      <CDBRow>
        <CDBCol>
          <h2>House Reports</h2>
        </CDBCol>
      </CDBRow>

      <CDBRow>
        <CDBCol>
          <CDBCard>
            <CDBCardBody>
              <h4>Total Houses: {totalHouses}</h4>
              <p>Vacant Houses: {vacantHouses} ({((vacantHouses / totalHouses) * 100).toFixed(2)}%)</p>
              <p>Occupied Houses: {occupiedHouses} ({((occupiedHouses / totalHouses) * 100).toFixed(2)}%)</p>
              <p>Residential Houses: {residentialHouses} ({((residentialHouses / totalHouses) * 100).toFixed(2)}%)</p>
              <p>Commercial Houses: {commercialHouses} ({((commercialHouses / totalHouses) * 100).toFixed(2)}%)</p>
            </CDBCardBody>
          </CDBCard>
        </CDBCol>
      </CDBRow>

      <CDBRow className="mt-4">
        <CDBCol md="6">
          <CDBCard>
            <CDBCardBody>
              <h5>Occupied vs Vacant</h5>
              <Pie data={pieData} options={pieOptions} />
            </CDBCardBody>
          </CDBCard>
        </CDBCol>
        <CDBCol md="6">
          <CDBCard>
            <CDBCardBody>
              <h5>Residential vs Commercial</h5>
              <Bar data={barData} options={barOptions} />
            </CDBCardBody>
          </CDBCard>
        </CDBCol>
      </CDBRow>
    </CDBContainer>
  );
};

export default HouseReports;
