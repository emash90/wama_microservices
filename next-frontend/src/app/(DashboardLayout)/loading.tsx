import { CircularProgress, Box, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      bgcolor="background.default"
    >
      <CircularProgress size={50} color="primary" />
      <Typography variant="h6" mt={2} color="text.secondary">
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default Loading;
