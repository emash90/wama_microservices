import React, { useState } from 'react';
import SideNav from './SideNav';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from '../assets/wama-logo.ico'
import { FaUser } from "react-icons/fa";
import UserDropdown from './UserDropdown'

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(prevState => !prevState);
  };
console.log(isCollapsed)
  return (
    <Container fluid style={{ height: '100vh', overflow: 'hidden', paddingLeft: 0, paddingRight: 0 }}>
      <Row style={{ height: '100%' }}>
        {/* Sidebar */}
        <Col xs={1} style={{ padding: 0, position: 'fixed', height: '100vh', background: '#ffffff', marginTop: '5rem' }}>
          <SideNav onToggle={handleToggle} />
        </Col>

        {/* Main Content Area */}
        <Col xs={10} style={{ width: '100%', padding: 0 }}>
          {/* Header */}
          <header style={{ padding: '1.4rem', background: '#758595', color: 'white', position: 'fixed', width: '100%', zIndex: 1000 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Logo and Header Title */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={Logo} alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
                <h4>Rental Management System</h4>
                </div>
                
                {/* User Info - Pushed to the Right */}
                <UserDropdown /> 
            </div>
            </header>


          {/* Main Content */}
          <div style={{ marginLeft: isCollapsed ? '7.5%' : '20%', padding: '1rem', transition: 'margin-left 1s', marginTop: '5rem' }}>
            {children}
          </div>

          {/* Footer */}
          <footer style={{ padding: '.25rem', background: '#f1f1f1', textAlign: 'center', position: 'fixed', width: '100%', bottom: 0 }}>
            <p>Footer</p>
          </footer>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
