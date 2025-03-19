
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

interface MonthlyRevenueProps {
  data: { name: string; amount: number }[];
}

export const MonthlyRevenueChart: React.FC<MonthlyRevenueProps> = ({ data }) => {
  return (
    <div className="h-80 bg-card p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-medium mb-4">Monthly Revenue</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }} 
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            tickFormatter={(value) => `$${value}`}
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={{ stroke: '#e5e7eb' }}
          />
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Revenue']}
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
              border: 'none'
            }}
          />
          <Bar 
            dataKey="amount" 
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

interface PropertyDistributionProps {
  data: { name: string; value: number }[];
}

export const PropertyDistributionChart: React.FC<PropertyDistributionProps> = ({ data }) => {
  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary-foreground))'];
  
  return (
    <div className="h-80 bg-card p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-medium mb-4">Property Type Distribution</h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            animationDuration={1500}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [value, 'Properties']}
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
              border: 'none'
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

interface DashboardChartsProps {
  monthlyRevenue: { name: string; amount: number }[];
  propertyDistribution: { name: string; value: number }[];
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ 
  monthlyRevenue, 
  propertyDistribution 
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 animate-slide-in">
      <MonthlyRevenueChart data={monthlyRevenue} />
      <PropertyDistributionChart data={propertyDistribution} />
    </div>
  );
};

export default DashboardCharts;
