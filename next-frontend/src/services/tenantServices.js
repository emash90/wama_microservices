import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL|| 'http://localhost:4000'

const TENANT_API_URL = `${BASE_URL}/tenant`

// console.log("TENANT_API_URL", TENANT_API_URL)

// Function to get the token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('authToken'); // Retrieves the stored token
  };
  
  // Create an axios instance to add the Authorization header for each request
  const axiosInstance = axios.create();
  
  // Interceptor to add the token to headers of each request
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers['authorization'] = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

//get all tenants

const fetchTenants = async () => {
    try {
        const response = await axiosInstance.get(TENANT_API_URL);
        // console.log("response", response)
        return response.data;
      } catch (error) {
        console.error("Error fetching tenants:", error);
        return [];
      }
    };

//add tenant

const addTenant = async (tenant) => {
    try {
        const response = await axiosInstance.post(TENANT_API_URL, tenant);
        return response;
    } catch (error) {
        console.error("Error adding tenant:", error);
        return error.response
    }
}

//get tenant by ID

const fetchTenantById = async (tenantId) => {
    try {
        const response = await axiosInstance.get(`${TENANT_API_URL}/${tenantId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching tenant with ID ${tenantId}:`, error);
        return null;
    }
}

//update tenant

const updateTenant = async (tenantId, tenant) => {
    try {
        const response = await axiosInstance.put(`${TENANT_API_URL}/${tenantId}`, tenant);
        return response.data;
    } catch (error) {
        console.error(`Error updating tenant with ID ${tenantId}:`, error);
    }
}

export { fetchTenants, addTenant, fetchTenantById, updateTenant }