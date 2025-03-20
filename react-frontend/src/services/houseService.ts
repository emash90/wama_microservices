import axios, { AxiosResponse } from 'axios';
import { RealHouse as House } from '@/data/mockData'
import getAuthToken from '@/lib/getAuthToken'
import { HOUSE_API_URL } from '@/config/config';



// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
// const HOUSE_API_URL: string = `${BASE_URL}/house`;

// Function to get the token from localStorage
// const getAuthToken = (): string | null => {
//   const token = getCookie('authToken');
//   return typeof token === 'string' ? token : null;
// };

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



// Get all houses
const fetchHouses = async (): Promise<House[]> => {
  try {
    const response: AxiosResponse<House[]> = await axiosInstance.get(HOUSE_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching houses:", error);
    return [];
  }
};

// Get house by ID
const fetchHouseById = async (houseId: string): Promise<House | null> => {
  try {
    const response: AxiosResponse<House> = await axiosInstance.get(`${HOUSE_API_URL}/${houseId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching house with ID ${houseId}:`, error);
    return null;
  }
};

// Add house
const addHouse = async (house: House): Promise<AxiosResponse | null> => {
  try {
    const response: AxiosResponse = await axiosInstance.post(HOUSE_API_URL, house);
    console.log("response", response);
    return response;
  } catch (error: any) {
    console.error("Error adding house:", error);
    return error.response;
  }
};

// Update house
const updateHouse = async (houseId: string, house: Partial<House>): Promise<House | null> => {
  try {
    const response: AxiosResponse<House> = await axiosInstance.put(`${HOUSE_API_URL}/${houseId}`, house);
    return response.data;
  } catch (error) {
    console.error(`Error updating house with ID ${houseId}:`, error);
    return null;
  }
};

//delete house
const deleteHouse = async (houseId: string): Promise<House | null> => {
  try {
    const response: AxiosResponse<House> = await axiosInstance.delete(`${HOUSE_API_URL}/${houseId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting house with ID ${houseId}:`, error);
    return null;
  }
}

export { fetchHouses, addHouse, fetchHouseById, updateHouse, deleteHouse };
export type { House };
