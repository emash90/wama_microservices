"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Tenant } from "@/types";

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
import AddTenantModal from "@/app/(DashboardLayout)/tenants/components/AddTenantModal";
import EditTenantModal from "@/app/(DashboardLayout)/tenants/components/EditTenantModal";
import { updateTenant } from "@/services/tenantServices";


interface VacantHouse {
  _id: string,
  house_number: string,
  house_type: number,
  house_location: string,
  house_price: number,
  occupied: boolean,
}

interface ListTenantsProps {
  tenants: Tenant[];
  vacantHouses: VacantHouse[];
  setTenants: React.Dispatch<React.SetStateAction<Tenant[]>>;
}

const ListTenants: React.FC<ListTenantsProps> = ({ tenants, setTenants, vacantHouses }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [search, setSearch] = useState({ name: "", house: "" });

  // Open menu for a specific tenant
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, tenant: Tenant) => {
    setAnchorEl((prev) => ({ ...prev, [tenant._id]: event.currentTarget }));
    setSelectedTenant(tenant);
  };

  // Close menu
  const handleMenuClose = (tenantId: string) => {
    setAnchorEl((prev) => ({ ...prev, [tenantId]: null }));
  };

  // View Tenant
  const handleView = () => {
    if (selectedTenant) {
      router.push(`/tenant/${selectedTenant._id}`);
    }
    handleMenuClose(selectedTenant?._id || "");
  };

  // Edit Tenant
  const handleEdit = () => {
    setShowEditModal(true);
    handleMenuClose(selectedTenant?._id || "");
  };

  // Delete Tenant
  const handleDelete = async () => {
    if (!selectedTenant) return;
    try {
      const inctiveTenant = { ...selectedTenant, active: false };
      await updateTenant(selectedTenant._id, inctiveTenant)
      setTenants((prev) => prev.filter((tenant) => tenant._id !== selectedTenant._id));
    } catch (error) {
      console.error("Error deleting tenant:", error);
    }
    handleMenuClose(selectedTenant._id);
  };

  // Define tenant table columns
  const columns: GridColDef[] = [
    { field: "tenant_first_name", headerName: "First Name", width: 150 },
    { field: "tenant_last_name", headerName: "Last Name", width: 150 },
    { field: "tenant_phone", headerName: "Phone", width: 100 },
    { field: "tenant_email", headerName: "Email", width: 150 },
    { field: "tenant_house", headerName: "House Number", width: 50 },
    { field: "createdAt", headerName: "Lease Start", width: 100 },
    { field: "tenant_rent", headerName: "House Rent", width: 100, type: "number"},
    { field: "balance", headerName: "Balance", width: 100, type: "number"},
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      renderCell: (params) => (
        <>
          <IconButton onClick={(e) => handleMenuOpen(e, params.row as Tenant)}>
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
        <Typography variant="h4">Tenants List</Typography>
        <Button variant="contained" color="primary" onClick={() => setShowAddModal(true)}>
          Add Tenant
        </Button>
      </Box>
      <div style={{ height: 450, width: "100%" }}>
        <DataGrid
          rows={tenants}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          pagination
          getRowId={(row) => row._id}
        />
      </div>

      <AddTenantModal open={showAddModal} onClose={() => setShowAddModal(false)} setTenants={setTenants} houses={vacantHouses} />
      <EditTenantModal open={showEditModal} onClose={() => setShowEditModal(false)} tenant={selectedTenant} setTenants={setTenants} />
    </Container>
  );
};

export default ListTenants;
