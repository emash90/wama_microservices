"use client";

import React, { useState, useEffect } from "react";
import { RealPayment as Payment, RealTenant as Tenant } from "@/data/mockData";
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

interface AddPaymentModalProps {
  open: boolean;
  onClose: () => void;
  tenantData: Tenant[];
  setPaymentData: React.Dispatch<React.SetStateAction<any[]>>;
  onAddPayment: (payment: any) => void;
}

const AddPaymentModal: React.FC<AddPaymentModalProps> = ({ open, onClose, tenantData, setPaymentData, onAddPayment }) => {
  const initialFormState: Payment = {
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
    if (formData.tenant_id) {
      const selectedTenant = tenantData.find((t) => t._id === formData.tenant_id);
      console.log("selectedTenant:", selectedTenant)
      if (selectedTenant) {
        setFormData((prev) => ({
          ...prev,
          house_id: selectedTenant.house_id || "",
          tenant_house_number: selectedTenant.tenant_house,
          amount_due: selectedTenant.balance,
          balance: selectedTenant.balance,
        }));
      }
    }
  }, [formData.tenant_id, tenantData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target as HTMLInputElement | { name: string; value: string };
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFullPaymentChange = () => {
    setFormData((prev) => {
      const fullPayment = !prev.full_payment;
      const amountPaid = fullPayment ? prev.amount_due : 0; // Ensure this is a number
      const balance = fullPayment ? 0 : prev.amount_due; // Ensure this is a number
      return { ...prev, full_payment: fullPayment, amount_paid: amountPaid, balance };
    });
  };

  const handleAmountPaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amountPaid = parseFloat(e.target.value) || 0; // Ensure this is a number
    const balance = formData.amount_due - amountPaid || 0; // Ensure this is a number
    setFormData((prev) => ({ ...prev, amount_paid: amountPaid, balance }));
  };

  const handleSubmit = () => {
    onAddPayment(formData);
    setPaymentData((prev) => [formData, ...prev]);
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
            {tenantData.map((tenant) => (
              <MenuItem key={tenant._id} value={tenant._id}>
                {tenant.tenant_first_name} {tenant.tenant_last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField label="House Number" value={formData.tenant_house_number} fullWidth disabled margin="dense" InputLabelProps={{ shrink: Boolean(formData.tenant_house_number) }}  />
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
        <FormControl fullWidth margin="dense">
          <InputLabel>Month</InputLabel>
          <Select name="month" value={formData.month} onChange={handleChange}>
            <MenuItem value="January">January</MenuItem>
            <MenuItem value="February">February</MenuItem>
            <MenuItem value="March">March</MenuItem>
            <MenuItem value="April">April</MenuItem>
            <MenuItem value="May">May</MenuItem>
            <MenuItem value="June">June</MenuItem>
            <MenuItem value="July">July</MenuItem>
            <MenuItem value="August">August</MenuItem>
            <MenuItem value="September">September</MenuItem>
            <MenuItem value="October">October</MenuItem>
            <MenuItem value="November">November</MenuItem>
            <MenuItem value="December">December</MenuItem>
          </Select>
        </FormControl>
        
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