import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL|| 'http://localhost:4000'

const USER_API_URL = `${BASE_URL}/user`

console.log("USER_API_URL", USER_API_URL)

//login user

const loginUser = async (user) => {
    try {
        const response = await axios.post(`${USER_API_URL}/login`, user)
        console.log("response", response.data)
        return response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        return [];
      }
}

//register user

const registerUser = async (user) => {
    try {
        const response = await axios.post(`${USER_API_URL}/register`, user);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
    }
}

//get all users

const fetchUsers = async () => {
    try {
        const response = await axios.get(USER_API_URL);
        console.log("response", response)
        return response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        return [];
      }
    };



//get user by ID

const fetchUserById = async (userId) => {
    try {
        const response = await axios.get(`${USER_API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        return null;
    }
}

//update house

const updateUser = async (userId, user) => {
    try {
        const response = await axios.put(`${USER_API_URL}/${userId}`, user);
        return response.data;
    } catch (error) {
        console.error(`Error updating user with ID ${userId}:`, error);
    }
}

export { loginUser, fetchUsers, registerUser, fetchUserById, updateUser }