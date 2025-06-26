import React, { useState, useEffect } from 'react';
import {
  updateUserProfile,
  logoutUser,
  getOrders,
  getCurrentUser,
} from '../api/api';

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
        setMessage('Failed to load profile data.');
        setIsSuccess(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = '/login';
    } catch (err) {
      setMessage('Logout failed');
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
      setMessage('Please fill all password fields to change password.');
      setIsSuccess(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage("New password and confirm password don't match.");
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

      setMessage('Profile updated successfully!');
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
          Dashboard
        </button>
        <button
          className={activeTab === 'orders' ? 'tabButton active' : 'tabButton'}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={activeTab === 'addresses' ? 'tabButton active' : 'tabButton'}
          onClick={() => setActiveTab('addresses')}
        >
          Addresses
        </button>
        <button
          className={activeTab === 'details' ? 'tabButton active' : 'tabButton'}
          onClick={() => setActiveTab('details')}
        >
          Account Details
        </button>
        <button className="tabButton" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="accountTabDisplay">
        {activeTab === 'dashboard' && (
          <div className="dashboardDisplay">
            <h1>Dashboard</h1>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="ordersDisplay">
            <h1>Orders</h1>
            {Array.isArray(orders) && orders.length === 0 ? (
              <p>You have no orders yet.</p>
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
            <h1>Addresses</h1>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="detailsDisplay">
            <h1>Account Details</h1>

            <div className="inputRow">
              <div className="inputGroup">
                <label>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="halfInput"
                />
              </div>
              <div className="inputGroup">
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="halfInput"
                />
              </div>
            </div>

            <div className="inputGroup">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="fullInput"
              />
            </div>

            <div className="inputGroup">
              <label>Current Password <small>(leave blank to leave unchanged)</small></label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="fullInput"
              />
            </div>

            <div className="inputGroup">
              <label>New Password <small>(leave blank to leave unchanged)</small></label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="fullInput"
              />
            </div>

            <div className="inputGroup">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="fullInput"
              />
            </div>

            <button
              onClick={handleSaveChanges}
              className="saveButton"
            >
              Save Changes
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
