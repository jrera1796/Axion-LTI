import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Messages from './Messages';
import MessageInput from './MessageInput';

const ChatComponent = ({ user }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);

    if (newSocket && user) {
      newSocket.emit('user', user);
    }
    return () => newSocket.close();
  }, [setSocket, user]);

  // Chat related logic

  return (
    <div>
      {socket ? (
        <div className="chat-container">
          <Messages socket={socket} />
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
};

export default ChatComponent;