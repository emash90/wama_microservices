import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CDBContainer, CDBRow, CDBCol, CDBCard, CDBCardBody, CDBDataTable, CDBBtn } from 'cdbreact';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';


const HouseList = ({ houses, viewHouse }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState(null);

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
    setSelectedHouse(null);
  };

  const handleView = () => {
    navigate(`/house/${selectedHouse._id}`);
    handleMenuClose();
  };

  const handleEdit = () => {
    console.log("handleEdit clicked for house", selectedHouse);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log("delete house", selectedHouse);
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
            <MoreVertIcon
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={(e) => handleMenuOpen(e, house)}
            />
          ),
        };
      }),
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CDBContainer>
      <CDBRow className="mb-4">
        <CDBCol>
          <h2>Houses List</h2>
        </CDBCol>
        <CDBCol className="text-end" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CDBBtn color="primary" onClick={() => navigate('/house/add')}>
            Add House
          </CDBBtn>
        </CDBCol>
      </CDBRow>
      <CDBRow>
        <CDBCol>
          <CDBCard>
            <CDBCardBody>
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
  );
};

export default HouseList;
