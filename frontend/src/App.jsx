import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/home" element={<h2>Home</h2>} />
          <Route path="/profile" element={<h2>Profile</h2>} />
          <Route path="/settings" element={<h2>Settings</h2>} />
          <Route path="/logout" element={<h2>Logout</h2>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
