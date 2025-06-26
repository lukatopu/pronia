import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PiStarFill, PiHeart, PiHeartFill } from 'react-icons/pi';
import { BsArrowRepeat } from 'react-icons/bs';
import Counter from '../components/Counter';
import { getProducts, addToCart } from '../api/api.js';
import { useLoader } from '../hooks/useLoader.jsx';
import Services from '../components/Services.jsx';
import { useTranslation } from 'react-i18next';

function SingleProduct({
  addToWishlist,
  removeFromWishlist,
  cart,
  wishlist,
  fetchCart,
  fetchWishlist,
}) {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);
  const { id } = useParams();
  const { useDataLoader } = useLoader();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    useDataLoader(() => getProducts().then((data) => setProducts(data)));
  }, []);

  const product = products.find((p) => p._id === id || p.id === id);

  if (!product) return <h2>{t('ProductNotFound')}</h2>;

  const isInCart = product && cart.some((item) => item.productId?._id === product._id);
  const isInWishlist = product && wishlist.some((item) => item._id === product._id);

  const renderStars = (count) => {
    return Array.from({ length: count }, (_, i) => <PiStarFill key={i} />);
  };

  const handleAddToWishlist = async () => {
    if (!product || isUpdatingWishlist) return;
    try {
      if (isInWishlist) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
      await fetchWishlist();
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!product || isAddingToCart) return;

    try {
      setIsAddingToCart(true);
      await addToCart(product._id, quantity);
      await fetchCart();
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="singleProductPage">
      <div className="singleProductImage">
        <img
          src={`/productImg/product${product.image}.jpg`}
          alt={product.name?.[i18n.language] || product.name}
        />
      </div>
      <div className="singleProductDetails">
        <h1>{product.name?.[i18n.language] || product.name}</h1>
        <p className="price">${product.price}</p>
        <div className="ratingContainer">{renderStars(product.rating)}</div>
        <div className="productDescription">
          <p>{product.description}</p>
        </div>
        <div className="buttonsContainer">
          <Counter
            value={quantity}
            onChange={(newQuantity) => setQuantity(Math.max(1, newQuantity))}
            min={1}
            max={99}
          />
          <button
            onClick={handleAddToCart}
            className="addToCartButton"
            disabled={isInCart || isAddingToCart}
          >
            {isAddingToCart ? t('Adding...') : isInCart ? t('AlreadyInCart') : t('AddToCart')}
          </button>
          <button
            onClick={handleAddToWishlist}
            className="wishlistButton"
            disabled={isUpdatingWishlist}
          >
            {isInWishlist ? <PiHeartFill /> : <PiHeart />}
          </button>
          <button
            className="compareButton"
            aria-label={t('Compare')}
          >
            <BsArrowRepeat />
          </button>
        </div>
        <Services small={true} />
      </div>
    </div>
  );
}

export default SingleProduct;
