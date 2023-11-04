import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import UserModal from './UserModal';
import Messages from './Messages';
import MessageInput from './MessageInput';

const ChatComponent = ({ user }) => {
  const [socket, setSocket] = useState(null);
  const [isUserModalVisible, setUserModalVisibility] = useState(false);
  const [userForModal, setUserForModal] = useState(null); // Add this state variable
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 }); // Store modal position

  const userTimeouts = {};

  const handleUserClick = (user, e) => {
    setUserForModal(user);
    setModalPosition({ x: e.clientX, y: e.clientY });
    setUserModalVisibility(true);

    clearTimeout(userTimeouts[user.id]);

    userTimeouts[user.id] = setTimeout(function () {
      setUserModalVisibility(false);
    }, 5000);
  };

  useEffect(() => {
    const newSocket = io(`http:/localhost:3000`);
    setSocket(newSocket);

    if (newSocket && user) {
      newSocket.emit('user', user);
    }
    return () => newSocket.close();
  }, [setSocket, user]);

  // Chat logic

  return (
    <>
      {socket ? (
        <div className="chat-container">
          <Messages socket={socket} onUserClick={(user, e) => { handleUserClick(user, e) }} />
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
      {isUserModalVisible && <UserModal user={userForModal} style={{ position: 'fixed', top: modalPosition.y, left: modalPosition.x }}
      />}
    </>
  );
};

export default ChatComponent;
