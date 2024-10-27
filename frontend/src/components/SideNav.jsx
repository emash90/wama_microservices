import React from 'react';
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Logo from '../assets/wama-logo.ico'


const SideNav = () => {
  return (
    <div style={{ height: '100vh', width: '200px', backgroundColor: '#343a40', paddingLeft: '20px'}}>
       <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '1px solid #495057' }}>
        {/* Replace this <div> with an <img> tag for your logo */}
        <img src={Logo} alt='company logo' style={{ height: '50px', width: '70px', marginRight: '10px' }}  />
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>WAMA</div>
      </div>
      <SidebarMenu>
        <SidebarMenu.Body>
          <SidebarMenu.Nav>
            <SidebarMenu.Nav.Link
              as={NavLink}
              to="/houses"
              style={{ display: 'flex', alignItems: 'center', padding: '10px', color: 'white', textDecoration: 'none' }}
              activeStyle={{ backgroundColor: '#1976d2' }}
            >
              <SidebarMenu.Nav.Icon style={{ marginRight: '10px' }}><FaHome /></SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Houses</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>
            
            <SidebarMenu.Nav.Link
              as={NavLink}
              to="/tenants"
              style={{ display: 'flex', alignItems: 'center', padding: '10px', color: 'white', textDecoration: 'none' }}
              activeStyle={{ backgroundColor: '#1976d2' }}
            >
              <SidebarMenu.Nav.Icon style={{ marginRight: '10px' }}><FaUser /></SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Tenants</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>

            <SidebarMenu.Nav.Link
              as={NavLink}
              to="/payments"
              style={{ display: 'flex', alignItems: 'center', padding: '10px', color: 'white', textDecoration: 'none' }}
              activeStyle={{ backgroundColor: '#1976d2' }}
            >
              <SidebarMenu.Nav.Icon style={{ marginRight: '10px' }}><FaCog /></SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Payments</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>
            
            <SidebarMenu.Nav.Link
              as={NavLink}
              to="/logout"
              style={{ display: 'flex', alignItems: 'center', padding: '10px', color: 'white', textDecoration: 'none' }}
              activeStyle={{ backgroundColor: '#1976d2' }}
            >
              <SidebarMenu.Nav.Icon style={{ marginRight: '10px' }}><FaSignOutAlt /></SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>Logout</SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>
          </SidebarMenu.Nav>
        </SidebarMenu.Body>
      </SidebarMenu>
    </div>
  );
};

export default SideNav;
