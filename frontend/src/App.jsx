import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Main from './layouts/Main';
import About from './routes/About';
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
import RedirectIfAuthenticated from './utils/RedirectIfAuthenticated.jsx';
import ScrollToTop from './utils/ScrollToTop.jsx';
import RequireAuth from './utils/RequireAuth.jsx';

function App() {
  useTitle();
  const location = useLocation();

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await getCart();
      setCart(response.data || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };


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

  const addToWishlist = async (productId) => {
    try {
      await apiAddToWishlist(productId);
      await fetchWishlist();
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    }
  };

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
        <ScrollToTop />
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
          <Route path="/aboutUs" element={<About />} />
          <Route path="/cart" element={<RequireAuth><Cart cart={cart} fetchCart={fetchCart} /></RequireAuth>} />
          <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/compare" element={<Compare />} />


          <Route
            path="/login"
            element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/register"
            element={
              <RedirectIfAuthenticated>
                <Register />
              </RedirectIfAuthenticated>
            }
          />

          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route
            path="/wishlist"
            element={
              <RequireAuth>
                <Wishlist
                  wishlist={wishlist}
                  cart={cart}
                  fetchCart={fetchCart}
                  removeFromWishlist={removeFromWishlist}
                  fetchWishlist={fetchWishlist}
                />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </Main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}

export default App;
