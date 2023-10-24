import React from 'react';
import '../styles/UserModal.css'

const UserModal = ({ user, style }) => {

  const sendDMRequest = (user) => {
    console.log("user clicked from Modal JS")
  }

  return (
    <div className={`user-modal`} style={style}>
      <div className="user-info">
        <p>{user.name}</p>
        <button onClick={sendDMRequest}>Send Message</button>
      </div>
    </div>
  );
};

export default UserModal;
