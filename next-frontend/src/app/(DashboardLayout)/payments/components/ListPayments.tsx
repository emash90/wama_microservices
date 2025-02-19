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
  Box,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddPaymentModal from "./AddPaymentModal";
import EditPaymentModal from "./EditPaymentModal";

interface Payment {
    _id: string;
    tenant_id: string;
    house_id: string;
    amount_due: number;
    amount_paid: number;
    balance: number;
    date_paid: string;
    full_payment: boolean;
    payment_mode: string;
    month: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

interface ListPaymentsProps {
  payments: Payment[];
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
  tenants: any[]; 
}

const ListPayments: React.FC<ListPaymentsProps> = ({ payments, setPayments, tenants }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [search, setSearch] = useState({ name: "", house: "" });

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, payment: Payment) => {
    setAnchorEl((prev) => ({ ...prev, [payment._id]: event.currentTarget }));
    setSelectedPayment(payment);
  };

  const handleMenuClose = (paymentId: string) => {
    setAnchorEl((prev) => ({ ...prev, [paymentId]: null }));
  };

  const handleView = () => {
    if (selectedPayment) {
      router.push(`/payment/${selectedPayment._id}`);
    }
    handleMenuClose(selectedPayment?._id || "");
  };

  const handleEdit = () => {
    setShowEditModal(true);
    handleMenuClose(selectedPayment?._id || "");
  };

  const handleDelete = async () => {
    if (!selectedPayment) return;
    try {
      await fetch(`/api/payments/${selectedPayment._id}`, { method: "DELETE" });
      setPayments((prev) => prev.filter((payment) => payment._id !== selectedPayment._id));
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
    handleMenuClose(selectedPayment._id);
  };

//   const filteredPayments = payments.filter(
//     (payment) =>
//       payment.tenant_name.toLowerCase().includes(search.name.toLowerCase()) &&
//       payment.tenant_house_number.toLowerCase().includes(search.house.toLowerCase())
//   );

  const columns: GridColDef[] = [
    { field: "tenant_name", headerName: "Tenant Name", width: 200 },
    { field: "tenant_house_number", headerName: "House Number", width: 150 },
    { field: "amount_paid", headerName: "Amount Paid", width: 150, type: "number" },
    { field: "date_paid", headerName: "Date Paid", width: 150 },
    { field: "balance", headerName: "Balance", width: 180, type: "number" },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton onClick={(e) => handleMenuOpen(e, params.row as Payment)}>
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
        <Typography variant="h4">Payments List</Typography>
        <Button variant="contained" color="primary" onClick={() => setShowAddModal(true)}>
          Add Payment
        </Button>
      </Box>
      {/* <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={search.name}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
        />
        <TextField
          label="Search by House Number"
          variant="outlined"
          value={search.house}
          onChange={(e) => setSearch({ ...search, house: e.target.value })}
        />
      </Box> */}
      <div style={{ height: 450, width: "100%" }}>
        <DataGrid
          rows={payments}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          pagination
          getRowId={(row) => row._id}
        />
      </div>
      {/* <AddPaymentModal open={showAddModal} onClose={() => setShowAddModal(false)} setPayments={setPayments} tenants={tenants} />
      <EditPaymentModal open={showEditModal} onClose={() => setShowEditModal(false)} payment={selectedPayment} setPayments={setPayments} /> */}
    </Container>
  );
};

export default ListPayments;
