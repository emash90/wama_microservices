import React, { useEffect, useState } from 'react'
import { CDBContainer, CDBRow, CDBCol, CDBCard, CDBCardBody, CDBDataTable, CDBBtn } from 'cdbreact';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddTenantModal from './AddTenantModal';


const ListTenants = ({ tenants, setTenants, vacantHouses }) => {
  console.log("tenants latest", tenants)
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  
 useEffect(() => {
    if (tenants) {
      setLoading(false);
    }
  }, [tenants]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  const data = () => {
    return {
        columns: [
            { label: 'First Name', field: 'tenant_first_name', width: 150 },
            { label: 'Last Name', field: 'tenant_last_name', width: 150 },
            { label: 'Phone Number', field: 'tenant_phone', width: 150 },
            { label: 'Tenant Rent', field: 'tenant_rent', width: 150 },
            { label: 'Tenant House', field: 'tenant_house', width: 150 },
            { label: 'Actions', field: 'actions', width: 150 }
        ],
        rows: tenants?.map(tenant => {
            return {
                tenant_first_name: `${tenant.tenant_first_name}`,
                tenant_last_name:  `${tenant.tenant_last_name}`,
                tenant_phone: tenant.tenant_phone,
                tenant_rent: tenant.tenant_rent,
                tenant_house: tenant.tenant_house,
                actions: <>
                    <CDBBtn color="info" size="sm" className="mr-2">
                        <MoreVertIcon
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={(e) => handleMenuOpen(e, tenant)}
                        />
                    </CDBBtn>
                </>
            }
        })
    }
}
  return (
    <>
    <CDBContainer>
              <CDBRow className="mb-4">
        <CDBCol>
          <h2>Tenant List</h2>
        </CDBCol>
        <CDBCol className="text-end" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CDBBtn color="primary" onClick={() => handleShowAddModal()}>
            Add Tenant
          </CDBBtn>
        </CDBCol>
      </CDBRow>
      <CDBRow>
        <CDBCol>
          <CDBCard>
            <CDBCardBody style={{ maxHeight: '380px', overflowY: 'auto' }}>
              <CDBDataTable
                striped
                bordered
                hover
                small
                data={data()}
              />
            </CDBCardBody>
          </CDBCard>
        </CDBCol>
      </CDBRow>
    </CDBContainer >
    <AddTenantModal show={showAddModal} onClose={handleCloseAddModal} vacantHouses={vacantHouses} setTenants={setTenants} />
    </>
  )
}

export default ListTenants
