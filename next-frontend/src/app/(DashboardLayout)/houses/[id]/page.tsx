"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { 
  Container, Typography, Box, CircularProgress, Paper, Divider, Chip, Stack 
} from "@mui/material";
import { Home, LocationOn, AttachMoney, Category, CheckCircle, Cancel } from "@mui/icons-material";
import { fetchHouseById } from "@/services/houseService";

interface House {
  _id: string;
  house_number: string;
  house_location: string;
  house_price: number;
  house_type: number;
  occupied: boolean;
}

const ViewHouse = () => {
  const { id } = useParams();
  const [house, setHouse] = useState<House | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const data = await fetchHouseById(id as string);
        setHouse(data);
      } catch (error) {
        console.error("Failed to fetch house:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchHouse();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress size={50} />
        </Box>
      </Container>
    );
  }

  if (!house) {
    return (
      <Container>
        <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
          House not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ padding: 4, marginTop: 5, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          🏠 House Details
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Stack spacing={2}>
          <Box display="flex" alignItems="center">
            <Home sx={{ color: "primary.main", mr: 1 }} />
            <Typography variant="h6">
              <strong>House Number:</strong> {house.house_number}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <LocationOn sx={{ color: "secondary.main", mr: 1 }} />
            <Typography variant="h6">
              <strong>Location:</strong> {house.house_location}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <AttachMoney sx={{ color: "green", mr: 1 }} />
            <Typography variant="h6">
              <strong>Price:</strong> ${house.house_price}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Category sx={{ color: "purple", mr: 1 }} />
            <Typography variant="h6">
              <strong>Type:</strong> {house.house_type === 1 ? "Residential" : "Commercial"}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            {house.occupied ? (
              <Cancel sx={{ color: "red", mr: 1 }} />
            ) : (
              <CheckCircle sx={{ color: "green", mr: 1 }} />
            )}
            <Typography variant="h6">
              <strong>Status:</strong> 
              <Chip
                label={house.occupied ? "Occupied" : "Vacant"}
                color={house.occupied ? "error" : "success"}
                sx={{ ml: 1 }}
              />
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ViewHouse;
