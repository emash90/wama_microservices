import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

interface House {
  _id: string;
  house_number: string;
  house_price: number;
}

interface Tenant {
  tenant_first_name: string;
  tenant_last_name: string;
  tenant_email: string;
  tenant_phone: string;
  tenant_house_id: string;
  tenant_rent: number;
}

interface AddTenantModalProps {
  open: boolean;
  onClose: () => void;
  setTenants: React.Dispatch<React.SetStateAction<Tenant[]>>;
  houses: House[];
}

const AddTenantModal: React.FC<AddTenantModalProps> = ({ open, onClose, setTenants, houses }) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<Tenant>({
    mode: "onBlur",
    defaultValues: {
      tenant_first_name: "",
      tenant_last_name: "",
      tenant_email: "",
      tenant_phone: "",
      tenant_house_id: "",
      tenant_rent: 0,
    },
  });

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const handleHouseSelection = (houseId: string) => {
    const selectedHouse = houses.find((house) => house._id === houseId);
    if (selectedHouse) {
      setValue("tenant_house_id", selectedHouse._id);
      setValue("tenant_rent", selectedHouse.house_price);
    }
  };

  const onSubmit = (data: Tenant) => {
    if (!isValid) return;
    setTenants((prevTenants) => [...prevTenants, data]);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          Add New Tenant
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="tenant_house_id"
                control={control}
                rules={{ required: "Please assign a house" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Assign House"
                    fullWidth
                    margin="dense"
                    error={!!errors.tenant_house_id}
                    helperText={errors.tenant_house_id?.message}
                    required
                    onChange={(e) => handleHouseSelection(e.target.value)}
                  >
                    {houses.map((house) => (
                      <MenuItem key={house._id} value={house._id}>
                        {house.house_number}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="tenant_rent"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Rent Amount" fullWidth margin="dense" disabled />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="tenant_first_name"
                control={control}
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    margin="dense"
                    error={!!errors.tenant_first_name}
                    helperText={errors.tenant_first_name?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="tenant_last_name"
                control={control}
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    margin="dense"
                    error={!!errors.tenant_last_name}
                    helperText={errors.tenant_last_name?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="tenant_email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    margin="dense"
                    error={!!errors.tenant_email}
                    helperText={errors.tenant_email?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="tenant_phone"
                control={control}
                rules={{ required: "Phone number is required", pattern: { value: /^\d{10}$/, message: "Invalid phone number" } }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    fullWidth
                    margin="dense"
                    error={!!errors.tenant_phone}
                    helperText={errors.tenant_phone?.message}
                    required
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={2} width="100%" justifyContent="flex-end" padding={2}>
          <Button
            onClick={() => {
              reset();
              onClose();
            }}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} color="primary" variant="contained">
            Add Tenant
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default AddTenantModal;
