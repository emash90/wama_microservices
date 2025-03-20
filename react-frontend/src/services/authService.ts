import axios, { AxiosResponse } from 'axios';
import { setCookie, deleteCookie } from "cookies-next";
import { USER_API_URL } from '@/config/config'


// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
// console.log("base url", BASE_URL)
// const USER_API_URL = `${BASE_URL}/user`;

interface User {
  id?: string;
  first_name: string;
  last_name: string;
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
const loginUser = async (user: { email: string; password: string }): Promise<{
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}> => {
  try {
    const response: AxiosResponse<any> = await axios.post(`${USER_API_URL}/login`, user);
    if (response.status === 200) {
      setCookie('authToken', response.data.token, { maxAge: 60 * 60 * 1, path: '/' });

      return {
        success: true,
        token: response.data.token,
        user: {
          email: response.data.email,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          role: response.data.role,
        },
      };
    }

    return { success: false, message: response.data?.message || "Login failed" };
  } catch (error: any) {
    console.error('Error logging in:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'An error occurred. Please try again.',
    };
  }
};

// Logout user (clear token from cookie)
const logoutUser = (): void => {
  deleteCookie('authToken');
  console.log("logged out")
  window.location.href = "/login";
};

// Register user

const registerUser = async (user: User): Promise<{
  success: boolean;
  data?: any;
  message?: string;
}> => {
  try {
    const response: AxiosResponse<ApiResponse<any>> = await axios.post(`${USER_API_URL}/register`, user);
    
    if (response.status === 201) {
      return { success: true, data: response.data, message: 'Registration successful!' };
    }

    return { success: false, data: null, message: 'Unexpected response from the server.' };
  } catch (error: any) {
    console.error('Error registering user:', error);

    const message = error.response?.data?.message || 'An error occurred while registering.';
    return { success: false, data: null, message };
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

export { loginUser, logoutUser, fetchUsers, registerUser, fetchUserById, updateUser, validateToken };