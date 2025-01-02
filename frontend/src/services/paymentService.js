import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL|| 'http://localhost:4000'

const PAYMENT_API_URL = `${BASE_URL}/payment`

console.log("PAYMENT_API_URL", PAYMENT_API_URL)

//get all payments

const fetchPayments = async () => {
    try {
        const response = await axios.get(PAYMENT_API_URL);
        console.log("response", response)
        return response.data;
      } catch (error) {
        console.error("Error fetching payments:", error);
        return [];
      }
    };

//add payment

const addPayment = async (payment) => {
    try {
        const response = await axios.post(PAYMENT_API_URL, payment);
        return response.data;
    } catch (error) {
        console.error("Error adding payment:", error);
    }
}

//get payment by ID

const fetchPaymentById = async (paymentId) => {
    try {
        const response = await axios.get(`${PAYMENT_API_URL}/${paymentId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching payment with ID ${paymentId}:`, error);
        return null;
    }
}

//update payment

const updatePayment = async (paymentId, payment) => {
    try {
        const response = await axios.put(`${PAYMENT_API_URL}/${paymentId}`, payment);
        return response.data;
    } catch (error) {
        console.error(`Error updating payment with ID ${paymentId}:`, error);
    }
}

export { fetchPayments, addPayment, fetchPaymentById, updatePayment }