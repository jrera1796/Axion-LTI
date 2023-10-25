import React, { useState } from 'react';
import '../styles/MessageInput.css';

const NewMessage = ({ socket }) => {
  const [value, setValue] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    socket.emit('message', value);
    setValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        e.preventDefault();
        setValue(value + '\n');
      }
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      submitForm(e);
    }
  };

  return (
    <div className="message-input-container">
      <form onSubmit={submitForm}>
        <textarea
        id="input-el"
          autoFocus
          value={value}
          placeholder="Type your message"
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
          onKeyDown={handleKeyPress}
        />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
    </div>
  );
};

export default NewMessage;