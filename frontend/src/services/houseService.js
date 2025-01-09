import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const HOUSE_API_URL = `${BASE_URL}/house`;

console.log("HOUSE_API_URL", HOUSE_API_URL);

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
    console.log("config ==>", config)

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Get all houses
const fetchHouses = async () => {
  try {
    const response = await axiosInstance.get(HOUSE_API_URL);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching houses:", error);
    return [];
  }
};

// Get tenant house details
const getHouseByTenantId = async (tenantId) => {
  try {
    // Implement the logic for getting house by tenant ID
  } catch (error) {
    console.error(`Error fetching house by tenant ID ${tenantId}:`, error);
  }
};

// Add house
const addHouse = async (house) => {
  try {
    const response = await axiosInstance.post(HOUSE_API_URL, house);
    return response.data;
  } catch (error) {
    console.error("Error adding house:", error);
  }
};

// Get house by ID
const fetchHouseById = async (houseId) => {
  try {
    const response = await axiosInstance.get(`${HOUSE_API_URL}/${houseId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching house with ID ${houseId}:`, error);
    return null;
  }
};

// Update house
const updateHouse = async (houseId, house) => {
  try {
    const response = await axiosInstance.put(`${HOUSE_API_URL}/${houseId}`, house);
    return response.data;
  } catch (error) {
    console.error(`Error updating house with ID ${houseId}:`, error);
  }
};

export { fetchHouses, addHouse, fetchHouseById, updateHouse };
