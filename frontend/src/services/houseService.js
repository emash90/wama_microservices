import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL|| 'http://localhost:4000'

const HOUSE_API_URL = `${BASE_URL}/house`

console.log("HOUSE_API_URL", HOUSE_API_URL)

//get all houses

const fetchHouses = async () => {
    try {
        const response = await axios.get(HOUSE_API_URL);
        console.log("response", response)
        return response.data;
      } catch (error) {
        console.error("Error fetching houses:", error);
        return [];
      }
    };

//add house

const addHouse = async (house) => {
    try {
        const response = await axios.post(HOUSE_API_URL, house);
        return response.data;
    } catch (error) {
        console.error("Error adding house:", error);
    }
}

//get house by ID

const fetchHouseById = async (houseId) => {
    try {
        const response = await axios.get(`${HOUSE_API_URL}/${houseId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching house with ID ${houseId}:`, error);
        return null;
    }
}

//update house

const updateHouse = async (houseId, house) => {
    try {
        const response = await axios.put(`${HOUSE_API_URL}/${houseId}`, house);
        return response.data;
    } catch (error) {
        console.error(`Error updating house with ID ${houseId}:`, error);
    }
}

export { fetchHouses, addHouse, fetchHouseById, updateHouse }