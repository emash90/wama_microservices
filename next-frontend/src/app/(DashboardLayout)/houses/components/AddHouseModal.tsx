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

interface House {
  house_number: string;
  house_location: string;
  house_price: number;
  house_type: number;
  occupied: boolean;
}

interface AddHouseModalProps {
  open: boolean;
  onClose: () => void;
  setHouses: React.Dispatch<React.SetStateAction<House[]>>;
}

const locations = ["New York", "Los Angeles", "Chicago", "Houston", "San Francisco"];

const AddHouseModal: React.FC<AddHouseModalProps> = ({ open, onClose, setHouses }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<House>({
    mode: "onBlur",
    defaultValues: {
      house_number: "",
      house_location: locations[0],
      house_price: 0,
      house_type: 1,
      occupied: false,
    },
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const onSubmit = (data: House) => {
    if (!isValid) return;
    setHouses((prevHouses) => [...prevHouses, { ...data, house_type: Number(data.house_type), occupied: false }]);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          Add New House
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="house_number"
                control={control}
                rules={{ required: "House number is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="House Number"
                    fullWidth
                    margin="dense"
                    error={!!errors.house_number}
                    helperText={errors.house_number?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="house_location"
                control={control}
                rules={{ required: "Location is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Location"
                    fullWidth
                    margin="dense"
                    error={!!errors.house_location}
                    helperText={errors.house_location?.message}
                    required
                  >
                    {locations.map((location) => (
                      <MenuItem key={location} value={location}>
                        {location}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="house_price"
                control={control}
                rules={{
                  required: "Price is required",
                  min: { value: 1, message: "Price must be greater than 0" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Price"
                    type="number"
                    fullWidth
                    margin="dense"
                    error={!!errors.house_price}
                    helperText={errors.house_price?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="house_type"
                control={control}
                rules={{ required: "House type is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="House Type"
                    fullWidth
                    margin="dense"
                    error={!!errors.house_type}
                    helperText={errors.house_type?.message}
                    required
                  >
                    <MenuItem value={1}>Residential</MenuItem>
                    <MenuItem value={2}>Commercial</MenuItem>
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
              reset(); // Reset form when canceling
              onClose();
            }}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} color="primary" variant="contained">
            Add House
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default AddHouseModal;
