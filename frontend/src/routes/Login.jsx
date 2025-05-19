import React, { useState, useEffect } from 'react';
import { loginUser } from '../api/api';
import { useLoader } from '../hooks/useLoader';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { useFakeLoader } = useLoader();

  useEffect(() => useFakeLoader(), []);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="loginContainer">
      <h4>Login</h4>
      <p className="error">{error}</p>
      <form onSubmit={handleSubmit}>
        <div className="InputContainer">
          <label>Email Address*</label>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="InputContainer">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="loginAddOns">
          <div className="checkboxContainer">
            <input type="checkbox" />
            <label>Remember Me</label>
          </div>
          <a href="/forgot-password">Forgot password?</a>
        </div>
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
}

export default Login;
