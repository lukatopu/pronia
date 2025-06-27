import React, { useState, useEffect } from 'react';
import {
  updateUserProfile,
  logoutUser,
  getOrders,
  getCurrentUser,
} from '../api/api';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../hooks/useLoader';

function Profile() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const [orders, setOrders] = useState([]);

  const { t } = useTranslation();
  const { useFakeLoader } = useLoader()
  useEffect(() => {
    useFakeLoader();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, ordersData] = await Promise.all([
          getCurrentUser(),
          getOrders(),
        ]);

        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setEmail(userData.email || '');
        setOrders(ordersData || []);
      } catch (err) {
        console.error('Error loading profile:', err);
        setMessage(t('ProfileLoadError'));
        setIsSuccess(false);
      }
    };

    fetchData();
  }, [t]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = '/login';
    } catch (err) {
      setMessage(t('LogoutFailed'));
      setIsSuccess(false);
    }
  };

  const handleSaveChanges = async () => {
    setMessage('');
    setIsSuccess(null);

    if (
      (currentPassword || newPassword || confirmNewPassword) &&
      !(currentPassword && newPassword && confirmNewPassword)
    ) {
      setMessage(t('PasswordFieldsIncomplete'));
      setIsSuccess(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage(t('PasswordMismatch'));
      setIsSuccess(false);
      return;
    }

    try {
      const updateData = {
        firstName,
        lastName,
        email,
      };

      if (currentPassword && newPassword) {
        updateData.currentPassword = currentPassword;
        updateData.newPassword = newPassword;
      }

      await updateUserProfile(updateData);

      setMessage(t('ProfileUpdated'));
      setIsSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      setMessage(err.message);
      setIsSuccess(false);
    }
  };

  return (
    <div className="accountWrapper">
      <div className="accountTab">
        <button
          className={activeTab === 'dashboard' ? 'tabButton active' : 'tabButton'}
          onClick={() => setActiveTab('dashboard')}
        >
          {t('Dashboard')}
        </button>
        <button
          className={activeTab === 'orders' ? 'tabButton active' : 'tabButton'}
          onClick={() => setActiveTab('orders')}
        >
          {t('Orders')}
        </button>
        <button
          className={activeTab === 'addresses' ? 'tabButton active' : 'tabButton'}
          onClick={() => setActiveTab('addresses')}
        >
          {t('Addresses')}
        </button>
        <button
          className={activeTab === 'details' ? 'tabButton active' : 'tabButton'}
          onClick={() => setActiveTab('details')}
        >
          {t('AccountDetails')}
        </button>
        <button className="tabButton" onClick={handleLogout}>
          {t('Logout')}
        </button>
      </div>

      <div className="accountTabDisplay">
        {activeTab === 'dashboard' && (
          <div className="dashboardDisplay">
            <h1>{t('Dashboard')}</h1>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="ordersDisplay">
            <h1>{t('Orders')}</h1>
            {Array.isArray(orders) && orders.length === 0 ? (
              <p>{t('NoOrders')}</p>
            ) : (
              <ul>
                {orders.map((order) => (
                  <li key={order.id}>
                    <strong>{order.date}</strong> – {order.total} – {order.status}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="addressesDisplay">
            <h1>{t('Addresses')}</h1>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="detailsDisplay">
            <h1>{t('AccountDetails')}</h1>

            <div className="inputRow">
              <div className="inputGroup">
                <label>{t('FirstName')}</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="halfInput"
                />
              </div>
              <div className="inputGroup">
                <label>{t('LastName')}</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="halfInput"
                />
              </div>
            </div>

            <div className="inputGroup">
              <label>{t('EmailAddress')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="fullInput"
              />
            </div>

            <div className="inputGroup">
              <label>{t('CurrentPassword')} <small>({t('LeaveBlank')})</small></label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="fullInput"
              />
            </div>

            <div className="inputGroup">
              <label>{t('NewPassword')} <small>({t('LeaveBlank')})</small></label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="fullInput"
              />
            </div>

            <div className="inputGroup">
              <label>{t('ConfirmPassword')}</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="fullInput"
              />
            </div>

            <button onClick={handleSaveChanges} className="saveButton">
              {t('SaveChanges')}
            </button>

            {message && (
              <p className={`feedbackMessage ${isSuccess ? 'success' : 'error'}`}>
                {message}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;