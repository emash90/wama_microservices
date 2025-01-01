import React, { useState } from 'react';
import { FaUser, FaAngleDown, FaSignOutAlt } from 'react-icons/fa';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileView = () => {
    //TODO: add profile view functionalities
  }
  const handleLogout = () => {
    //TODO: add logout functionalities
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleDropdown}>
      <FaUser style={{ height: '30px', width: '30px', borderRadius: '50%', marginRight: '5px' }} />
      <span>John Doe</span>
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
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' ,
            minWidth: '150px'
          }}
        >
          <div onClick={() => { handleProfileView() }}>Profile</div>
          <div onClick={() => { handleLogout()}}>Logout</div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;