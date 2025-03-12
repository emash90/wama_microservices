import axios, { AxiosInstance } from 'axios';
import type { Payment } from '@/types'
import getAuthToken from '@/utils/getAuthToken';
import { PAYMENT_API_URL } from '@/config/config';



// // Function to get the token from localStorage
// const getAuthToken = (): string | null => {
//     return localStorage.getItem('authToken');
// };

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

// Define Payment type
// interface Payment {
//     id?: string;
//     amount: number;
//     date: string;
//     status: string;
//     method: string;
// }

// Get all payments
const fetchPayments = async (): Promise<Payment[]> => {
    try {
        const response = await axiosInstance.get<Payment[]>(PAYMENT_API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching payments:", error);
        return [];
    }
};

// Add payment
const addPayment = async (payment: Payment): Promise<Payment | null> => {
    try {
        const response = await axiosInstance.post<Payment>(PAYMENT_API_URL, payment);
        return response.data;
    } catch (error) {
        console.error("Error adding payment:", error);
        return null;
    }
};

// Get payment by ID
const fetchPaymentById = async (paymentId: string): Promise<Payment | null> => {
    try {
        const response = await axiosInstance.get<Payment>(`${PAYMENT_API_URL}/${paymentId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching payment with ID ${paymentId}:`, error);
        return null;
    }
};

// Update payment
const updatePayment = async (paymentId: string, payment: Partial<Payment>): Promise<Payment | null> => {
    try {
        const response = await axiosInstance.put<Payment>(`${PAYMENT_API_URL}/${paymentId}`, payment);
        return response.data;
    } catch (error) {
        console.error(`Error updating payment with ID ${paymentId}:`, error);
        return null;
    }
};

export { fetchPayments, addPayment, fetchPaymentById, updatePayment, };
export type { Payment };

