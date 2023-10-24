import React from 'react';
import '../styles/Sidebar.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo">
            <h1>AXION<sub class="subscript"> LTI</sub></h1>
            </div>
            <div className="navigation">
                <ul>
                    <li>Direct Messages</li>
                    <li>Channels</li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
