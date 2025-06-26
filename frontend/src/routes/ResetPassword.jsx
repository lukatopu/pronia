import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPasswordUser } from '../api/api.js';
import { useTranslation } from 'react-i18next';

function ResetPassword() {
  const [formData, setformData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { t } = useTranslation();

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
      <h4>{t('ResetPassword')}</h4>
      <p className="error">{error}</p>
      <form onSubmit={handleSubmit}>
        <div className="InputContainer">
          <label>{t('Password')}</label>

          <input
            type="password"
            name="password"
            placeholder={t('Password')}
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="InputContainer">
          <label>{t('ConfirmPassword')}</label>

          <input
            type="password"
            name="confirmPassword"
            placeholder={t('ConfirmPassword')}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">{t('Reset')}</button>
      </form>
    </div>
  );
}

export default ResetPassword;
