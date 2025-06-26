import React, { useState } from 'react';
import {
  PiStarFill,
  PiHeart,
  PiEye,
  PiShoppingCart,
  PiShoppingCartFill,
  PiHeartFill,
} from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { addToCart } from '../api/api';

function Product({
  product,
  addToWishlist,
  removeFromWishlist,
  cart = [],
  wishlist = [],
  fetchCart,
  isListView,
}) {
  const { i18n, t } = useTranslation();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const navigate = useNavigate();

  const isInCart = cart.some((item) => item.productId?._id === product._id);
  const isInWishlist = wishlist.some((item) => item._id === product._id);

  const renderStars = (count) => Array.from({ length: count }, (_, i) => <PiStarFill key={i} />);

  const handleAddToWishlist = () => {
    if (!product) return;

    if (isInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = async () => {
    if (!product || isInCart || isAddingToCart) return;

    try {
      await addToCart(product._id, 1);
      await fetchCart();
    } catch (error) {
      if (error?.response?.status === 401 || error.message.includes('Not authorized')) {
        navigate('/login');
      } else {
        console.error('Failed to add to cart:', error);
      }
    }
  };

  return (
    <div className={`product ${isListView ? 'list-view' : ''}`}>
      <div className="productImageContainer">
        <Link to={`/product/${product._id}`}>
          <img
            className="mainImage"
            src={`/productImg/product${product.image}.jpg`}
            alt={product.name?.[i18n.language] || product.name}
          />
          <img
            className="hoverImage"
            src={`/productImg/product${product.hoverImage}.jpg`}
            alt={product.name?.[i18n.language] || product.name}
          />
        </Link>

        {!isListView && (
          <div className="buttonGroup">
            <button
              onClick={handleAddToWishlist}
              className="productHoverButton"
            >
              {isInWishlist ? <PiHeartFill style={{ color: '#000000' }} /> : <PiHeart />}
            </button>

            <Link to={`/product/${product._id}`}>
              <button className="productHoverButton">
                <PiEye />
              </button>
            </Link>

            <button
              disabled={isInCart || isAddingToCart}
              onClick={handleAddToCart}
              className="productHoverButton"
            >
              {isInCart ? <PiShoppingCartFill style={{ color: '#000000' }} /> : <PiShoppingCart />}
            </button>
          </div>
        )}
      </div>

      <div className="productTextContainer">
        <Link to={`/product/${product._id}`}>{product.name?.[i18n.language] || product.name}</Link>
        <p>{product.price}</p>
        <div className="ratingContainer">{renderStars(product.rating)}</div>

        {isListView && (
          <>
            <div className="productDescription">{product.description}</div>
            <div className="listButtonGroup">
              <button
                onClick={handleAddToWishlist}
                className="listButton"
              >
                {isInWishlist ? <PiHeartFill style={{ color: '#000000' }} /> : <PiHeart />}
              </button>

              <Link to={`/product/${product._id}`}>
                <button className="listButton">
                  <PiEye />
                </button>
              </Link>

              <button
                disabled={isInCart || isAddingToCart}
                onClick={handleAddToCart}
                className="listButton"
              >
                {isInCart ? (
                  <PiShoppingCartFill style={{ color: '#000000' }} />
                ) : (
                  <PiShoppingCart />
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Product;
