import React from 'react';
import ChatComponent from './ChatComponent';

const Channels = ({ Channels, selectedChannel }) => {


  return (

    <div>
      <h3>Current Channel: {selectedChannel.name}</h3>
      <ChatComponent channel={selectedChannel} />
    </div>

  );
};

export default Channels;
