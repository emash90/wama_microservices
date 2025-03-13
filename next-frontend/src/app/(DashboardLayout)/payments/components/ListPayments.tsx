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
import { addPayment, updatePayment } from "@/services/paymentService";
import type { Tenant, Payment } from '@/types';


// interface Payment {
//   _id: string;
//   tenant_id: string;
//   house_id: string;
//   amount_paid: number;
//   date_paid: string;
//   month: string;
//   status?: string;
//   tenantDetails?: {
//     tenant_first_name: string;
//     tenant_last_name: string;
//   };
//   houseDetails?: {
//     house_number: string;
//   };
// }

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
    setAnchorEl((prev) => ({ ...prev, [payment._id ?? ""]: event.currentTarget }));
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

  const onAddPayment = async (payment: Payment) => {
    try {
      const newPayment = await addPayment(payment);
      if (newPayment) {
        setPayments((prev) => [newPayment, ...prev]);
      }
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding payment:", error);
    }
    handleMenuClose(selectedPayment?._id || "");
  }

  const confirmPayment = async () => {
    if (!selectedPayment) return;
  
    const updatedPayment = { ...selectedPayment, status: "confirmed" };
  
    try {
      const response = await updatePayment(updatedPayment._id || "", updatedPayment);
  
      if (response) {
        setPayments((prev) =>
          prev.map((payment) =>
            payment._id === updatedPayment._id ? updatedPayment : payment
          )
        );
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
    }
  
    handleMenuClose(selectedPayment?._id || "");
  };
  



  // const handleDelete = async () => {
  //   if (!selectedPayment) return;
  //   try {
  //     await fetch(`/api/payments/${selectedPayment._id}`, { method: "DELETE" });
  //     setPayments((prev) => prev.filter((payment) => payment._id !== selectedPayment._id));
  //   } catch (error) {
  //     console.error("Error deleting payment:", error);
  //   }
  //   handleMenuClose(selectedPayment?._id || "");
  // };

  const filteredPayments = payments.filter(
    (payment) =>
      (payment.tenantDetails?.tenant_first_name.toLowerCase().includes(search.name.toLowerCase()) ||
       payment.tenantDetails?.tenant_last_name.toLowerCase().includes(search.name.toLowerCase())) &&
      payment.houseDetails?.house_number.toLowerCase().includes(search.house.toLowerCase())
  );

  const columns: GridColDef[] = [
    {
      field: "tenantDetails",
      headerName: "Tenant Name",
      width: 250,
      valueGetter: (params: any) => {
        return `${params.tenant_first_name || ""} ${params.tenant_last_name || ""}`;
      },
    },
    {
      field: "houseDetails",
      headerName: "House Number",
      width: 100,
      valueGetter: (params: any) => {
        return params.house_number || "";
      },
    },
    { field: "amount_paid", headerName: "Amount Paid", width: 150 },
    { field: "date_paid", headerName: "Date Paid", width: 150 },
    { field: "month", headerName: "Month", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const payment = params.row as Payment;
        return (
          <>
            <IconButton onClick={(event) => handleMenuOpen(event, payment)}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl[payment._id || ""]}
              open={Boolean(anchorEl[payment._id || ""])}
              onClose={() => handleMenuClose(payment._id || "")}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleView}>View</MenuItem>
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={confirmPayment} disabled={payment.status === "confirmed"}>Confirm Payment</MenuItem>
              {/* <MenuItem onClick={handleDelete}>Delete</MenuItem> */}
            </Menu>
          </>
        );
      },
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

      <Box display="flex" gap={2} mb={2}>
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
      </Box>

      <div style={{ height: 450, width: "100%" }}>
        <DataGrid
          rows= {filteredPayments}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          pagination
          getRowId={(row) => row._id}
        />
      </div>

      <AddPaymentModal open={showAddModal} onClose={() => setShowAddModal(false)} setPayments={setPayments} tenants={tenants} onAddPayment={onAddPayment} />
      {}
      <EditPaymentModal open={showEditModal} onClose={() => setShowEditModal(false)} payment={selectedPayment} tenants={tenants} setPayments={setPayments} />
    </Container>
  );
};

export default ListPayments;
