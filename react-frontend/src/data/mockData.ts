
// export interface House {
//   id: string;
//   houseNumber: string;
//   type: 'Residential' | 'Commercial';
//   status: 'Vacant' | 'Occupied';
//   tenantId: string | null;
//   rent: number;
//   address: string;
// }

export interface RealHouse {
  _id: string;
  house_number: string;
  house_location: string;
  house_price: number;
  house_type: number;
  occupied: boolean;
  tenantId?: string;
  tenant_first_name?: string;
  tenant_last_name?: string;
  tenant_phone?: string;
  tenant_email?: string;
}

export interface Tenant {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: 'Residential' | 'Commercial';
  status: 'Active' | 'Inactive';
  houseId: string | null;
  balance: number;
  moveInDate: string;
}

export interface RealTenant {
  _id: string;
  tenant_first_name: string;
  tenant_last_name: string;
  tenant_phone: string;
  tenant_house_id: string;
  house_type?: number;
  tenant_house?: string;
  house_id?: string;
  tenant_email: string;
  tenant_rent: number;
  active: boolean;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  tenantId: string;
  houseId: string;
  amount: number;
  date: string;
  status: 'Received' | 'Confirmed' | 'Pending';
  method: 'Cash' | 'Bank Transfer' | 'Check' | 'Credit Card';
  reference: string;
}

export interface RealPayment {
  _id?: string; // Optional because it may not exist for new payments
  tenant_id?: string;
  house_id?: string;
  tenant_house_number?: string; // Optional field
  amount_due: number;
  amount_paid: number;
  balance: number;
  date_paid?: string;
  full_payment?: boolean;
  payment_mode?: string;
  month?: string;
  status?: string; // Optional field
  createdAt?: string; // Optional field
  updatedAt?: string; // Optional field
  tenantDetails?: {
    tenant_first_name: string;
    tenant_last_name: string;
  };
  houseDetails?: {
    house_number: string;
  };
}


// Dashboard Stats
export const getDashboardStats = (houses: RealHouse[], tenants: RealTenant[], payments: RealPayment[]) => {
  const totalHouses = houses.length;
  const occupiedHouses = houses.filter(house => house.occupied).length;
  const vacantHouses = totalHouses - occupiedHouses;

  const residentialHouses = houses.filter(house => house.house_type === 1);
  const commercialHouses = houses.filter(house => house.house_type === 2);

  const totalResidentialHouses = residentialHouses.length;
  const totalCommercialHouses = commercialHouses.length;

  const vacantResidentialHouses = residentialHouses.filter(house => !house.occupied).length;
  const vacantCommercialHouses = commercialHouses.filter(house => !house.occupied).length;

  const totalTenants = tenants.length;
  const activeTenants = tenants.filter(tenant => tenant.active).length;
  const residentialTenants = tenants.filter(tenant => tenant.house_type === 1).length;
  const commercialTenants = tenants.filter(tenant => tenant.house_type === 2).length;

  const totalPayments = payments.length;
  const confirmedPayments = payments.filter(payment => payment.status === 'confirmed').length;
  const pendingPayments = payments.filter(payment => payment.status !== 'confirmed');

  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount_paid, 0);
  const pendingRevenue = pendingPayments.reduce((sum, payment) => sum + payment.amount_paid, 0);

  return {
    houses: {
      total: totalHouses,
      occupied: occupiedHouses,
      vacant: vacantHouses,
      residential: totalResidentialHouses,
      commercial: totalCommercialHouses,
      vacantResidential: vacantResidentialHouses,
      vacantCommercial: vacantCommercialHouses,
      occupancyRate: totalHouses > 0 ? Math.round((occupiedHouses / totalHouses) * 100) : 0,
    },
    tenants: {
      total: totalTenants,
      active: activeTenants,
      residential: residentialTenants,
      commercial: commercialTenants,
    },
    payments: {
      total: totalPayments,
      confirmed: confirmedPayments,
      pending: pendingPayments.length,
      totalRevenue,
      pendingRevenue,
      received: totalRevenue - pendingRevenue,
    },
  };
};


// Helper to filter payments by month
export const getPaymentsByMonth = (payments: RealPayment[], month: number, year: number) => {
  return payments.filter(payment => {
    const paymentDate = new Date(payment.date_paid);
    return paymentDate.getMonth() === month && paymentDate.getFullYear() === year;
  });
};

// Monthly revenue data for charts
export const getMonthlyRevenue = (payments: RealPayment[]) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentYear = new Date().getFullYear();
  
  // Initialize with zeros
  const monthlyData = monthNames.map(name => ({ name, amount: 0 }));
  
  // Fill in actual data
  payments.forEach(payment => {
    const paymentDate = new Date(payment.date_paid);
    if (paymentDate.getFullYear() === currentYear && payment.status !== 'Pending') {
      const monthIndex = paymentDate.getMonth();
      monthlyData[monthIndex].amount += payment.amount_paid;
    }
  });
  
  return monthlyData;
};

// Property type distribution for charts
export const getPropertyTypeDistribution = (houses: RealHouse[]) => {
  const residential = houses.filter(house => house.house_type == 1).length;
  const commercial = houses.filter(house => house.house_type == 2).length;
  
  return [
    { name: 'Residential', value: residential },
    { name: 'Commercial', value: commercial }
  ];
};
