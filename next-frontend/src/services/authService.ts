import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:4000';
const USER_API_URL = `${BASE_URL}/user`;

interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role?: string;
}

interface AuthResponse {
  isValid: boolean;
}

interface ApiResponse<T> {
  data: T;
  status: number;
}

// Validate the token by calling the backend API
const validateToken = async (token: string): Promise<boolean> => {
  try {
    const response: AxiosResponse<AuthResponse> = await axios.post(`${USER_API_URL}/authenticate`, { token });
    return response.data.isValid;
  } catch (error) {
    console.error('Token validation failed', error);
    return false;
  }
};

// Login user
const loginUser = async (user: { email: string; password: string }): Promise<ApiResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await axios.post(`${USER_API_URL}/login`, user);
    return response;
  } catch (error: any) {
    console.error('Error logging in:', error);
    return error.response;
  }
};

// Register user
const registerUser = async (user: User): Promise<ApiResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await axios.post(`${USER_API_URL}/register`, user);
    return response;
  } catch (error: any) {
    console.error('Error registering user:', error);
    return error.response;
  }
};

// Get all users
const fetchUsers = async (): Promise<User[]> => {
  try {
    const response: AxiosResponse<User[]> = await axios.get(USER_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Get user by ID
const fetchUserById = async (userId: string): Promise<User | null> => {
  try {
    const response: AxiosResponse<User> = await axios.get(`${USER_API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    return null;
  }
};

// Update user
const updateUser = async (userId: string, user: Partial<User>): Promise<User | null> => {
  try {
    const response: AxiosResponse<User> = await axios.put(`${USER_API_URL}/${userId}`, user);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    return null;
  }
};

export { loginUser, fetchUsers, registerUser, fetchUserById, updateUser, validateToken };