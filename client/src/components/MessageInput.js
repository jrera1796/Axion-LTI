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

document.addEventListener('DOMContentLoaded', function() {

  let originalScrollY; // Store the original scroll position

// Listen for the input element's focus event
const inputElement = document.getElementById('input-el');

inputElement.addEventListener('focus', () => {
  // Keyboard is opened, store the current scroll position
  console.log("ive snapped")
  originalScrollY = window.scrollY;
});

inputElement.addEventListener('blur', () => {
  // Keyboard is closed, scroll back to the original position
  console.log("ive snapped")
  window.scrollTo(0, originalScrollY);
});

});

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