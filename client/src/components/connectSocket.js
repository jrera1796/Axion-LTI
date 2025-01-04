// In a separate script (e.g., socket.js)

import io from 'socket.io-client';

const connectSocket = async (selectedChannel, user) => {
  console.log("I've entered socket connections")
  return new Promise((resolve, reject) => {
    const newSocket = io(`http://localhost:3000/api/`, {
      query: { channel: selectedChannel.id, user: user },
    });
    
    newSocket.on('connect', () => {
      console.log("Socket connected successfully");
      newSocket.emit('joinChannel', selectedChannel.id, user);
      resolve(newSocket); // Resolve the promise once the socket is connected
    });

    newSocket.on('message', (message) => {
      console.log("Received message:", message);
    });

    newSocket.on('userJoined', (user) => {
      console.log("User joined:", user);
    });

    newSocket.on('userLeft', (user) => {
      console.log("User left:", user);
    });

    newSocket.on('disconnect', () => {
      console.log("Socket disconnected");
      // Handle socket disconnect if needed
    });
  });
};

export default connectSocket;
