import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../api/api'; // ✅ Ensure this is implemented

function RedirectIfAuthenticated({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser(); // will throw if not logged in
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return null;

  return authenticated ? <Navigate to="/" /> : children;
}

export default RedirectIfAuthenticated;
