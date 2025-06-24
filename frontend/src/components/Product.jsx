import React from 'react';
import {
  PiStarFill,
  PiHeart,
  PiEye,
  PiShoppingCart,
  PiShoppingCartFill,
  PiHeartFill,
} from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Product({ product, addToWishlist, addToCart, cart = [], wishlist = [] }) {
  const { i18n } = useTranslation();

  const renderStars = (count) => {
    return Array.from({ length: count }, (_, i) => <PiStarFill key={i} />);
  };

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    if (product && !isInCart) {
      addToCart(product);
    }
  };

  const isInCart = cart.some((item) => item._id === product._id);
  const isInWishlist = wishlist.some((item) => item._id === product._id);

  return (
    <div className="product">
      <div className="productImageContainer">
        <Link to={`/product/${product._id}`}>
          <img
            className="mainImage"
            src={`/productImg/product${product.image}.jpg`}
            alt={product.name?.[i18n.language] || product.name}
          />
          <img
            className="hoverImage"
            src={product.hoverImage}
            alt={product.name?.[i18n.language] || product.name}
          />
        </Link>
        <div className="buttonGroup">
          <button
            disabled={isInWishlist}
            onClick={handleAddToWishlist}
            className="productHoverButton"
          >
            {isInWishlist ? <PiHeartFill style={{ color: '#000000' }} /> : <PiHeart />}
          </button>
          <Link>
            <button className="productHoverButton">
              <PiEye />
            </button>
          </Link>
          <button
            disabled={isInCart}
            onClick={handleAddToCart}
            className="productHoverButton"
          >
            {isInCart ? <PiShoppingCartFill style={{ color: '#000000' }} /> : <PiShoppingCart />}
          </button>
        </div>
      </div>
      <div className="productTextContainer">
        <Link to={`/product/${product._id}`}>{product.name?.[i18n.language] || product.name}</Link>
        <p>{product.price}</p>
        <div className="ratingContainer">{renderStars(product.rating)}</div>
      </div>
    </div>
  );
}

export default Product;
