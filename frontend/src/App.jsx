import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Main from './layouts/Main';
import About from './routes/About';
import Blog from './routes/Blog';
import Cart from './routes/Cart';
import Checkout from './routes/Checkout';
import Compare from './routes/Compare';
import Contact from './routes/Contact';
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import Profile from './routes/Profile';
import Shop from './routes/Shop';
import SingleProduct from './routes/SingleProduct';
import Wishlist from './routes/Wishlist';
import Pages from './routes/Pages';
import RouteBanner from './components/RouteBanner';
import { Routes, Route, useLocation } from 'react-router-dom';
import useTitle from './hooks/useTitle';
import './styles/main.scss';
import Loading from './components/Loading';
import ForgotPassword from './routes/ForgotPassword';
import ResetPassword from './routes/ResetPassword';
import { useState, useEffect } from 'react';
import Register from './routes/Register';
import Login from './routes/Login';
import {
  getCart,
  getWishlist,
  addToWishlist as apiAddToWishlist,
  removeFromWishlist as apiRemoveFromWishlist,
} from './api/api.js';
import ScrollToTopButton from './components/ScrollToTopButton.jsx';

function App() {
  useTitle();
  const location = useLocation();

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch cart data
  const fetchCart = async () => {
    try {
      const response = await getCart();
      setCart(response.data || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  // Fetch wishlist data
  const fetchWishlist = async () => {
    try {
      const response = await getWishlist();
      setWishlist(response.data || []);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchWishlist();
  }, []);

  // Add product to wishlist (calls backend)
  const addToWishlist = async (productId) => {
    try {
      await apiAddToWishlist(productId);
      await fetchWishlist();
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    }
  };

  // Remove product from wishlist (calls backend)
  const removeFromWishlist = async (productId) => {
    try {
      await apiRemoveFromWishlist(productId);
      await fetchWishlist();
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  return (
    <>
      <Header cart={cart} />
      <Main>
        {location.pathname !== '/' && <RouteBanner />}

        <Loading />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
                cart={cart}
                wishlist={wishlist}
                fetchCart={fetchCart}
                fetchWishlist={fetchWishlist}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <Shop
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
                cart={cart}
                wishlist={wishlist}
                fetchCart={fetchCart}
                fetchWishlist={fetchWishlist}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <SingleProduct
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
                cart={cart}
                wishlist={wishlist}
                fetchCart={fetchCart}
                fetchWishlist={fetchWishlist}
              />
            }
          />
          <Route
            path="/aboutUs"
            element={<About />}
          />
          <Route
            path="/blog"
            element={<Blog />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                fetchCart={fetchCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                setCart={setCart}
              />
            }
          />
          <Route
            path="/contact"
            element={<Contact />}
          />
          <Route
            path="/compare"
            element={<Compare />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                cart={cart}
                fetchCart={fetchCart}
                removeFromWishlist={removeFromWishlist}
                fetchWishlist={fetchWishlist}
              />
            }
          />
          <Route
            path="/notFound"
            element={<NotFound />}
          />
          <Route
            path="/pages"
            element={<Pages />}
          />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          />
        </Routes>
      </Main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}

export default App;
