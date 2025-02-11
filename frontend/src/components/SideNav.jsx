import React from 'react';
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarFooter,
  CDBIcon,
  CDBLink,
  CDBCollapse,
} from 'cdbreact';
import { useNavigate } from 'react-router-dom';

const SideNav = ({ onToggle }) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
    // TODO: Add logout functionalities
  };

  return (
    <CDBSidebar textColor="#fff" backgroundColor="#333" untoggled>
      <CDBSidebarHeader prefix={<CDBIcon icon="bars" size="lg" />} onClick={onToggle}>
        WRM
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBLink to="/dashboard" className="d-flex align-items-center">
            <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
          </CDBLink>
          <CDBLink to="/house" className="d-flex align-items-center">
            <CDBSidebarMenuItem icon="home">Houses</CDBSidebarMenuItem>
          </CDBLink>
          <CDBLink to="/tenant" className="d-flex align-items-center">
            <CDBSidebarMenuItem icon="user">Tenants</CDBSidebarMenuItem>
          </CDBLink>
          <CDBLink to="/payment" className="d-flex align-items-center">
            <CDBSidebarMenuItem icon="money-bill-wave">Payments</CDBSidebarMenuItem>
          </CDBLink>
          <CDBLink to="/reports" className="d-flex align-items-center">
            <CDBSidebarMenuItem icon="file-alt">Reports</CDBSidebarMenuItem>
          </CDBLink>
        </CDBSidebarMenu>
        <CDBSidebarMenu>
          <button onClick={handleLogout} className="d-flex align-items-center btn" style={{color: 'white'}}>
            <CDBSidebarMenuItem icon="sign-out-alt">Logout</CDBSidebarMenuItem>
          </button>
        </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 5px',
          }}
        >
          Sidebar Footer
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
};

export default SideNav;
