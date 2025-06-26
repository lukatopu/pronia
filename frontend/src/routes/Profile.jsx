import React, { useState, useEffect } from 'react';
import { updateUserProfile, logoutUser, getOrders } from '../api/api';

function Profile() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };

    fetchOrders();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = '/login';
    } catch (err) {
      setMessage('Logout failed');
    }
  };

  const handleSaveChanges = async () => {
    setMessage('');
    if (
      (currentPassword || newPassword || confirmNewPassword) &&
      !(currentPassword && newPassword && confirmNewPassword)
    ) {
      setMessage('Please fill all password fields to change password.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage("New password and confirm password don't match.");
      return;
    }

    try {
      const updateData = { firstName, lastName, email };
      if (currentPassword && newPassword) {
        updateData.currentPassword = currentPassword;
        updateData.newPassword = newPassword;
      }

      await updateUserProfile(updateData);

      setMessage('Profile updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      setMessage(err.message);
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
        <button
          className="tabButton"
          onClick={handleLogout}
        >
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
                {Array.isArray(orders) &&
                  orders.map((order) => (
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
            <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ flex: 1, padding: '8px' }}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{ flex: 1, padding: '8px' }}
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', marginBottom: '15px', padding: '8px' }}
            />

            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{ width: '100%', marginBottom: '15px', padding: '8px' }}
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: '100%', marginBottom: '15px', padding: '8px' }}
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              style={{ width: '100%', marginBottom: '15px', padding: '8px' }}
            />

            <button
              onClick={handleSaveChanges}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Save Changes
            </button>

            {message && <p style={{ marginTop: '15px', color: 'red' }}>{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
