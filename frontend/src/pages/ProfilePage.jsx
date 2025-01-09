import React from 'react';
import { Avatar, Typography, Box, Paper, Container, Stack } from '@mui/material';

const ProfilePage = () => {
  const userData = localStorage.getItem('user');
  const loggedInUser = userData ? JSON.parse(userData) : null;

  return (
    <Container maxWidth="sm" sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      {loggedInUser ? (
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px' }}>
          <Stack spacing={3} direction={{ xs: 'column', sm: 'row' }} alignItems="center">
            {/* Profile Image */}
            <Avatar
              alt={`${loggedInUser.first_name} ${loggedInUser.last_name}`}
              src={loggedInUser.profileImage || ''}
              sx={{
                width: 120,
                height: 120,
                fontSize: '48px',
                backgroundColor: '#1976d2',
                color: '#fff',
              }}
            >
              {loggedInUser.first_name[0]?.toUpperCase()}
            </Avatar>

            {/* User Details */}
            <Box>
              <Typography variant="h5">
                {loggedInUser.first_name} {loggedInUser.last_name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Role: {loggedInUser.role === 0 ? 'User' : 'Admin'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {loggedInUser.email}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      ) : (
        <Typography variant="body1" color="text.secondary" sx={{ marginTop: '20px' }}>
          No user data available. Please log in to view your profile.
        </Typography>
      )}
    </Container>
  );
};

export default ProfilePage;
