import axios from 'axios';

export const getProducts = async () => {
  try {
    const response = await axios.get('/api/products');
    return response.data;
  } catch {
    throw new Error('Error fetching products');
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      '/api/users/login',
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
      '/api/users/register',
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
  return axios.put(`/api/users/forgot-password`, data, {
    withCredentials: true,
  });
};

export const resetPasswordUser = (data, token) => {
  return axios.put(`/api/users/reset-password`, data, {
    headers: { Authorization: token },
    withCredentials: true,
  });
};

export const addToCart = async (productId, quantity) => {
  try {
    const response = await axios.post(
      '/api/users/cart/add',
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

export const removeFromCart = async (productId) => {
  try {
    const response = await axios.delete('/api/users/cart/remove', {
      data: { productId },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Failed to remove from cart');
  }
};

export const getCart = async () => {
  try {
    const response = await axios.get('/api/users/cart', {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Failed to get cart');
  }
};

export const updateCartItem = async (productId, quantity) => {
  try {
    const response = await axios.put(
      '/api/users/cart/update',
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

export const clearCart = async () => {
  try {
    const response = await axios.delete('/api/users/cart/clear', {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Failed to clear cart');
  }
};

export const addToWishlist = async (productId) => {
  try {
    const response = await axios.post(
      '/api/users/wishlist/add',
      { productId },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Failed to add to wishlist');
  }
};

export const removeFromWishlist = async (productId) => {
  try {
    const response = await axios.delete('/api/users/wishlist/remove', {
      data: { productId },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Failed to remove from wishlist');
  }
};

export const getWishlist = async () => {
  try {
    const response = await axios.get('/api/users/wishlist', {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Failed to get wishlist');
  }
};

export const updateUserProfile = async (updateData) => {
  try {
    const response = await axios.put('/api/users/update-profile', updateData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Failed to update profile');
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post('/api/users/logout', null, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error('Logout failed');
  }
};

export const placeOrder = async () => {
  try {
    const response = await axios.post(
      '/api/users/orders/place',
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Failed to place order');
  }
};

export const getOrders = async () => {
  try {
    const response = await axios.get('/api/users/orders', {
      withCredentials: true,
    });
    return response.data.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Failed to fetch orders');
  }
};


export const getCurrentUser = async () => {
  try {
    const response = await axios.get('/api/users/me', {
      withCredentials: true,
    });
    return response.data.data;
  } catch (err) {
    throw new Error(err.response?.data?.err || 'Failed to get user info');
  }
};