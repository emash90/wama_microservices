import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper 
} from '@mui/material';

const HouseList = ({ houses }) => {
    console.log("houses", houses)
  return (
    <TableContainer component={Paper}>
      <Table aria-label="house list table">
        <TableHead>
          <TableRow>
            <TableCell>House Number</TableCell>
            <TableCell>House Location</TableCell>
            <TableCell>Price ($)</TableCell>
            <TableCell>Occupied</TableCell>
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
              <TableRow key={house.id}>
                <TableCell>{house.house_number}</TableCell>
                <TableCell>{house.house_location}</TableCell>
                <TableCell>{house.house_price}</TableCell>
                <TableCell>{house.occupied ? 'Occupied' : 'Vacant'}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HouseList;
