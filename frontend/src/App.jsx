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
import LoginAndRegister from './routes/LoginAndRegister';
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

function App() {
  useTitle();
  const location = useLocation();

  return (
    <>
      <Header />
      <Main>
        {location.pathname !== '/' && <RouteBanner />}

        <Loading />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/shop"
            element={<Shop />}
          />
          <Route
            path="/product/:id"
            element={<SingleProduct />}
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
            element={<Cart />}
          />
          <Route
            path="/checkout"
            element={<Checkout />}
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
            path="/login-register"
            element={<LoginAndRegister />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/singleProduct"
            element={<SingleProduct />}
          />
          <Route
            path="/wishlist"
            element={<Wishlist />}
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
        </Routes>
      </Main>
      <Footer />
    </>
  );
}

export default App;
