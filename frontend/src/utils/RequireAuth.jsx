import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../api/api';
import { useLoader } from '../hooks/useLoader';

function RequireAuth({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const { useFakeLoader } = useLoader();

  useEffect(() => {
    const checkAuth = async () => {
      await useFakeLoader();

      try {
        await getCurrentUser();
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

  return authenticated ? children : <Navigate to="/login" replace />;
}

export default RequireAuth;
