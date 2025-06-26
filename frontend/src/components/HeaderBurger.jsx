import React from 'react';
import { PiPhone, PiUserThin, PiHeartStraightThin, PiCaretDownBold, PiX } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';


function HeaderBurger({
  isOpen,
  onClose,
  dropdownOpen,
  isUserMainClicked,
  handleDropdownClick,
  setDropdownOpen,
  handleChangeLanguageCustom,
  handleUserMainClick,
}) {
  const { t, i18n } = useTranslation();

  const { currency, setCurrency } = useCurrency();


  const [currencyDropdownOpen, setCurrencyDropdownOpen] = React.useState(false);

  const handleCurrencyChange = (cur) => {
    setCurrency(cur);
    localStorage.setItem('currency', cur);
    setCurrencyDropdownOpen(false);
  };


  return (
    <div className={`headerBurgerContainer ${isOpen ? 'open' : ''}`}>
      <button
        className="closeBurger"
        onClick={onClose}
      >
        <PiX size={24} />
      </button>

      <div className="contactContainer">
        <div className="contactNumber">
          <div className="phoneIconContainer">
            <PiPhone className="phoneIcon" />
          </div>
          <p>+00 123 456 789</p>
        </div>
      </div>

      <div className="addOnsContainer">
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

        <div className="customDropdown">
          <button
            className="dropdownToggle"
            onClick={() => setCurrencyDropdownOpen((prev) => !prev)}
          >
            {currency} <PiCaretDownBold />
          </button>
          <ul className={`dropdownMenu ${currencyDropdownOpen ? 'open' : ''}`}>
            <li onClick={() => handleCurrencyChange('USD')}>USD</li>
            <li onClick={() => handleCurrencyChange('EUR')}>EUR</li>
            <li onClick={() => handleCurrencyChange('GEL')}>GEL</li>
          </ul>
        </div>


        <div className="userIconContainer">
          <PiUserThin
            onClick={handleUserMainClick}
            className="userIcon"
          />
          <div className={`userIconDropdown ${isUserMainClicked ? 'clicked' : ''}`}>
            <Link to="/profile">
              <button onClick={handleDropdownClick}>{t('MyAccount')}</button>
            </Link>
            <Link to="/login">
              <button onClick={handleDropdownClick}>{t('LoginL')}</button>
            </Link>
            <Link to="/register">
              <button onClick={handleDropdownClick}>{t('Register')}</button>
            </Link>
          </div>
        </div>

        <Link
          className="heartIcon"
          to="/wishlist"
        >
          <PiHeartStraightThin />
        </Link>
      </div>

      <div className="routesContainer">
        <nav className="headerBottom">
          <Link to="/">{t('Home')}</Link>
          <Link to="/shop">{t('Shop')}</Link>
          <Link to="/blog">{t('Blog')}</Link>
          <Link to="/aboutUs">{t('AboutUs')}</Link>
          <Link to="/pages">{t('Pages')}</Link>
          <Link to="/contact">{t('Contact')}</Link>
        </nav>
      </div>
    </div>
  );
}

export default HeaderBurger;
