// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },  // Customize as needed
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
