import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchHouseById } from '../../services/houseService'

const HouseDetails = () => {
    const [houseDetails, setHouseDetails] = useState()
    const id = useParams()
    console.log("params", id)
    useEffect(() => {
        const getOneHouse = async() => {
            const response = await fetchHouseById(id)
            console.log("Response", response)
            setHouseDetails(response)
        }
        getOneHouse()
    }, [houseDetails])
    console.log("details", houseDetails)
  return (
    <div>
      <h2>house number: {houseDetails.house_number}</h2>
    </div>
  )
}

export default HouseDetails
