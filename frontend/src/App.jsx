import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { LoginPage, RegisterPage, HousePage, TenantPage, PaymentPage } from './pages/index'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/house" element={<HousePage />} />
          <Route path="/tenant" element={<TenantPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/logout"/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
