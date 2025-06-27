import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoader } from '../hooks/useLoader';
import Counter from '../components/Counter';
import { useTranslation } from 'react-i18next';
import { removeFromCart, updateCartItem } from '../api/api.js';
import { useCurrency } from '../context/CurrencyContext';

function Cart({ cart, fetchCart }) {
  const { useFakeLoader } = useLoader();
  const { i18n, t } = useTranslation();
  const [cartItems, setCartItems] = useState(cart);

  useEffect(() => useFakeLoader(), []);
  useEffect(() => setCartItems(cart), [cart]);

  const { currency } = useCurrency();

  const convertPrice = (gelPrice, currency) => {
    const rates = {
      GEL: 1,
      USD: 0.37,
      EUR: 0.34,
    };

    const numeric = parseFloat(gelPrice.toString().replace(/[^\d.]/g, '')) || 0;
    return (numeric * rates[currency]).toFixed(2);
  };

  const renderCurrencySymbol = (currency) => {
    switch (currency) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'GEL':
        return '₾';
      default:
        return currency;
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + parseFloat(item.productId.price) * parseInt(item.quantity);
    }, 0);
  };

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
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId._id === productId ? { ...item, quantity: newQuantity } : item
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
        <>
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
                    <p>
                      {renderCurrencySymbol(currency)}
                      {convertPrice(item.productId.price, currency)}
                    </p>
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
                    <p>
                      {renderCurrencySymbol(currency)}
                      {(convertPrice(item.productId.price, currency) * item.quantity).toFixed(2)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <div className="cartTotal">
        <h1>Cart Totals</h1>
        <div className="subTotalContainer">
          <p>Subtotal</p>
          <p>
            {renderCurrencySymbol(currency)}
            {convertPrice(calculateTotal(), currency)}
          </p>
        </div>
        <div className="totalContainer">
          <p>Total</p>
          <p>
            {renderCurrencySymbol(currency)}
            {convertPrice(calculateTotal() + 5.99, currency)}
          </p>
        </div>

        <a href="/checkout">
          <button className="proceedCheckoutButton">Proceed To Checkout</button>
        </a>
      </div>
    </div>
  );
}

export default Cart;
