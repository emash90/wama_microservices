import React, { useEffect } from "react";
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

interface Tenant {
  name: string;
  email: string;
  phone: string;
  house_assigned: string;
}

interface AddTenantModalProps {
  open: boolean;
  onClose: () => void;
  setTenants: React.Dispatch<React.SetStateAction<Tenant[]>>;
  houses: string[]; // Array of available house numbers
}

const AddTenantModal: React.FC<AddTenantModalProps> = ({ open, onClose, setTenants, houses }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Tenant>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      house_assigned: "",
    },
  });

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

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
                name="name"
                control={control}
                rules={{ required: "Tenant name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    fullWidth
                    margin="dense"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" } }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    margin="dense"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "Phone number is required", pattern: { value: /^\d{10}$/, message: "Invalid phone number" } }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    fullWidth
                    margin="dense"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="house_assigned"
                control={control}
                rules={{ required: "Please assign a house" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Assign House"
                    fullWidth
                    margin="dense"
                    error={!!errors.house_assigned}
                    helperText={errors.house_assigned?.message}
                    required
                  >
                    {houses.map((house) => (
                      <MenuItem key={house} value={house}>
                        {house}
                      </MenuItem>
                    ))}
                  </TextField>
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
