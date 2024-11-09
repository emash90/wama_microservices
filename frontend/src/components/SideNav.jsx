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

const SideNav = ({ onToggle }) => {
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
          <CDBLink to="/report" className="d-flex align-items-center">
            <CDBSidebarMenuItem icon="file-alt">Reports</CDBSidebarMenuItem>
          </CDBLink>
        </CDBSidebarMenu>
        <CDBSidebarMenu>
          <CDBLink to="/logout" className="d-flex align-items-center">
            <CDBSidebarMenuItem icon="sign-out-alt">Logout</CDBSidebarMenuItem>
          </CDBLink>
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
