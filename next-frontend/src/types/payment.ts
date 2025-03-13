export interface Payment {
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