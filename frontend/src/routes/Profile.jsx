import React, { useState, useEffect } from 'react';
import {
  updateUserProfile,
  logoutUser,
  getOrders,
  getCurrentUser,
} from '../api/api';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../hooks/useLoader';
import countries from '../data/countries.json';

function Profile() {
  const [activeTab, setActiveTab] = useState('details');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [newAddressObj, setNewAddressObj] = useState({
    country: '',
    company: '',
    address: '',
    city: '',
    state: '',
    postcode: ''
  });

  const { t } = useTranslation();
  const { useFakeLoader } = useLoader();

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
        setAddresses(Array.isArray(userData.addresses) ? userData.addresses : []);
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

  const saveProfile = async (updatedAddresses) => {
    try {
      const updateData = {
        firstName,
        lastName,
        email,
        addresses: updatedAddresses,
      };
      await updateUserProfile(updateData);
      setIsSuccess(true);
      setMessage(t('ProfileUpdated'));
    } catch (err) {
      setMessage(err.message || 'Error saving address');
      setIsSuccess(false);
    }
  };

  const handleSaveNewAddress = async () => {
    const requiredFields = ['country', 'address', 'city', 'state', 'postcode'];
    const missingFields = requiredFields.filter(field => !newAddressObj[field].trim());

    if (missingFields.length > 0) {
      setMessage(t('AddressFieldsIncomplete') || 'Please fill in all required address fields.');
      setIsSuccess(false);
      return;
    }

    const updated = [...addresses, newAddressObj];
    setAddresses(updated);
    setNewAddressObj({
      country: '',
      company: '',
      address: '',
      city: '',
      state: '',
      postcode: ''
    });
    await saveProfile(updated);
  };

  const handleRemoveAddress = async (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    await saveProfile(updated);
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
        addresses,
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
        <button className={activeTab === 'orders' ? 'tabButton active' : 'tabButton'} onClick={() => setActiveTab('orders')}>
          {t('Orders')}
        </button>
        <button className={activeTab === 'addresses' ? 'tabButton active' : 'tabButton'} onClick={() => setActiveTab('addresses')}>
          {t('Addresses')}
        </button>
        <button className={activeTab === 'details' ? 'tabButton active' : 'tabButton'} onClick={() => setActiveTab('details')}>
          {t('AccountDetails')}
        </button>
        <button className="tabButton" onClick={handleLogout}>
          {t('Logout')}
        </button>
      </div>

      <div className="accountTabDisplay">
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
            {message && (
              <p style={{marginBottom:'10px'}} className={`feedbackMessage ${isSuccess ? 'success' : 'error'}`}>
                {message}
              </p>
            )}
            <div className="inputGroup">
              {Object.entries(newAddressObj).map(([key, value]) => (
                key === 'country' ? (
                  <div key={key}>
                    <label>{t('CountryRegion')}</label>
                    <select
                      value={value}
                      onChange={(e) => setNewAddressObj({ ...newAddressObj, [key]: e.target.value })}
                      className="fullInput"
                    >
                      <option value="">{t('SelectCountry')}</option>
                      {countries.map((countryObj) => (
                        <option key={countryObj.code} value={countryObj.code}>
                          {countryObj.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div key={key}>
                    <label>{t(key)}</label>
                    {key === 'city' && countries.find(c => c.code === newAddressObj.country)?.cities ? (
                      <select
                        value={value}
                        onChange={(e) => setNewAddressObj({ ...newAddressObj, [key]: e.target.value })}
                        className="fullInput"
                      >
                        <option value="">{t('SelectCity') || 'Select a city'}</option>
                        {countries.find(c => c.code === newAddressObj.country).cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setNewAddressObj({ ...newAddressObj, [key]: e.target.value })}
                        className="fullInput"
                      />
                    )}
                  </div>
                )
              ))}
              <button onClick={handleSaveNewAddress} className="saveButton" style={{ marginTop: '10px' }}>
                {t('AddAddress')}
              </button>
            </div>

            <div className="inputGroup">
              <label>{t('YourAddresses')} <span>({addresses.length})</span></label>
              <div className="addressList">
                {addresses.map((addr, i) => (
                  <p style={{ color: '#abd787' }} key={i}>
                    {Object.values(addr).filter(Boolean).join(', ')}
                    <button
                      onClick={() => handleRemoveAddress(i)}
                      style={{
                        marginLeft: '10px',
                        color: 'red',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      {t('Remove')}
                    </button>
                  </p>
                ))}
              </div>
            </div>
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