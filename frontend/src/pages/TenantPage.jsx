import React, { useEffect, useState } from 'react'
import ListTenants from '../components/Tenant/ListTenants'
import { fetchTenants } from '../services/tenantServices'
import { fetchHouses } from '../services/houseService'

const TenantPage = () => {
  const [tenants, setTenants] = useState()
  const [vacantHouses, setVacantHouses] = useState()

  //fetch tenants and empty houses
  useEffect(() => {
    const loadTenants = async () => {
      const data = await fetchTenants()
      setTenants(data)
    }
    const emptyHouses = async () => {
      const data = await fetchHouses()
      const emptyHouses = data.filter(house => house.occupied === false)
      setVacantHouses(emptyHouses)
    }
    loadTenants()
    emptyHouses()
  }, [])


  return (
    <div>
      <ListTenants tenants={tenants} setTenants={setTenants} vacantHouses={vacantHouses} />
    </div>
  )
}

export default TenantPage
