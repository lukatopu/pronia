import axios from 'axios';

export const getProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/products');
    return response.data;
  } catch {
    throw new Error('Error fetching products');
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/users/login',
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    return response;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Login failed');
  }
};

export const registerUser = async (firstName, lastName, email, password) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/users/register',
      { firstName, lastName, email, password },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    return response;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Registration failed');
  }
};

export const forgotPasswordUser = (data) => {
  return axios.put(`http://localhost:3000/api/users/forgot-password`, data, {
    withCredentials: true,
  });
};

export const resetPasswordUser = (data, token) => {
  return axios.put(`http://localhost:3000/api/users/reset-password`, data, {
    headers: { Authorization: token },
    withCredentials: true,
  });
};
