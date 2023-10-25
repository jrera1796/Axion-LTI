// App.js
import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthenticationComponent from './components/GoogleAuth';
import ChatComponent from './components/ChatComponent';
import Sidebar from './components/Sidebar';
import './App.css'
import './styles/MediaQuery.css'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleSignIn = (userData) => {
    setUser(userData);
    setLoggedIn(true);
  };

  return (
    <GoogleOAuthProvider clientId="945846848255-f2vmjd00h48paecb9bhifcpa7ngr0lu1.apps.googleusercontent.com">
      <div className="App">
        <header className="app-header">
          <img height="200rem" alt="Axion Logo" src="/images/AxionLogo.png" />

          <AuthenticationComponent loggedIn={loggedIn} user={user} onSignIn={handleSignIn} />
        </header>
        <div className='main-container'>
          {loggedIn && <Sidebar />}
          {loggedIn && <ChatComponent user={user} />}
        </div>
        {!loggedIn ? (<div>Please log in</div>) : (<></>
        )}

      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
