import React, { useEffect, useRef, useState } from 'react';
import '../styles/Messages.css';

function Messages({ socket, onUserClick }) {
  const [messages, setMessages] = useState({});
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        newMessages[message.id] = message;
        console.log(message.user.name)

        setTimeout(() => {
          scrollToBottom()
        }, 10)

        return newMessages;
      });
    };

    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        delete newMessages[messageID];
        return newMessages;
      });
    };

    socket.on('message', messageListener);
    socket.on('deleteMessage', deleteMessageListener);
    socket.emit('getMessages');

    return () => {
      socket.off('message', messageListener);
      socket.off('deleteMessage', deleteMessageListener);
    };

  }, [socket]);

  const scrollToBottom = () => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  };

  const handleNameClick = (user, e) => {
    onUserClick(user, e);
  };

  return (
    <div className="message-list" ref={messagesContainerRef}>
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <div
            key={message.id}
            className="message-container"
            title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
          >
            <span className="user"
              onClick={(e) => handleNameClick(message.user, e)}
            >
              {message.user.name}:
            </span>

            <span className="message" data-msg-id={message.id}>{message.value}</span>
            <span className="date">{new Date(message.time).toLocaleTimeString()}</span>
          </div>
        ))
      }
    </div>


  );
}

export default Messages;