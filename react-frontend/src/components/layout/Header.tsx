import React, { useState } from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import { logoutUser } from '@/services/authService';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 h-16 bg-background border-b border-border backdrop-blur-sm bg-opacity-80 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 mr-4 rounded-md text-muted-foreground hover:bg-secondary transition-colors duration-200 md:hidden"
        >
          <Menu size={24} />
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-md text-muted-foreground hover:bg-secondary transition-colors duration-200">
          <Bell size={20} />
        </button>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 p-1 rounded-full bg-primary bg-opacity-10 hover:bg-opacity-20 transition-colors duration-200"
          >
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <User size={16} />
            </div>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 border border-gray-200">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                <User size={16} />
                <span>Profile</span>
              </button>
              <button onClick={logoutUser} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
