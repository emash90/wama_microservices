export interface Tenant {
    _id: string;
    tenant_first_name: string;
    tenant_last_name: string;
    tenant_phone: string;
    tenant_house_id: string;
    house_number?: string;
    tenant_house?: string;
    house_id?: string;
    tenant_email: string;
    tenant_rent: number;
    active: boolean;
    balance: number;
    createdAt: string;
    updatedAt: string;
  }
  