import React, { useState, useEffect } from 'react';
import { loginUser } from '../api/api';
import { useLoader } from '../hooks/useLoader';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Login() {
  const { useFakeLoader } = useLoader();

  const { t } = useTranslation();

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
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="loginContainer">
      <h4>{t('LoginL')}</h4>
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
        <div className="loginAddOns">
          <div
            style={{ alignItems: 'flex-start' }}
            className="checkboxContainer"
          >
            <input
              style={{ marginTop: '3px' }}
              type="checkbox"
            />
            <label>{t('RememberMe')}</label>
          </div>
          <div className="nav">
            <a href="/forgot-password">{t('ForgotPassword')}?</a>
            <a href="/register">{t('DontHaveAnAccount')}</a>
          </div>
        </div>
        <button type="submit">{t('LoginH')}</button>
      </form>
    </div>
  );
}

export default Login;
