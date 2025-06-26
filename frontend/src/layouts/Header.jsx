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
import { useTranslation } from 'react-i18next';
import CartModal from '../components/CartModal';
import HeaderBurger from '../components/HeaderBurger';
import { getCurrentUser } from '../api/api';

function Header({ cart }) {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [triggerHeight, setTriggerHeight] = useState(0);
  const [isUserMainClicked, setIsUserMainClicked] = useState(false);
  const [isUserFixedClicked, setIsUserFixedClicked] = useState(false);
  const [isCartClicked, setIsCartClicked] = useState(false);
  const [isCartOverlayHidden, setIsCartOverlayHidden] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const headerRef = useRef(null);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser();
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerHeight]);

  const handleSearch = () => setIsSearchClicked(true);
  const closeSearch = () => setIsSearchClicked(false);

  const handleCartModal = () => setIsCartClicked(!isCartClicked);
  const handleCartOverlay = () => setIsCartOverlayHidden(!isCartOverlayHidden);
  const handleCart = () => {
    handleCartModal();
    handleCartOverlay();
  };

  const handleUserMainClick = () => {
    setIsUserMainClicked((prev) => !prev);
    setIsUserFixedClicked(false);
  };

  const handleUserFixedClick = () => {
    setIsUserFixedClicked((prev) => !prev);
    setIsUserMainClicked(false);
  };

  const handleDropdownClick = () => {
    setIsUserMainClicked(false);
    setIsUserFixedClicked(false);
  };

  const handleChangeLanguageCustom = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
    setDropdownOpen(false);
  };

  return (
    <header ref={headerRef}>
      <div className="headerTop">
        <p>{t('HeaderTopText')}</p>
        <div className="curAndLanguageContainer">
          <span>
            USD <PiCaretDownBold />
          </span>
          <div className="customDropdown">
            <button
              className="dropdownToggle"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              {i18n.language.toUpperCase()} <PiCaretDownBold />
            </button>
            <ul className={`dropdownMenu ${dropdownOpen ? 'open' : ''}`}>
              <li onClick={() => handleChangeLanguageCustom('eng')}>ENG</li>
              <li onClick={() => handleChangeLanguageCustom('geo')}>GEO</li>
            </ul>
          </div>
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
            <img src={proniaLogo} alt="Pronia Logo" />
          </a>
        </div>
        <nav>
          <PiMagnifyingGlassThin onClick={handleSearch} />
          <div className="userIconContainer">
            <PiUserThin onClick={handleUserMainClick} className="userIcon" />
            <div className={`userIconDropdown ${isUserMainClicked ? 'clicked' : ''}`}>
              <Link to="/profile">
                <button onClick={handleDropdownClick}>{t('MyAccount')}</button>
              </Link>
              {!isLoggedIn && (
                <>
                  <Link to="/login">
                    <button onClick={handleDropdownClick}>{t('LoginL')}</button>
                  </Link>
                  <Link to="/register">
                    <button onClick={handleDropdownClick}>{t('Register')}</button>
                  </Link>
                </>
              )}
            </div>
          </div>
          <Link className="heartIcon" to="/wishlist">
            <PiHeartStraightThin />
          </Link>
          <PiShoppingBagThin onClick={handleCart} />
          <PiList className="burgerIcon" onClick={() => setIsBurgerOpen(true)} />
        </nav>
        <SearchBlur closeSearch={closeSearch} isActive={isSearchClicked} />
      </div>

      <nav className="headerBottom">
        <Link to="/">{t('Home')}</Link>
        <Link to="/shop">{t('Shop')}</Link>
        <Link to="/blog">{t('Blog')}</Link>
        <Link to="/aboutUs">{t('AboutUs')}</Link>
        <Link to="/pages">{t('Pages')}</Link>
        <Link to="/contact">{t('Contact')}</Link>
      </nav>

      <div className={`fixedHeader ${isFixed ? 'visible' : ''}`}>
        <div className="fixedHeaderContent">
          <a href="/">
            <img src={proniaLogo} alt="Pronia Logo" className="fixed-logo" />
          </a>
          <nav className="fixedHeaderNav">
            <Link to="/">{t('Home')}</Link>
            <Link to="/shop">{t('Shop')}</Link>
            <Link to="/blog">{t('Blog')}</Link>
            <Link to="/aboutUs">{t('AboutUs')}</Link>
            <Link to="/pages">{t('Pages')}</Link>
            <Link to="/contact">{t('Contact')}</Link>
          </nav>
          <div className="fixedHeaderIcons">
            <PiMagnifyingGlassThin onClick={handleSearch} />
            <div className="userIconContainer">
              <PiUserThin onClick={handleUserFixedClick} className="userIcon" />
              <div className={`userIconDropdown ${isUserFixedClicked ? 'clicked' : ''}`}>
                <Link to="/profile">
                  <button onClick={handleDropdownClick}>{t('MyAccount')}</button>
                </Link>
                {!isLoggedIn && (
                  <>
                    <Link to="/login">
                      <button onClick={handleDropdownClick}>{t('LoginL')}</button>
                    </Link>
                    <Link to="/register">
                      <button onClick={handleDropdownClick}>{t('Register')}</button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <Link to="/wishlist">
              <PiHeartStraightThin />
            </Link>
            <PiShoppingBagThin onClick={handleCart} />
          </div>
        </div>
      </div>

      <CartModal
        handleCartOverlay={handleCartOverlay}
        isCartOverlayHidden={isCartOverlayHidden}
        cart={cart}
        isCartClicked={isCartClicked}
        onClose={() => setIsCartClicked(false)}
      />

      <HeaderBurger
        isOpen={isBurgerOpen}
        onClose={() => setIsBurgerOpen(false)}
        dropdownOpen={dropdownOpen}
        isUserMainClicked={isUserMainClicked}
        handleDropdownClick={handleDropdownClick}
        setDropdownOpen={setDropdownOpen}
        handleChangeLanguageCustom={handleChangeLanguageCustom}
        handleUserMainClick={handleUserMainClick}
      />
    </header>
  );
}

export default Header;
