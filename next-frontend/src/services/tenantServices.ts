import axios, { AxiosInstance, AxiosResponse } from 'axios';
import getAuthToken from '@/utils/getAuthToken';
import { TENANT_API_URL } from '@/config/config';


// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const TENANT_API_URL: string = `${BASE_URL}/tenant`;


// Function to get the token from localStorage
// const getAuthToken = (): string | null => {
//   return localStorage.getItem('token');
// };

// Define the Tenant type
interface Tenant {
  _id: string,
  tenant_first_name: string,
  tenant_last_name: string,
  tenant_phone: string,
  tenant_house_id: string,
  tenant_email: string,
  tenant_rent: number,
  active: boolean,
  balance: number,
  createdAt: string,
  updatedAt: string,
}

// Create an axios instance to add the Authorization header for each request
const axiosInstance: AxiosInstance = axios.create();

// Interceptor to add the token to headers of each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Get all tenants
const fetchTenants = async (): Promise<Tenant[]> => {
  try {
    const response: AxiosResponse<Tenant[]> = await axiosInstance.get(TENANT_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tenants:', error);
    return [];
  }
};

// Add tenant
const addTenant = async (tenant: Tenant): Promise<Tenant> => {
  try {
    const response: AxiosResponse<Tenant> = await axiosInstance.post(TENANT_API_URL, tenant);
    return response.data;
  } catch (error: any) {
    console.error("Error adding tenant:", error);
    throw new Error(error.response?.data?.message || "Failed to add tenant.");
  }
};


// Get tenant by ID
const fetchTenantById = async (tenantId: string): Promise<Tenant | null> => {
  try {
    const response: AxiosResponse<Tenant> = await axiosInstance.get(`${TENANT_API_URL}/${tenantId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching tenant with ID ${tenantId}:`, error);
    return null;
  }
};

// Update tenant
const updateTenant = async (tenantId: string, tenant: Tenant): Promise<Tenant | undefined> => {
  try {
    const response: AxiosResponse<Tenant> = await axiosInstance.put(`${TENANT_API_URL}/${tenantId}`, tenant);
    return response.data;
  } catch (error) {
    console.error(`Error updating tenant with ID ${tenantId}:`, error);
  }
};

export { fetchTenants, addTenant, fetchTenantById, updateTenant };
export type { Tenant };