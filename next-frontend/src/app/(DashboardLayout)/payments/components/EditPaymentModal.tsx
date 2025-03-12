"use client";

import React, { useState, useEffect } from "react";
import type { Tenant, Payment } from "@/types";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";

interface EditPaymentModalProps {
  open: boolean;
  onClose: () => void;
  payment: Payment | null;
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
  tenants: Tenant[];
}

const EditPaymentModal: React.FC<EditPaymentModalProps> = ({
  open,
  onClose,
  payment,
  setPayments,
  tenants,
}) => {
  const initialFormState: Payment = {
    _id: "",
    tenant_id: "",
    house_id: "",
    amount_due: 0,
    amount_paid: 0,
    balance: 0,
    date_paid: "",
    full_payment: false,
    payment_mode: "",
    month: "",
  };

  const [formData, setFormData] = useState<Payment>(initialFormState);

  useEffect(() => {
    if (payment) {
      setFormData(payment);
    }
  }, [payment]);

  useEffect(() => {
    if (formData.tenant_id) {
      const selectedTenant = tenants.find((t) => t._id === formData.tenant_id);
      if (selectedTenant) {
        setFormData((prev) => ({
          ...prev,
          house_id: selectedTenant.tenant_house_id,
          tenant_house_number: selectedTenant.house_number,
          amount_due: Number(selectedTenant.tenant_rent), // Ensure it's a number
          balance: Number(selectedTenant.tenant_rent) - Number(prev.amount_paid || 0), // Ensure it's a number
        }));
      }
    }
  }, [formData.tenant_id, tenants]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target as HTMLInputElement | { name: string; value: string };
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFullPaymentChange = () => {
    setFormData((prev) => {
      const fullPayment = !prev.full_payment;
      const amountPaid = fullPayment ? prev.amount_due : 0;
      const balance = fullPayment ? 0 : prev.amount_due;
      return { ...prev, full_payment: fullPayment, amount_paid: amountPaid, balance };
    });
  };

  const handleAmountPaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amountPaid = parseFloat(e.target.value) || 0;
    const balance = formData.amount_due - amountPaid;
    setFormData((prev) => ({
      ...prev,
      amount_paid: amountPaid,
      balance,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/payments/${formData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to update payment");

      setPayments((prev) => prev.map((p) => (p._id === formData._id ? formData : p)));
      handleClose();
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  const handleClose = () => {
    setFormData(initialFormState);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box p={3} bgcolor="white" width={500} mx="auto" mt={5} borderRadius={2} maxHeight="90vh" overflow="auto">
        <Typography variant="h6" mb={2}>
          Edit Payment
        </Typography>
        <FormControl fullWidth margin="dense">
          <InputLabel>Select Tenant</InputLabel>
          <Select name="tenant_id" value={formData.tenant_id} onChange={handleChange}>
            {tenants.map((tenant) => (
              <MenuItem key={tenant._id} value={tenant._id}>
                {tenant.tenant_first_name} {tenant.tenant_last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="dense"
          label="Amount Paid"
          name="amount_paid"
          type="number"
          value={formData.amount_paid}
          onChange={handleAmountPaidChange}
        />
        <FormControlLabel
          control={<Checkbox checked={formData.full_payment} onChange={handleFullPaymentChange} />}
          label="Full Payment"
        />
        <TextField fullWidth margin="dense" label="Balance" name="balance" value={formData.balance} disabled />
        <TextField
          fullWidth
          margin="dense"
          label="Date Paid"
          name="date_paid"
          type="date"
          value={formData.date_paid}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Payment Mode"
          name="payment_mode"
          value={formData.payment_mode}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
};

export default EditPaymentModal;
