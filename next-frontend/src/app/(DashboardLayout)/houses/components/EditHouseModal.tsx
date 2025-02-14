import React, { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

interface House {
  house_number: string;
  house_location: string;
  house_price: number;
  house_type: number;
  occupied: boolean;
}

interface EditHouseModalProps {
  open: boolean;
  onClose: () => void;
  house: House | null;
  setHouses: React.Dispatch<React.SetStateAction<House[]>>;
}

const EditHouseModal: React.FC<EditHouseModalProps> = ({ open, onClose, house, setHouses }) => {
  const { control, handleSubmit, reset, setValue } = useForm<House>();

  useEffect(() => {
    if (house) {
      setValue("house_number", house.house_number);
      setValue("house_location", house.house_location);
      setValue("house_price", house.house_price);
      setValue("house_type", house.house_type);
    }
  }, [house, setValue]);

  const onSubmit = (data: House) => {
    setHouses((prevHouses) =>
      prevHouses.map((h) => (h.house_number === house?.house_number ? { ...data, house_type: Number(data.house_type), occupied: h.occupied } : h))
    );
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit House</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="house_number"
            control={control}
            render={({ field }) => <TextField {...field} label="House Number" fullWidth margin="dense" disabled />}
          />
          <Controller
            name="house_location"
            control={control}
            render={({ field }) => <TextField {...field} label="Location" fullWidth margin="dense" required disabled />}
          />
          <Controller
            name="house_price"
            control={control}
            render={({ field }) => <TextField {...field} label="Price" type="number" fullWidth margin="dense" required />}
          />
          <Controller
            name="house_type"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="House Type" fullWidth margin="dense" required>
                <MenuItem value={0}>Residential</MenuItem>
                <MenuItem value={1}>Commercial</MenuItem>
              </TextField>
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary" variant="contained">Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditHouseModal;