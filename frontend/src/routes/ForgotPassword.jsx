import React, { useState } from 'react';
import { forgotPasswordUser } from '../api/api.js';
import { useTranslation } from 'react-i18next';

function ForgotPassword() {
  const [formData, setformData] = useState({
    email: '',
  });
  const [error, setError] = useState('');

  const { t } = useTranslation();

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await forgotPasswordUser(formData);
      if (response.data) {
        alert('Email has been sent');
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.msg || err.response?.data?.err || 'Email is not signed up';
      console.log(errorMessage);
      setError(errorMessage);
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
