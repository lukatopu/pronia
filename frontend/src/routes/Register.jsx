import React, { useState, useEffect } from 'react';
import { useLoader } from '../hooks/useLoader';
import { registerUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Register() {
  const { useFakeLoader } = useLoader();

  const { t } = useTranslation();

  useEffect(() => useFakeLoader(), []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await registerUser(formData.firstName, formData.lastName, formData.email, formData.password);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="registerContainer">
      <h4>{t('Register')}</h4>
      <p className="error">{error}</p>
      <form onSubmit={handleSubmit}>
        <div className="nameInputContainer">
          <div className="firstNameContainer">
            <label>{t('FirstName')}</label>
            <input
              type="text"
              name="firstName"
              placeholder={t('FirstName')}
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="lastNameContainer">
            <label>{t('LastName')}</label>
            <input
              type="text"
              name="lastName"
              placeholder={t('LastName')}
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="emailContainer">
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

        <div className="passwordsContainer">
          <div className="passwordContainer">
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

          <div className="confirmPasswordContainer">
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
        </div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} className='buttonContainer'>
        <button type="submit">Register</button>
        <a href="/login">{t('AlreadyHaveAnAccount')}</a>
        </div>
      </form>
    </div>
  );
}

export default Register;
