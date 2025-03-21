import React, { useEffect, useState } from 'react'
import HouseList from '../components/House/HouseList'
import { fetchHouses,fetchHouseById } from '../services/houseService';

const HousePage = () => {
    const [houses, setHouses] = useState()
    useEffect(() => {
        const loadHouses = async () => {
          const data = await fetchHouses()
          setHouses(data);
        };
        loadHouses();
      }, []);
    //define function to get house by Id
    const viewHouse = async(houseId) => {
        const response = await fetchHouseById(houseId);
    }
  return (
    <div>
      <HouseList houses={houses} viewHouse={viewHouse} setHouses={setHouses} />
    </div>
  )
}

export default HousePage
