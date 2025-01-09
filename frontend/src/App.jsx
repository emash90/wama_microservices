import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HouseDetails from './components/House/HouseDetails';
import { LoginPage, RegisterPage, HousePage, TenantPage, PaymentPage, Dashboard } from './pages/index';
import PrivateRoute from './components/PrivateRoute'


function App() {
  return (
    <Router>
      <Routes>
        {/* Routes without Layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Routes with Layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/house" element={ <PrivateRoute> <HousePage /> </PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
                <Route path="/house/:id" element={ <PrivateRoute> <HouseDetails /> </PrivateRoute>} />
                <Route path="/tenant" element={ <PrivateRoute> <TenantPage /></PrivateRoute>} />
                <Route path="/payment" element={ <PrivateRoute> <PaymentPage /></PrivateRoute>} />
                <Route path="/logout" element={<div>Logout Page</div>} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
