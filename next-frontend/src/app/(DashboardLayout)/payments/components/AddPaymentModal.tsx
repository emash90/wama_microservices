"use client";

import React, { useState, useEffect } from "react";
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
  SelectChangeEvent
} from "@mui/material";

interface Tenant {
  _id: string;
  tenant_first_name: string;
  tenant_last_name: string;
  tenant_house_id: string;
  house_number: string;
  tenant_rent: number;
}

interface AddPaymentModalProps {
  open: boolean;
  onClose: () => void;
  tenants: Tenant[];
  onAddPayment: (payment: any) => void;
}

const AddPaymentModal: React.FC<AddPaymentModalProps> = ({ open, onClose, tenants, onAddPayment }) => {
  const initialFormState = {
    tenant_id: "",
    house_id: "",
    tenant_house_number: "",
    amount_due: "",
    amount_paid: "",
    balance: "",
    date_paid: "",
    payment_mode: "",
    full_payment: false,
    month: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (formData.tenant_id) {
      const selectedTenant = tenants.find((t) => t._id === formData.tenant_id);
      if (selectedTenant) {
        setFormData((prev) => ({
          ...prev,
          house_id: selectedTenant.tenant_house_id,
          tenant_house_number: selectedTenant.house_number,
          amount_due: selectedTenant.tenant_rent.toString(),
          balance: selectedTenant.tenant_rent.toString(),
        }));
      }
    }
  }, [formData.tenant_id, tenants]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target as HTMLInputElement | { name: string; value: string };
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFullPaymentChange = () => {
    setFormData((prev) => {
      const fullPayment = !prev.full_payment;
      const amountPaid = fullPayment ? prev.amount_due : "";
      const balance = fullPayment ? "0" : prev.amount_due;
      return { ...prev, full_payment: fullPayment, amount_paid: amountPaid, balance };
    });
  };

  const handleAmountPaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amountPaid = e.target.value;
    const balance = (parseFloat(formData.amount_due) - parseFloat(amountPaid || "0")).toString();
    setFormData((prev) => ({ ...prev, amount_paid: amountPaid, balance }));
  };

  const handleSubmit = () => {
    onAddPayment(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData(initialFormState);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        p={3}
        bgcolor="white"
        width={500}
        mx="auto"
        mt={5}
        borderRadius={2}
        maxHeight="90vh"
        overflow="auto"
      >
        <Typography variant="h6" mb={2}>
          Add Payment
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
        <TextField label="House Number" value={formData.tenant_house_number} fullWidth disabled margin="dense" />
        <TextField label="Amount Due" value={formData.amount_due} fullWidth disabled margin="dense" />
        <FormControlLabel
          control={<Checkbox checked={formData.full_payment} onChange={handleFullPaymentChange} />}
          label="Full Payment"
        />
        <TextField
          label="Amount Paid"
          name="amount_paid"
          value={formData.amount_paid}
          onChange={handleAmountPaidChange}
          fullWidth
          margin="dense"
          disabled={formData.full_payment}
        />
        <TextField label="Balance" value={formData.balance} fullWidth disabled margin="dense" />
        <TextField
          label="Date Paid"
          type="date"
          name="date_paid"
          value={formData.date_paid}
          onChange={handleChange}
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Payment Mode</InputLabel>
          <Select name="payment_mode" value={formData.payment_mode} onChange={handleChange}>
            <MenuItem value="mpesa">Mpesa</MenuItem>
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Month" name="month" value={formData.month} onChange={handleChange} fullWidth margin="dense" />
        
        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth sx={{ mt: 2 }}>
          Submit Payment
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose} fullWidth sx={{ mt: 1 }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default AddPaymentModal;
