import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPasswordUser } from '../api/api.js';

function ResetPassword() {
  const [formData, setformData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { token } = useParams();

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await resetPasswordUser(formData, token);
      if (response.data) {
        alert('reseted');
        navigate('/');
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="loginContainer">
      <h4>Reset Password</h4>
      <p className="error">{error}</p>
      <form onSubmit={handleSubmit}>
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

        <div className="InputContainer">
          <label>Confirm Password</label>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Send Mail</button>
      </form>
    </div>
  );
}

export default ResetPassword;
