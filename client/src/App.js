import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthenticationComponent from './components/GoogleAuth';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import DirectMessages from './components/DirectMessages';
import Channels from './components/Channels';
import Profile from './components/Profile';
import './App.css'
import './styles/MediaQuery.css'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleSignIn = (userData) => {
    setUser(userData);
    setLoggedIn(true);
  };

  // Manage channels and selected channel here
  const [channels, setChannels] = useState([
    { id: 1, name: 'General' },
    // Example initial channel
  ]);
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);


  return (
    <GoogleOAuthProvider clientId="945846848255-f2vmjd00h48paecb9bhifcpa7ngr0lu1.apps.googleusercontent.com">
      <BrowserRouter>
        <div className="App">
          <header className="app-header">
            <img height="200rem" alt="Axion Logo" src="/images/AxionLogo.png" />
            <AuthenticationComponent loggedIn={loggedIn} user={user} onSignIn={handleSignIn} />
          </header>
          <div className='main-container'>
            {/* Pass channels and selectedChannel to Sidebar */}
            <Sidebar channels={channels} selectedChannel={selectedChannel} />
            <Routes>
              <Route path="/Home" element={<Home />} />
              <Route path="/DirectMessages" element={<DirectMessages />} />
              <Route path="/Channels" element={<Channels />} />
              <Route path="/Profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
