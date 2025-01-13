import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CDBContainer, CDBRow, CDBCol, CDBCard, CDBCardBody, CDBDataTable, CDBBtn } from 'cdbreact';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import AddHouseModal from './AddHouseModal';
import EditHouseModal from './EditHouseModal';


const HouseList = ({ houses, viewHouse, setHouses }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);



  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedHouse(null);
  }

  useEffect(() => {
    if (houses) {
      setLoading(false);
    }
  }, [houses]);

  const handleMenuOpen = (event, house) => {
    setAnchorEl(event.currentTarget);
    setSelectedHouse(house);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleView = () => {
    navigate(`/house/${selectedHouse._id}`);
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

  const data = () => {
    return {
      columns: [
        { label: 'House Number', field: 'house_number', width: 150 },
        { label: 'Location', field: 'house_location', width: 150 },
        { label: 'Price', field: 'house_price', width: 150 },
        { label: 'House Type', field: 'house_type', width: 150 },
        { label: 'Status', field: 'occupied', width: 150 },
        { label: 'Actions', field: 'actions', width: 150 }
      ],
      rows: houses.map((house) => {
        return {
          house_number: house.house_number,
          house_location: house.house_location,
          house_price: house.house_price,
          house_type: house.house_type === 1 ? 'Residential' : 'Commercial',
          occupied: house.occupied ? 'Occupied' : 'Vacant',
          actions: (
            <CDBBtn color="info" size="sm" className="mr-2">
              <MoreVertIcon
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={(e) => handleMenuOpen(e, house)}
              />
              </CDBBtn>
          ),
        };
      }),
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <CDBContainer>
      <CDBRow className="mb-4">
        <CDBCol>
          <h2>Houses List</h2>
        </CDBCol>
        <CDBCol className="text-end" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CDBBtn color="primary" onClick={() => handleShowAddModal()}>
            Add House
          </CDBBtn>
        </CDBCol>
      </CDBRow>
      <CDBRow>
        <CDBCol>
          <CDBCard>
            <CDBCardBody style={{ maxHeight: '380px', overflowY: 'auto' }} >
              <CDBDataTable
                striped
                bordered
                hover
                responsive
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
    </CDBContainer>
    <AddHouseModal show={showAddModal} onClose={handleCloseAddModal} setHouses={setHouses} />
    <EditHouseModal show={showEditModal} onClose={handleCloseEditModal} house={selectedHouse} setHouses={setHouses} />
    </>
  );
};

export default HouseList;
