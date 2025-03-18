
export interface House {
  id: string;
  houseNumber: string;
  type: 'Residential' | 'Commercial';
  status: 'Vacant' | 'Occupied';
  tenantId: string | null;
  rent: number;
  address: string;
}

export interface RealHouse {
  _id: string;
  house_number: string;
  house_location: string;
  house_price: number;
  house_type: number;
  occupied: boolean;
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

// Mock Houses Data
export const houses: RealHouse[] = [
  {
    _id: "1",
    house_number: 'A101',
    house_type: 1,
    occupied: true,
    house_price: 1200,
    house_location: '123 Main St, City',
  },
  {
    _id: "2",
    house_number: 'A102',
    house_type: 1,
    occupied: false,
    house_price: 1300,
    house_location: '125 Main St, City',
  },
  {
    _id: '3',
    house_number: 'B201',
    house_type: 2,
    occupied: true,
    house_price: 2500,
    house_location: '500 Business Ave, City',
  },
  {
    _id: '4',
    house_number: 'B202',
    house_type: 2,
    occupied: true,
    house_price: 2200,
    house_location: '502 Business Ave, City',
  },
  {
    _id: '5',
    house_number: 'C301',
    house_type: 1,
    occupied: false,
    house_price: 1150,
    house_location: '200 Park Lane, City',
  },
  {
    _id: '6',
    house_number: 'C302',
    house_type: 1,
    occupied: true,
    house_price: 1250,
    house_location: '202 Park Lane, City',
  },
];

// Mock Tenants Data
export const tenants: RealTenant[] = [
  {
    _id: '1',
    tenant_first_name: 'John Doe',
    tenant_last_name: 'Doe',
    tenant_phone: '555-123-4567',
    tenant_email: 'john.doe@example.com',
    tenant_house: 'Residential',
    active: true,
    tenant_house_id: '1',
    tenant_rent: 1200,
    balance: 0,
    createdAt: '2023-01-15',
    updatedAt: '2023-01-15',
  },
  {
    _id: '2',
    tenant_first_name: 'Acme Corp',
    tenant_last_name: '',
    tenant_phone: '555-987-6543',
    tenant_email: 'contact@acmecorp.com',
    tenant_house: 'Commercial',
    active: true,
    tenant_rent: 2500,
    tenant_house_id: '3',
    balance: 500,
    createdAt: '2022-10-01',
    updatedAt: '2022-10-01',
  },
  {
    _id: '3',
    tenant_first_name: 'Global Services LLC',
    tenant_last_name: '',
    tenant_phone: '555-456-7890',
    tenant_email: 'info@globalservices.com',
    tenant_house: 'Commercial',
    active: false,
    tenant_house_id: '4',
    tenant_rent: 2200,
    balance: 0,
    createdAt: '2023-03-01',
    updatedAt: '2023-03-01',
  },
  {
    _id: '4',
    tenant_first_name: 'Jane Smith',
    tenant_last_name: '',
    tenant_phone: '555-789-0123',
    tenant_email: 'jane.smith@example.com',
    tenant_house: 'Residential',
    active: true,
    tenant_house_id: '6',
    tenant_rent: 1250,
    balance: 200,
    createdAt: '2023-02-10',
    updatedAt: '2023-02-10',
  },
];

// Mock Payments Data
export const payments: RealPayment[] = [
  {
    _id: '1',
    tenant_id: '1',
    house_id: '1',
    amount_paid: 1200,
    amount_due: 0,
    balance: 1200,
    date_paid: '2023-09-01',
    status: 'Confirmed',
    payment_mode: 'Cash',
    full_payment: true,
    createdAt: '2023-09-01',
    updatedAt: '2023-09-01',
    tenantDetails: {
      tenant_first_name: 'John',
      tenant_last_name: 'Doe',
    },
    houseDetails: {
      house_number: 'A101',
    },
  
  },
  {
    _id: '2',
    tenant_id: '2',
    house_id: '3',
    amount_paid: 2000,
    amount_due: 500,
    balance: 300,
    date_paid: '2023-09-02',
    status: 'Confirmed',
    payment_mode: 'Check',
    full_payment: false,
    createdAt: '2023-09-02',
    updatedAt: '2023-09-02',
    tenantDetails: {
      tenant_first_name: 'Acme',
      tenant_last_name: 'Corp',
    },
    houseDetails: {
      house_number: 'B201',
    },

  },
  {
    _id: '3',
    tenant_id: '3',
    house_id: '4',
    amount_paid: 2200,
    amount_due: 0,
    balance: 0,
    date_paid: '2023-09-05',
    status: 'Pending',
    payment_mode: 'Bank Transfer',
    full_payment: true,
    createdAt: '2023-09-01',
    updatedAt: '2023-09-05',
    tenantDetails: {
      tenant_first_name: 'Global',
      tenant_last_name: 'Services',
  },
  houseDetails: {
    house_number: 'B202',
  },
  },
  {
    _id: '4',
    tenant_id: '4',
    house_id: '6',
    amount_paid: 1000,
    amount_due: 200,
    balance: 100,
    date_paid: '2023-09-03',
    status: 'Confirmed',
    payment_mode: 'Credit Card',
    full_payment: false,
    createdAt: '2023-09-03',
    updatedAt: '2023-09-03',
    tenantDetails: {
      tenant_first_name: 'Jane',
      tenant_last_name: 'Smith',
    },
    houseDetails: {
      house_number: 'C302',
    },
  }
];

// Dashboard Stats
export const getDashboardStats = () => {
  const totalHouses = houses.length;
  const vacantHouses = houses.filter(house => house.occupied == true).length;
  const occupiedHouses = houses.filter(house => house.occupied == true).length;
  const residentialHouses = houses.filter(house => house.house_type == 1).length;
  const commercialHouses = houses.filter(house => house.house_type == 2).length;

  const totalTenants = tenants.length;
  const activeTenants = tenants.filter(tenant => tenant.active == true).length;
  const residentialTenants = tenants.filter(tenant => tenant.tenant_house === 'Residential').length;
  const commercialTenants = tenants.filter(tenant => tenant.tenant_house === 'Commercial').length;
  
  const totalPayments = payments.length;
  const receivedPayments = payments.length;
  const confirmedPayments = payments.filter(payment => payment.status === 'Confirmed').length;
  const pendingPayments = payments.filter(payment => payment.status === 'Pending').length;
  
  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount_paid, 0);
  const pendingRevenue = payments.filter(payment => payment.status === 'Pending')
    .reduce((sum, payment) => sum + payment.amount_paid, 0);

