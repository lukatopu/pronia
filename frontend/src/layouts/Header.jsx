import React, { useState, useEffect, useRef } from 'react';
import {
  PiPhone,
  PiMagnifyingGlassThin,
  PiUserThin,
  PiHeartStraightThin,
  PiShoppingBagThin,
  PiCaretDownBold,
  PiList,
} from 'react-icons/pi';
import proniaLogo from '../images/proniaLogo.png';
import SearchBlur from '../components/SearchBlur';
import { Link } from 'react-router-dom';

function Header() {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [triggerHeight, setTriggerHeight] = useState(0);
  const [isUserClicked, setIsUserClicked] = useState(false);
  const headerRef = useRef(null);

  const handleSearch = () => {
    setIsSearchClicked(true);
  };

  const closeSearch = () => {
    setIsSearchClicked(false);
  };

  const handleUserClick = () => {
    setIsUserClicked((prev) => !prev);
  };

  useEffect(() => {
    if (headerRef.current) {
      setTriggerHeight(headerRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY >= triggerHeight);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [triggerHeight]);

  return (
    <header ref={headerRef}>
      <div className="headerTop">
        <p>HELLO EVERYONE! 25% Off All Products</p>
        <div className="curAndLanguageContainer">
          <span>
            USD <PiCaretDownBold />
          </span>
          <span>
            ENGLISH <PiCaretDownBold />
          </span>
        </div>
      </div>

      <div className="headerMiddle">
        <div className="contactNumber">
          <div className="phoneIconContainer">
            <PiPhone className="phoneIcon" />
          </div>
          <p>+00 123 456 789</p>
        </div>
        <div>
          <a href="/">
            <img
              src={proniaLogo}
              alt="Pronia Logo"
            />
          </a>
        </div>
        <nav>
          <PiMagnifyingGlassThin onClick={handleSearch} />
          <div className="userIconContainer">
            <PiUserThin
              onClick={handleUserClick}
              className="userIcon"
            />
            <div className={`userIconDropdown ${isUserClicked ? 'clicked' : ''}`}>
              <button>My account</button>
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/register">
                <button>Register</button>
              </Link>
            </div>
          </div>
          <Link to="/wishlist">
            <PiHeartStraightThin className="heartIcon" />
          </Link>
          <Link to="/cart">
            <PiShoppingBagThin />
          </Link>
          <PiList className="burgerIcon" />
        </nav>
        <SearchBlur
          closeSearch={closeSearch}
          isActive={isSearchClicked}
        />
      </div>

      <nav className="headerBottom">
        <Link to="/">home</Link>
        <Link to="/shop">shop</Link>
        <Link to="/blog">blog</Link>
        <Link to="/aboutUs">about us</Link>
        <Link to="/pages">pages</Link>
        <Link to="/contact">contact us</Link>
      </nav>

      <div className={`fixedHeader ${isFixed ? 'visible' : ''}`}>
        <div className="fixedHeaderContent">
          <a href="/">
            <img
              src={proniaLogo}
              alt="Pronia Logo"
              className="fixed-logo"
            />
          </a>
          <nav className="fixedHeaderNav">
            <Link to="/">home</Link>
            <Link to="/shop">shop</Link>
            <Link to="/blog">blog</Link>
            <Link to="/aboutUs">about us</Link>
            <Link to="/pages">pages</Link>
            <Link to="/contact">contact us</Link>
          </nav>
          <div className="fixedHeaderIcons">
            <PiMagnifyingGlassThin onClick={handleSearch} />
            <Link to="/login-register">
              <PiUserThin />
            </Link>
            <Link to="wishlist">
              <PiHeartStraightThin />
            </Link>
            <Link to="cart">
              <PiShoppingBagThin />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
