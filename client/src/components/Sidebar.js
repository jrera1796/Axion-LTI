import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css'

const Sidebar = ({ channels, selectedChannel }) => {
  return (
    <div className="sidebar">
      <div className="logo">
        <h1>AXION<sub className="subscript"> LTI</sub></h1>
      </div>
      <div className="navigation">
        <div className="mobile-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/DirectMessages">Direct Messages</Link></li>
            <li>
              <Link to="/Channels">Channels</Link>
              <ul>
                {channels.map((channel) => (
                  <li key={channel.id}>
                    <Link to={`/Channels/${channel.id}`} className={channel === selectedChannel ? "active" : ""}>
                      {channel.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mobile-only" style={{ display: "none;" }}><Link to="/Profile">Profile</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
