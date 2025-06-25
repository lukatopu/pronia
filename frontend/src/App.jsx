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
import { getCart } from './api/api.js';

function App() {
  useTitle();
  const location = useLocation();

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch cart from backend on component mount
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await getCart();
        setCart(response.data || []);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    };
    fetchCartData();
  }, []);

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((p) => p._id === product._id);
      if (!exists) {
        return [...prevWishlist, product];
      }
      return prevWishlist;
    });
  };

  // Function to refresh cart from backend
  const fetchCart = async () => {
    try {
      const response = await getCart();
      setCart(response.data || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
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
                cart={cart}
                wishlist={wishlist}
                fetchCart={fetchCart}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <Shop
                addToWishlist={addToWishlist}
                cart={cart}
                wishlist={wishlist}
                fetchCart={fetchCart}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <SingleProduct
                addToWishlist={addToWishlist}
                cart={cart}
                wishlist={wishlist}
                fetchCart={fetchCart}
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
            element={<Cart cart={cart} fetchCart={fetchCart} />}
          />
          <Route
            path="/checkout"
            element={<Checkout cart={cart} />}
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
    </>
  );
}

export default App;