import React from 'react';
import SideNav from './SideNav';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from '../assets/wama-logo.ico'
import { FaUser } from "react-icons/fa";

const Layout = ({ children }) => {
  return (
    <Container fluid style={{ height: '100vh', overflow: 'hidden', paddingLeft: 0, paddingRight: 0 }}>
      <Row style={{ height: '100%' }}>
        {/* Sidebar */}
        <Col xs={2} style={{ padding: 0, position: 'fixed', height: '100vh', background: '#4c4c4d' }}>
          <SideNav />
        </Col>

        {/* Main Content Area */}
        <Col xs={10} style={{ marginLeft: '16.6667%', padding: 0 }}>
          {/* Header */}
          <header style={{ padding: '1rem', background: '#758595', color: 'white', position: 'fixed', width: '83.3333%', zIndex: 1000 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Logo and Header Title */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={Logo} alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
                <h4>Rental Management System</h4>
                </div>
                
                {/* User Info - Pushed to the Right */}
                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <FaUser style={{ height: '30px', width: '30px', borderRadius: '50%', marginRight: '5px' }} />
                <span>John Doe</span>
                </div>
            </div>
            </header>


          {/* Main Content */}
          <div style={{ padding: '2rem', marginTop: '68px', marginBottom: '50px', height: 'calc(100vh - 118px)', overflowY: 'auto' }}>
            {children}
          </div>

          {/* Footer */}
          <footer style={{ padding: '1rem', background: '#f1f1f1', textAlign: 'center', position: 'fixed', width: '83.3333%', bottom: 0 }}>
            <p>Dashboard Footer</p>
          </footer>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
