import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordUser } from '../api/api.js';
import { useTranslation } from 'react-i18next';

function ForgotPassword() {
  const [formData, setformData] = useState({
    email: '',
  });
  const [error, setError] = useState('');

  const { i18n, t } = useTranslation();

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
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
      <h4>{t('ForgotPassword')}</h4>
      <p className="error">{error}</p>
      <form onSubmit={handleSubmit}>
        <div className="InputContainer">
          <label>{t('EmailAddress')}*</label>

          <input
            type="email"
            name="email"
            placeholder={t('EmailAddress')}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">{t('SendMail')}</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
