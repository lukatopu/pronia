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

// Add to cart
export const addToCart = async (productId, quantity) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/users/cart',
      { productId, quantity },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Failed to add to cart');
  }
};

// Remove from cart
export const removeFromCart = async (productId) => {
  try {
    const response = await axios.delete(
      'http://localhost:3000/api/users/cart',
      { 
        data: { productId },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Failed to remove from cart');
  }
};

// Get cart
export const getCart = async () => {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/users/cart',
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Failed to get cart');
  }
};



// Update cart item quantity
export const updateCartItem = async (productId, quantity) => {
  try {
    const response = await axios.put(  // Change from POST to PUT
      'http://localhost:3000/api/users/cart/update',
      { productId, quantity },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Failed to update cart item');
  }
};