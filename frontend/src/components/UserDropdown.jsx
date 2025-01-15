import React, { useState } from 'react';
import { FaUser, FaAngleDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const userData = localStorage.getItem('user');
  const loggedInUser = userData ? JSON.parse(userData) : null;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileView = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
    // TODO: Add logout functionalities
  };

  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        cursor: 'pointer', 
        position: 'relative'  // Ensure dropdown is positioned relative to this container
      }} 
      onClick={toggleDropdown}
    >
      <FaUser 
        style={{ 
          height: '30px', 
          width: '30px', 
          borderRadius: '50%', 
          marginRight: '5px' 
        }} 
      />
      <span>{loggedInUser?.first_name}</span>
      <FaAngleDown style={{ marginLeft: '5px' }} />

      {isOpen && (
        <div 
          style={{ 
            position: 'absolute', 
            top: '100%', 
            right: 0, 
            backgroundColor: '#333', 
            padding: '10px', 
            borderRadius: '5px', 
            boxShadow: '0 2px 1px rgba(0, 0, 0, 0.1)', 
            minWidth: '150px',
            zIndex: 10
          }}
        >
          <div 
            onClick={handleProfileView} 
            style={{
              padding: '2px',
              marginBottom: '5px',
              backgroundColor: '#555',
              color: '#fff',
              borderRadius: '5px',
              cursor: 'pointer',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#666')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#555')}
          >
            Profile
          </div>
          <div 
            onClick={handleLogout} 
            style={{
              padding: '2px',
              backgroundColor: '#555',
              color: '#fff',
              borderRadius: '5px',
              cursor: 'pointer',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#666')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#555')}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
