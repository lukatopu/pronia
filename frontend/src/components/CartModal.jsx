import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function CartModal({ cart = [], isCartClicked, onClose, handleCartOverlay, isCartOverlayHidden }) {
  const { t } = useTranslation();

  const subtotal = cart.reduce((total, item) => {
    return total + parseFloat(item.productId.price) * item.quantity;
  }, 0);

  const handleCartLogic = () => {
    onClose();
    handleCartOverlay();
  };

  return (
    <>
      <div
        onClick={handleCartLogic}
        className={`overlay ${isCartOverlayHidden ? '' : 'active'}`}
      ></div>
      <div className={`cartModal ${isCartClicked ? 'active' : ''}`}>
        <div className="modalTitle">
          <h1>{t('ShoppingCart')}</h1>
          <h3 onClick={handleCartLogic}>X</h3>
        </div>

        <div className="productsContainer">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                className="cartItem"
                key={item.productId._id}
              >
                <img
                  src={`/productImg/product${item.productId.image}.jpg`}
                  alt={item.productId.name?.eng || 'Product'}
                  className="cartItemImage"
                />
                <div className="cartItemInfo">
                  <p>{item.productId.name?.eng || t('NoName')}</p>
                  <p>
                    {item.quantity} × ${item.productId.price}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="emptyCart">{t('EmptyCart')}</p>
          )}
        </div>

        {cart.length > 0 && (
          <>
            <div className="priceContainer">
              <p>{t('Subtotal')}</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>

            <div className="buttonsContainer">
              <Link
                to="/cart"
                onClick={handleCartLogic}
              >
                <button>{t('ViewCart')}</button>
              </Link>
              <Link
                to="/checkout"
                onClick={handleCartLogic}
              >
                <button>{t('Checkout')}</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CartModal;