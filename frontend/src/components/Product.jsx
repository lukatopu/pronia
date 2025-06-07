import React from 'react';
import { PiStarFill, PiHeartStraightThin, PiEyeThin, PiShoppingCartThin, PiShoppingCartFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Product({ product, addToWishlist, addToCart, cart }) {
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

  return (
    <div className="product">
      <div className="productImageContainer">
        <Link to={`/product/${product._id}`}>
          <img
            className="mainImage"
            src={product.image}
            alt={product.name?.[i18n.language] || product.name}
          />
          <img
            className="hoverImage"
            src={product.hoverImage}
            alt={product.name?.[i18n.language] || product.name}
          />
        </Link>
        <div className="buttonGroup">
          <button onClick={handleAddToWishlist} className="productHoverButton">
            <PiHeartStraightThin />
          </button>
          <Link>
            <button className="productHoverButton">
              <PiEyeThin />
            </button>
          </Link>
          <button
            disabled={isInCart}
            onClick={handleAddToCart}
            className="productHoverButton"
          >
            {isInCart ? <PiShoppingCartFill/> : <PiShoppingCartThin />}
          </button>
        </div>
      </div>
      <div className="productTextContainer">
        <Link to={`/product/${product._id}`}>
          {product.name?.[i18n.language] || product.name}
        </Link>
        <p>{product.price}</p>
        <div className="ratingContainer">{renderStars(product.rating)}</div>
      </div>
    </div>
  );
}

export default Product;
