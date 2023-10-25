import React from 'react';
import '../styles/Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <h1>AXION<sub class="subscript"> LTI</sub></h1>
      </div>
      <div className="navigation">
        <div className="mobile-nav">
          <ul>
            <li>Home</li>
            <li>Direct Messages</li>
            <li>Channels</li>
            <li className='mobile-only' style={{display: "none;"}}>Profile</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
