import React from 'react';
import { PiStarFill, PiHeartStraightThin, PiEyeThin, PiShoppingCartThin } from 'react-icons/pi';
import { Link } from 'react-router-dom';

function Product({ product }) {
  const renderStars = (count) => {
    return Array.from({ length: count }, (_, i) => <PiStarFill key={i} />);
  };

  return (
    <div className="product">
      <div className="productImageContainer">
        <Link to={`/product/${product._id}`}>
          <img
            className="mainImage"
            src={product.image}
            alt={product.name}
          />
          <img
            className="hoverImage"
            src={product.hoverImage}
            alt={product.name}
          />
        </Link>
        <div className="buttonGroup">
          <Link to="/wishlist">
            <button className="productHoverButton">
              <PiHeartStraightThin />
            </button>
          </Link>
          <Link>
            <button className="productHoverButton">
              <PiEyeThin />
            </button>
          </Link>
          <Link to="/cart">
            <button className="productHoverButton">
              <PiShoppingCartThin />
            </button>
          </Link>
        </div>
      </div>
      <div className="productTextContainer">
        <Link to={`/product/${product.id}`}>{product.name}</Link>
        <p>{product.price}</p>
        <div className="ratingContainer">{renderStars(product.rating)}</div>
      </div>
    </div>
  );
}

export default Product;
