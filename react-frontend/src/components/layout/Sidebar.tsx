
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Building, Users, CreditCard, FileText, LogOut } from 'lucide-react';
import { logoutUser } from '@/services/authService';
import wama_logo from '@/assets/images/wama_logo.svg'

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Houses', path: '/houses', icon: <Building size={20} /> },
    { name: 'Tenants', path: '/tenants', icon: <Users size={20} /> },
    { name: 'Payments', path: '/payments', icon: <CreditCard size={20} /> },
    { name: 'Reports', path: '/reports', icon: <FileText size={20} /> },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-10 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out shadow-lg ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 px-6 border-b border-sidebar-border">
          <img src={wama_logo} alt="Wama Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Wama Rentals
          </h1>
        </div>
        
        <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 mb-2 text-sm rounded-md transition-all duration-200 ${
                isActiveRoute(item.path)
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        
        <div className="p-4 border-t border-sidebar-border">
          <button onClick={logoutUser} className="flex items-center w-full px-4 py-3 text-sm text-sidebar-foreground rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200">
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
