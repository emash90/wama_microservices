import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL|| 'http://localhost:4000'

const TENANT_API_URL = `${BASE_URL}/tenant`

console.log("TENANT_API_URL", TENANT_API_URL)

//get all tenants

const fetchTenants = async () => {
    try {
        const response = await axios.get(TENANT_API_URL);
        console.log("response", response)
        return response.data;
      } catch (error) {
        console.error("Error fetching tenants:", error);
        return [];
      }
    };

//add tenant

const addTenant = async (tenant) => {
    try {
        const response = await axios.post(TENANT_API_URL, tenant);
        return response.data;
    } catch (error) {
        console.error("Error adding tenant:", error);
    }
}

//get tenant by ID

const fetchTenantById = async (tenantId) => {
    try {
        const response = await axios.get(`${TENANT_API_URL}/${tenantId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching tenant with ID ${tenantId}:`, error);
        return null;
    }
}

//update tenant

const updateTenant = async (tenantId, tenant) => {
    try {
        const response = await axios.put(`${TENANT_API_URL}/${tenantId}`, tenant);
        return response.data;
    } catch (error) {
        console.error(`Error updating tenant with ID ${tenantId}:`, error);
    }
}

export { fetchTenants, addTenant, fetchTenantById, updateTenant }