import React, { useEffect, useState } from 'react'
import { CDBContainer, CDBRow, CDBCol, CDBCard, CDBCardBody, CDBDataTable, CDBBtn } from 'cdbreact';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddTenantModal from './AddTenantModal';
import EditTenantModal from './EditTenantModal'


const ListTenants = ({ tenants, setTenants, vacantHouses }) => {
  console.log("tenants latest", tenants)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTenant, setSelectedTenant] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false);

  

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedHouse(null);
  }
  
  const handleMenuOpen = (event, tenant) => {
    setAnchorEl(event.currentTarget);
    setSelectedTenant(tenant);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleView = () => {
    console.log("selected tenant", selectedTenant)
    navigate(`/tenant/${selectedTenant._id}`);
    handleMenuClose();
  };

  const handleEdit = () => {
    setShowEditModal(true);  
    handleMenuClose(); 
  };

  const handleDelete = () => {
    // TODO: Implement delete house
    handleMenuClose();
  };


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
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleView}>View</MenuItem>
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
    </CDBContainer >
    <AddTenantModal show={showAddModal} onClose={handleCloseAddModal} vacantHouses={vacantHouses} setTenants={setTenants} />
    <EditTenantModal show={showEditModal} onClose={handleCloseEditModal} tenant={selectedTenant} setTenants={setTenants} />
    </>
  )
}

export default ListTenants
