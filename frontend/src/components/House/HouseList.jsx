import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Paper 
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const HouseList = ({ houses }) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const [selectedHouse, setSelectedHouse] = useState(null);
  
    const handleMenuOpen = (event, house) => {
      setAnchorEl(event.currentTarget);
      setSelectedHouse(house);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      setSelectedHouse(null);
    };

    const handleView = () => {
        //TODO: handle view more details on selected house
        console.log("handleView clicked", 'house is', selectedHouse )
        handleMenuClose();
    }
    const handleEdit = () => {
        //TODO: handle edit selected house
        console.log("handleEdit clicked for house", selectedHouse)
        handleMenuClose();
    }
    const handleDelete = () => {
        //TODO: handle delete selected house
        console.log("delete house", selectedHouse)
        handleMenuClose();
    }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="house list table">
        <TableHead>
          <TableRow>
            <TableCell>House Number</TableCell>
            <TableCell>House Location</TableCell>
            <TableCell>Price ($)</TableCell>
            <TableCell>Occupied</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {houses?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No houses available.
              </TableCell>
            </TableRow>
          ) : (
            houses?.map((house) => (
              <TableRow key={house._id}>
                <TableCell>{house.house_number}</TableCell>
                <TableCell>{house.house_location}</TableCell>
                <TableCell>{house.house_price}</TableCell>
                <TableCell>{house.occupied ? 'Occupied' : 'Vacant'}</TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleMenuOpen(event, house)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleView}>View Details</MenuItem>
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HouseList;
