import React, { useEffect, useState } from 'react'
import HouseList from '../components/House/HouseList'
import { fetchHouses } from '../services/houseService';

const HousePage = () => {
    const [houses, setHouses] = useState()
    useEffect(() => {
        const loadHouses = async () => {
          const data = await fetchHouses()
          console.log("data ===>", data)
          setHouses(data);
        };
        loadHouses();
      }, []);
  return (
    <div>
      <HouseList houses={houses} />
    </div>
  )
}

export default HousePage
