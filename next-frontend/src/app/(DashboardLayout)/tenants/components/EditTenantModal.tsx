import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

interface Tenant {
  tenant_first_name: string;
  tenant_last_name: string;
  tenant_phone: string;
  tenant_email: string;
  tenant_rent: number;
  active: boolean;
}

interface EditTenantModalProps {
  open: boolean;
  onClose: () => void;
  tenant: Tenant | null;
  onUpdate: (updatedTenant: Tenant) => void;
}

const EditTenantModal: React.FC<EditTenantModalProps> = ({ open, onClose, tenant, onUpdate }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Tenant>({
    mode: "onBlur",
    defaultValues: tenant || {
      tenant_first_name: "",
      tenant_last_name: "",
      tenant_phone: "",
      tenant_email: "",
      tenant_rent: 0,
      active: true,
    },
  });

  useEffect(() => {
    if (tenant) {
      reset(tenant);
    }
  }, [tenant, reset]);

  const onSubmit = (data: Tenant) => {
    if (!isValid) return;
    onUpdate(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          Edit Tenant Details
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
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
                name="tenant_phone"
                control={control}
                rules={{ required: "Phone number is required" }}
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
            <Grid item xs={12} sm={6}>
              <Controller
                name="tenant_email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
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
                name="tenant_rent"
                control={control}
                rules={{ required: "Rent amount is required", min: { value: 1, message: "Must be greater than 0" } }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Rent Amount"
                    type="number"
                    fullWidth
                    margin="dense"
                    error={!!errors.tenant_rent}
                    helperText={errors.tenant_rent?.message}
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
          <Button onClick={onClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} color="primary" variant="contained">
            Update Tenant
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default EditTenantModal;
