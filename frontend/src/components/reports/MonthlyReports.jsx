import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Select, MenuItem, Typography, Card, CardContent, Grid } from '@mui/material';

const MonthlyReports = ({ houses, payments, tenants }) => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [finalizedMonth, setFinalizedMonth] = useState('');
  const [reportData, setReportData] = useState(null);

  const handleGenerateReports = () => {
    if (!selectedMonth) {
      toast.error('Please select a month.');
      return;
    }

    // Convert selected month to match the format in payment dates
    const monthIndex = new Date(`${selectedMonth} 1, 2025`).getMonth();
    const selectedPayments = payments.filter(
      (payment) =>
        new Date(payment.date_paid).getMonth() === monthIndex &&
        payment.status === 'confirmed'
    );

    const occupiedHouses = houses.filter((house) => house.occupied === true);
    const unoccupiedHouses = houses.filter((house) => house.occupied === false);

    const totalExpectedRent = occupiedHouses.reduce((sum, house) => sum + house.house_price, 0);
    const receivedRent = selectedPayments.reduce((sum, payment) => sum + payment.amount_paid, 0);

    const totalBalances = payments.reduce((sum, payment) => sum + (payment.balance || 0), 0);
    const pendingPayments = totalExpectedRent - receivedRent;

    const tenantsInOccupiedHouses = tenants.filter((tenant) =>
      occupiedHouses.some((house) => house._id === tenant.tenant_house_id)
    );

    const tenantsInUnoccupiedHouses = tenants.filter((tenant) =>
      unoccupiedHouses.some((house) => house._id === tenant.tenant_house_id)
    );

    const data = {
      totalExpectedRent,
      receivedRent,
      totalBalances,
      pendingPayments,
      occupiedHouses: occupiedHouses.length,
      unoccupiedHouses: unoccupiedHouses.length,
      totalTenants: tenants.length,
      tenantsInOccupiedHouses,
      tenantsInUnoccupiedHouses,
    };

    setReportData(data);
    setFinalizedMonth(selectedMonth); // Update the finalized month when reports are generated
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Reports Page
      </Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            displayEmpty
            fullWidth
            variant="outlined"
          >
            <MenuItem value="" disabled>
              --Select Month--
            </MenuItem>
            {[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ].map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateReports}
            
          >
            Generate Reports
          </Button>
        </Grid>
      </Grid>

      {reportData && (
        <Card style={{ marginTop: '2rem' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Report for {finalizedMonth}
            </Typography>
            <Typography>
              <strong>Total Expected Rent:</strong> ${reportData.totalExpectedRent.toFixed(2)}
            </Typography>
            <Typography>
              <strong>Received Rent:</strong> ${reportData.receivedRent.toFixed(2)}
            </Typography>
            <Typography>
              <strong>Total Balances:</strong> ${reportData.totalBalances.toFixed(2)}
            </Typography>
            <Typography>
              <strong>Pending Payments:</strong> ${reportData.pendingPayments.toFixed(2)}
            </Typography>
            <Typography>
              <strong>Occupied Houses:</strong> {reportData.occupiedHouses}
            </Typography>
            <Typography>
              <strong>Unoccupied Houses:</strong> {reportData.unoccupiedHouses}
            </Typography>
            <Typography>
              <strong>Total Tenants:</strong> {reportData.totalTenants}
            </Typography>

            <Typography variant="h6" style={{ marginTop: '1rem' }}>
              Tenants in Occupied Houses
            </Typography>
            {reportData.tenantsInOccupiedHouses.length > 0 ? (
              <ul>
                {reportData.tenantsInOccupiedHouses.map((tenant) => (
                  <li key={tenant._id}>
                    {tenant.name} (House ID: {tenant.house_id})
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No tenants in occupied houses.</Typography>
            )}

            <Typography variant="h6" style={{ marginTop: '1rem' }}>
              Tenants in Unoccupied Houses
            </Typography>
            {reportData.tenantsInUnoccupiedHouses.length > 0 ? (
              <ul>
                {reportData.tenantsInUnoccupiedHouses.map((tenant) => (
                  <li key={tenant._id}>
                    {tenant.tenant_first_name} (House ID: {tenant.house_id})
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No tenants in unoccupied houses.</Typography>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MonthlyReports;
