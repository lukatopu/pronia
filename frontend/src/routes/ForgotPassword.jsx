import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordUser } from '../api/api.js';

function ForgotPassword() {
  const [formData, setformData] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await forgotPasswordUser(formData);
      if (response.data) {
        alert('email has sent');
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="loginContainer">
      <h4>Forgot Password</h4>
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

        <button type="submit">Send Mail</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
