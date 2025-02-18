"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Button,
  Menu,
  MenuItem,
  TextField,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddHouseModal from "@/app/(DashboardLayout)/houses/components/AddHouseModal";
import EditHouseModal from "@/app/(DashboardLayout)/houses/components/EditHouseModal";

interface House {
  _id: string;
  house_number: string;
  house_location: string;
  house_price: number;
  house_type: number;
  occupied: boolean;
}

interface ListHousesProps {
  houses: House[];
  setHouses: React.Dispatch<React.SetStateAction<House[]>>;
}

const ListHouses: React.FC<ListHousesProps> = ({ houses, setHouses }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [search, setSearch] = useState({ number: "", location: "" });
  // Open menu for a specific house
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, house: House) => {
    setAnchorEl((prev) => ({ ...prev, [house._id]: event.currentTarget }));
    setSelectedHouse(house);
  };

  // Close menu
  const handleMenuClose = (houseId: string) => {
    setAnchorEl((prev) => ({ ...prev, [houseId]: null }));
  };

  // View House
  const handleView = () => {
    if (selectedHouse) {
      router.push(`/house/${selectedHouse._id}`);
    }
    handleMenuClose(selectedHouse?._id || "");
  };

  // Edit House
  const handleEdit = () => {
    setShowEditModal(true);
    handleMenuClose(selectedHouse?._id || "");
  };

  // Delete House
  const handleDelete = async () => {
    if (!selectedHouse) return;
    try {
      await fetch(`/api/houses/${selectedHouse._id}`, { method: "DELETE" });
      setHouses((prev) => prev.filter((house) => house._id !== selectedHouse._id));
    } catch (error) {
      console.error("Error deleting house:", error);
    }
    handleMenuClose(selectedHouse._id);
  };



  const columns: GridColDef[] = [
    { field: "house_number", headerName: "House Number", width: 150 },
    { field: "house_location", headerName: "Location", width: 150 },
    { field: "house_price", headerName: "Price", width: 150, type: "number" },
    {
      field: "house_type",
      headerName: "Type",
      width: 250,
        valueGetter: (value) =>(value === 0 ? "Residential" : "Cormercial")
    },
    {
      field: "occupied",
      headerName: "Status",
      width: 150,
      valueGetter: (value) => (value ? "Occupied" : "Vacant"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      renderCell: (params) => (
        <>
          <IconButton onClick={(e) => handleMenuOpen(e, params.row as House)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl[params.row._id]}
            open={Boolean(anchorEl[params.row._id])}
            onClose={() => handleMenuClose(params.row._id)}
          >
            <MenuItem onClick={handleView}>View</MenuItem>
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Houses List</Typography>
        <Button variant="contained" color="primary" onClick={() => setShowAddModal(true)}>
          Add House
        </Button>
      </Box>
      <div style={{ height: 450, width: "100%" }}>
        <DataGrid
          rows={houses}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          pagination
          getRowId={(row) => row._id}
        />
      </div>

      <AddHouseModal open={showAddModal} onClose={() => setShowAddModal(false)} setHouses={setHouses} />
      <EditHouseModal open={showEditModal} onClose={() => setShowEditModal(false)} house={selectedHouse} setHouses={setHouses} />
    </Container>
  );
};

export default ListHouses;