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
import AddTenantModal from "@/app/(DashboardLayout)/tenants/components/AddTenantModal";
import EditTenantModal from "@/app/(DashboardLayout)/tenants/components/EditTenantModal";

interface Tenant {
  _id: string;
  name: string;
  phone: string;
  email: string;
  house_number: string;
  lease_start: string;
  lease_end: string;
}

interface ListTenantsProps {
  tenants: Tenant[];
  vacantHouses: vacantHouses[];
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
      await fetch(`/api/tenants/${selectedTenant._id}`, { method: "DELETE" });
      setTenants((prev) => prev.filter((tenant) => tenant._id !== selectedTenant._id));
    } catch (error) {
      console.error("Error deleting tenant:", error);
    }
    handleMenuClose(selectedTenant._id);
  };

  // Define tenant table columns
  const columns: GridColDef[] = [
    { field: "tenant_first_name", headerName: "Name", width: 150 },
    { field: "tenant_phone", headerName: "Phone", width: 150 },
    { field: "tenant_email", headerName: "Email", width: 150 },
    { field: "tenant_house_id", headerName: "House Number", width: 150 },
    { field: "createdAt", headerName: "Lease Start", width: 150 },
    { field: "balance", headerName: "Balance", width: 150 },
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
