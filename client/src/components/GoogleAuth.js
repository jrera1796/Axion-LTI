import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import UserComponent from './UserComponent';
import decode from 'jwt-decode';

const googleAuth = (props) => {

  const handleSignIn = (credentialResponse) => {
    const user = decode(credentialResponse.credential);
    console.log(props.loggedIn)
    props.onSignIn(user);

  };

  return (
    <div className='google-auth-container'>
      {!props.loggedIn &&
        <GoogleLogin onSuccess={handleSignIn} />}
      {props.loggedIn && <UserComponent user={props.user}/>}
    </div>
  );
};

export default googleAuth;