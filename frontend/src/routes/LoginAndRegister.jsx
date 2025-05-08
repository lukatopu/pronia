import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

function LoginAndRegister() {
  return (
    <div className="login-register-container">
      <Login />
      <Register />
    </div>
  );
}

export default LoginAndRegister;