  return {
    houses: {
      total: totalHouses,
      vacant: vacantHouses,
      occupied: occupiedHouses,
      residential: residentialHouses,
      commercial: commercialHouses,
      occupancyRate: Math.round((occupiedHouses / totalHouses) * 100)
    },
    tenants: {
      total: totalTenants,
      active: activeTenants,
      residential: residentialTenants,
      commercial: commercialTenants
    },
    payments: {
      total: totalPayments,
      received: receivedPayments,
      confirmed: confirmedPayments,
      pending: pendingPayments,
      totalRevenue,
      pendingRevenue
    }
  };
};

// Helper to get tenant name by ID
export const getTenantById = (id: string | null) => {
  if (!id) return 'None';
  const tenant = tenants.find(tenant => tenant._id === id);
  return tenant ? tenant.tenant_first_name : 'Unknown';
};

// Helper to get house by ID
export const getHouseById = (id: string | null) => {
  if (!id) return null;
  return houses.find(house => house._id === id);
};

// Helper to filter payments by month
export const getPaymentsByMonth = (month: number, year: number) => {
  return payments.filter(payment => {
    const paymentDate = new Date(payment.date_paid);
    return paymentDate.getMonth() === month && paymentDate.getFullYear() === year;
  });
};

// Monthly revenue data for charts
export const getMonthlyRevenue = () => {
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
export const getPropertyTypeDistribution = () => {
  const residential = houses.filter(house => house.house_type == 1).length;
  const commercial = houses.filter(house => house.house_type == 2).length;
  
  return [
    { name: 'Residential', value: residential },
    { name: 'Commercial', value: commercial }
  ];
};
