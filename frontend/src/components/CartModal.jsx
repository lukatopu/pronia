import React from 'react';
import { Link } from 'react-router-dom';

function CartModal({ cart = [], isCartClicked, onClose, handleCartOverlay, isCartOverlayHidden }) {
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
          <h1>Shopping Cart</h1>
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
                  <p>{item.productId.name?.eng || 'No name'}</p>
                  <p>
                    {item.quantity} × ${item.productId.price}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="emptyCart">Your cart is empty</p>
          )}
        </div>

        {cart.length > 0 && (
          <>
            <div className="priceContainer">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>

            <div className="buttonsContainer">
              <Link
                to="/cart"
                onClick={handleCartLogic}
              >
                <button>View Cart</button>
              </Link>
              <Link
                to="/checkout"
                onClick={handleCartLogic}
              >
                <button>Checkout</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CartModal;
