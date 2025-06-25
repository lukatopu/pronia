import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoader } from '../hooks/useLoader';
import Counter from '../components/Counter';
import { useTranslation } from 'react-i18next';
import { removeFromCart, updateCartItem } from '../api/api.js';

function Cart({ cart, fetchCart }) {
  const { useFakeLoader } = useLoader();
  const { i18n, t } = useTranslation();
  const [cartItems, setCartItems] = useState(cart);

  useEffect(() => useFakeLoader(), []);
  useEffect(() => setCartItems(cart), [cart]);

    const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
      await fetchCart();
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.productId._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
      await updateCartItem(productId, newQuantity);
      await fetchCart();
    } catch (error) {
      console.error('Failed to update quantity:', error.message);
      await fetchCart();
    }
  };

  return (
    <div className="cartPage">
      {cartItems.length === 0 ? (
        <p>NOTHING IN CART</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>{t('Remove')}</th>
              <th>{t('Images')}</th>
              <th>{t('Product')}</th>
              <th>{t('UnitPrice')}</th>
              <th>{t('Quantity')}</th>
              <th>{t('Total')}</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.productId._id}>
                <td>
                  <button onClick={() => handleRemoveFromCart(item.productId._id)}>x</button>
                </td>
                <td>
                  <Link to={`/product/${item.productId._id}`}>
                    <img
                      className="wishlistProductImage"
                      src={`/productImg/product${item.productId.image}.jpg`}
                      alt={item.productId.name?.[i18n.language] || item.productId.name}
                    />
                  </Link>
                </td>
                <td>
                  <Link to={`/product/${item.productId._id}`}>
                    {item.productId.name?.[i18n.language] || item.productId.name}
                  </Link>
                </td>
                <td>
                  <p>${item.productId.price}</p>
                </td>
                <td>
                  <Counter
                    value={item.quantity}
                    onChange={(newQuantity) =>
                      handleQuantityChange(item.productId._id, newQuantity)
                    }
                  />
                </td>
                <td>
                  <p>${(parseFloat(item.productId.price) * parseInt(item.quantity)).toFixed(2)}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Cart;