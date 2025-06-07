import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PiStarFill, PiHeartStraight } from 'react-icons/pi';
import { BsArrowRepeat } from 'react-icons/bs';
import Counter from '../components/Counter';
import { getProducts } from '../api/api.js';
import { useLoader } from '../hooks/useLoader.jsx';
import Services from '../components/Services.jsx';
import { useTranslation } from 'react-i18next';

function SingleProduct({ addToWishlist, addToCart, cart }) {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const { useDataLoader } = useLoader();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    useDataLoader(() => getProducts().then((data) => setProducts(data)));
  }, []);

  const product = products.find((p) => p._id === id || p.id === id);

  // ✅ Check if this product is in the cart
  const isInCart = product && cart.some((item) => item._id === product._id);

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

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="singleProductPage">
      <div className="singleProductImage">
        <img
          src={product.image}
          alt={product.name?.[i18n.language] || product.name}
        />
      </div>
      <div className="singleProductDetails">
        <h1>{product.name?.[i18n.language] || product.name}</h1>
        <p className="price">{product.price}</p>
        <div className="ratingContainer">{renderStars(product.rating)}</div>
        <div className="productDescription">
          <p>{product.description}</p>
        </div>
        <div className="buttonsContainer">
          <Counter />
          <button
            onClick={handleAddToCart}
            className="addToCartButton"
            disabled={isInCart}
          >
            {isInCart ? t('AlreadyInCart') : t('AddToCart')}
          </button>
          <button
            onClick={handleAddToWishlist}
            className="wishlistButton"
          >
            <PiHeartStraight />
          </button>
          <button className="compareButton">
            <BsArrowRepeat />
          </button>
        </div>
        <Services small={true} />
      </div>
    </div>
  );
}

export default SingleProduct;
