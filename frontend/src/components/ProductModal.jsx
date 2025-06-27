import React, { useState, useEffect } from 'react';
import { PiStarFill, PiHeart, PiHeartFill } from 'react-icons/pi';
import { BsArrowRepeat } from 'react-icons/bs';
import Counter from '../components/Counter';
import { getProducts, addToCart } from '../api/api.js';
import Services from '../components/Services.jsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';

function ProductModal({
 productId,
 addToWishlist,
 removeFromWishlist,
 cart,
 wishlist,
 fetchCart,
 fetchWishlist,
 onClose,
 isOpen
}) {
 const [products, setProducts] = useState([]);
 const [quantity, setQuantity] = useState(1);
 const [isAddingToCart, setIsAddingToCart] = useState(false);
 const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);
 const [isTooltipActive, setIsTooltipActive] = useState(false);
 const { i18n, t } = useTranslation();
 const { currency } = useCurrency();
 const navigate = useNavigate();


 const [shouldRender, setShouldRender] = useState(false);
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
  getProducts().then((data) => setProducts(data));
 }, []);


 useEffect(() => {
  if (isOpen) {
   setShouldRender(true);
   setTimeout(() => setIsVisible(true), 10);
  } else {
   setIsVisible(false);
   setTimeout(() => setShouldRender(false), 300);
  }
 }, [isOpen]);

 const product = products.find(
  (p) => p._id === productId || p.id === productId
 );

 if (!shouldRender) return null;
 if (!product) return null;

 const isInCart = cart.some(
  (item) => item.productId?._id === product._id
 );
 const isInWishlist = wishlist.some(
  (item) => item._id === product._id
 );

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

 const renderStars = (count) =>
  Array.from({ length: count }, (_, i) => <PiStarFill key={i} />);

 const handleAddToWishlist = async () => {
  if (!product || isUpdatingWishlist) return;

  try {
   setIsUpdatingWishlist(true);
   if (isInWishlist) {
    await removeFromWishlist(product._id);
   } else {
    await addToWishlist(product._id);
   }
   await fetchWishlist();
  } catch (error) {
   console.error('Failed to update wishlist:', error);
  } finally {
   setIsUpdatingWishlist(false);
  }
 };

 const handleAddToCart = async () => {
  if (!product || isAddingToCart) return;

  try {
   setIsAddingToCart(true);
   await addToCart(product._id, quantity);
   await fetchCart();
  } catch (error) {
   if (
    error?.response?.status === 401 ||
    error.message.includes('Not authorized')
   ) {
    navigate('/login');
   }
  } finally {
   setIsAddingToCart(false);
  }
 };

 const handleCompare = () => {
  localStorage.setItem('compareProduct', JSON.stringify(product));
  navigate('/compare');
 };

 const handleTooltip = () => {
  setIsTooltipActive(true);
 };

 const closeTooltip = () => {
  setIsTooltipActive(false);
 };

 return (
  <>
   <div
    className={`productModalOverlay ${isVisible ? 'open' : ''}`}
    onClick={onClose}
   ></div>
   <div className={`productModalWrapper ${isVisible ? 'open' : ''}`}>
    <div className="singleProductImage">
     <img
      src={`/productImg/product${product.image}.jpg`}
      alt={product.name?.[i18n.language] || product.name}
     />
    </div>
    <div className="singleProductDetails">
     <div className="productNameContainer">
      <h1>{product.name?.[i18n.language] || product.name}</h1>
      <div className="closeSearchContainer">
       <button
        onClick={() => {
         closeTooltip();
         onClose();
        }}
        onMouseEnter={handleTooltip}
        onMouseLeave={closeTooltip}
        className="closeSearch"
       >
        X
       </button>
       <span className={`tooltip ${isTooltipActive ? 'active' : ''}`}>
        {t('Close')}
       </span>
      </div>
     </div>
     <p className="price">
      {renderCurrencySymbol(currency)}
      {convertPrice(product.price, currency)}
     </p>
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
       {isAddingToCart
        ? t('Adding')
        : isInCart
         ? t('AlreadyInCart')
         : t('AddToCart')}
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
       onClick={handleCompare}
       aria-label={t('Compare')}
      >
       <BsArrowRepeat />
      </button>
     </div>
     <Services small={true} />
    </div>
   </div>
  </>
 );
}

export default ProductModal;
