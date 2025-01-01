import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HouseDetails from './components/House/HouseDetails';
import { LoginPage, RegisterPage, HousePage, TenantPage, PaymentPage, Dashboard } from './pages/index';

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
                <Route path="/house" element={<HousePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/house/:id" element={<HouseDetails />} />
                <Route path="/tenant" element={<TenantPage />} />
                <Route path="/payment" element={<PaymentPage />} />
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
