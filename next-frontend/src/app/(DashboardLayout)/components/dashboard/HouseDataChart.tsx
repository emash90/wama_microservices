'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface HouseDataChartProps {
  data?: {
    house_type: number;
    occupied: boolean;
    house_price: number;
  }[];
}

const HouseDataChart: React.FC<HouseDataChartProps> = ({ data = [] }) => {
  const theme = useTheme();

  // Calculate statistics for chart data
  const occupiedCount = data.filter((house) => house.occupied).length;
  const vacantCount = data.length - occupiedCount;
  const commercialCount = data.filter((house) => house.house_type === 1).length;
  const residentialCount = data.length - commercialCount;

  const hasData = data.length > 0;

  const maxValue = Math.max(occupiedCount, vacantCount, commercialCount, residentialCount, 8);

  const chartOptions = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      toolbar: { show: true },
      height: 427,
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main, '#FF5733', '#33FF57'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 1,
      },
    },
    xaxis: {
      categories: ['Occupied vs Vacant', 'Commercial vs Residential'],
    },
    yaxis: {
      max: maxValue,
      tickAmount: maxValue,
      labels: {
        formatter: (val: number) => Math.round(val).toString(),
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
  };

  const chartSeries = [
    {
      name: 'Occupied',
      data: [occupiedCount, 0],
    },
    {
      name: 'Vacant',
      data: [vacantCount, 0],
    },
    {
      name: 'Commercial',
      data: [0, commercialCount],
    },
    {
      name: 'Residential',
      data: [0, residentialCount],
    },
  ];

  return (
    <DashboardCard title="House Data">
      <Box>
        {hasData ? (
          <Chart options={chartOptions} series={chartSeries} type="bar" width="100%" height="426px" />
        ) : (
          <Typography align="center" color="textSecondary">
            No house data available.
          </Typography>
        )}
      </Box>
    </DashboardCard>
  );
};

export default HouseDataChart;