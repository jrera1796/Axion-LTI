import React, { useState } from 'react';

const UserComponent = ({ user }) => {
  const [status, setStatus] = useState('Active');

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  
  };

  const handleLogout = () => {
    // Implement logic to log the user out
  };

  return (
    <div className="user-component">
      <div className="user-info">
        <img src={user.picture} alt={user.name} />
        <p>{user.name}</p>
      </div>
      <div className="status-dropdown">
        <p>Status: {status}</p>
        <select onChange={(e) => handleStatusChange(e.target.value)} value={status}>
          <option value="Active">Active</option>
          <option value="Away">Away</option>
          <option value="Offline">Appear Offline</option>
        </select>
      </div>
    </div>
  );
};

export default UserComponent;