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
  CircularProgress,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { RealTenant as Tenant, RealHouse as House } from "@/data/mockData"
import { addTenant } from "@/services/tenantService";

interface AddTenantModalProps {
  open: boolean;
  onClose: () => void;
  setTenantsData: React.Dispatch<React.SetStateAction<Tenant[]>>;
  houses: House[];
}

const AddTenantModal: React.FC<AddTenantModalProps> = ({ open, onClose, setTenantsData, houses }) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
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
      balance: 0, // Ensure balance is in default values
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Watch house selection to dynamically update rent and balance
  const selectedHouseId = watch("tenant_house_id");

  useEffect(() => {
    if (!open) {
      reset();
      setError(null);
    }
  }, [open, reset]);

  useEffect(() => {
    const selectedHouse = houses.find((house) => house._id === selectedHouseId);
    if (selectedHouse) {
      const rent = selectedHouse.house_price;
      setValue("tenant_rent", rent);
      setValue("balance", rent * 2); // Tenant balance = House rent * 2
    }
  }, [selectedHouseId, houses, setValue]);

  const onSubmit = async (data: Tenant) => {
    setLoading(true);
    setError(null);

    try {
      const newTenant = await addTenant({
        ...data,
        active: data.active ?? true,
      });

      setTenantsData((prevTenants) => [newTenant, ...prevTenants]);
      reset();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">Add New Tenant</Typography>
      </DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
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
                  >
                    {houses.length > 0 ? (
                      houses.map((house) => (
                        <MenuItem key={house._id} value={house._id}>
                          {house.house_number}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">No houses available</MenuItem>
                    )}
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
            <Grid item xs={12}>
              <Controller
                name="balance"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Balance (Rent * 2)" fullWidth margin="dense" disabled />
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
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Add Tenant"}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default AddTenantModal;
