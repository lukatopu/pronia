import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PiStarFill, PiHeartStraight } from 'react-icons/pi';
import { BsArrowRepeat } from 'react-icons/bs';
import Counter from '../components/Counter';
import { getProducts } from '../api/api.js';
import { useLoader } from '../hooks/useLoader.jsx';
import Services from '../components/Services.jsx';

function SingleProduct({ addToWishlist, addToCart }) {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  const { useDataLoader } = useLoader();

  useEffect(() => {
    useDataLoader(() => getProducts().then((data) => setProducts(data)));
  }, []);

  const product = products.find((p) => p._id === id || p.id === id);

  const renderStars = (count) => {
    return Array.from({ length: count }, (_, i) => <PiStarFill key={i} />);
  };

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="singleProductPage">
      <div className="singleProductImage">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="singleProductDetails">
        <h1>{product.name}</h1>
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
          >
            ADD TO CART
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
