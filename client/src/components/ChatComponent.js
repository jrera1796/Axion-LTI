import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import UserModal from './UserModal';
import Messages from './Messages';
import MessageInput from './MessageInput';

const ChatComponent = ({ user, selectedChannel, onMessage, onUserJoin, onUserLeave }) => {
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
    const newSocket = io(`http://${window.location.hostname}:3000/api`, {
      query: { channel: selectedChannel.id, user: user },
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit('joinChannel', selectedChannel.id, user);
    });

    newSocket.on('message', (message) => {
      onMessage(message);
    });

    newSocket.on('userJoined', (user) => {
      onUserJoin(user);
    });

    newSocket.on('userLeft', (user) => {
      onUserLeave(user);
    });

    return () => {
      newSocket.close();
    };
  }, [selectedChannel, user, onMessage, onUserJoin, onUserLeave]);

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
