
import React from 'react';
import {
  Building,
  Users,
  CreditCard,
  Home,
  Store,
  UserCheck,
  DollarSign,
  CheckCircle,
  Clock
} from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
  className,
}) => {
  return (
    <div className={`bg-card rounded-xl shadow-sm p-6 card-hover ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`inline-flex items-center text-xs font-medium ${
                  trend === 'up' 
                    ? 'text-green-600' 
                    : trend === 'down' 
                    ? 'text-red-600' 
                    : 'text-muted-foreground'
                }`}
              >
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};

interface DashboardCardsProps {
  stats: {
    houses: {
      total: number;
      vacant: number;
      occupied: number;
      residential: number;
      commercial: number;
      occupancyRate: number;
    };
    tenants: {
      total: number;
      active: number;
      residential: number;
      commercial: number;
    };
    payments: {
      total: number;
      received: number;
      confirmed: number;
      pending: number;
      totalRevenue: number;
      pendingRevenue: number;
    };
  };
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ stats }) => {
  return (
    <div className="animate-slide-in">
      <h2 className="section-title">Property Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Properties"
          value={stats.houses.total}
          icon={<Building size={24} />}
          description={`${stats.houses.occupancyRate}% Occupancy Rate`}
        />
        <StatsCard
          title="Vacant Properties"
          value={stats.houses.vacant}
          icon={<Home size={24} />}
          description="Available for rent"
        />
        <StatsCard
          title="Residential Properties"
          value={stats.houses.residential}
          icon={<Home size={24} />}
        />
        <StatsCard
          title="Commercial Properties"
          value={stats.houses.commercial}
          icon={<Store size={24} />}
        />
      </div>

      <h2 className="section-title">Tenant Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Tenants"
          value={stats.tenants.total}
          icon={<Users size={24} />}
        />
        <StatsCard
          title="Residential Tenants"
          value={stats.tenants.residential}
          icon={<Users size={24} />}
        />
        <StatsCard
          title="Commercial Tenants"
          value={stats.tenants.commercial}
          icon={<UserCheck size={24} />}
        />
      </div>

      <h2 className="section-title">Payment Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={`$${stats.payments.totalRevenue.toLocaleString()}`}
          icon={<DollarSign size={24} />}
        />
        <StatsCard
          title="Received Payments"
          value={stats.payments.received}
          icon={<CreditCard size={24} />}
        />
        <StatsCard
          title="Confirmed Payments"
          value={stats.payments.confirmed}
          icon={<CheckCircle size={24} />}
        />
        <StatsCard
          title="Pending Payments"
          value={stats.payments.pending}
          icon={<Clock size={24} />}
          description={`$${stats.payments.pendingRevenue.toLocaleString()} pending`}
        />
      </div>
    </div>
  );
};

export default DashboardCards;
