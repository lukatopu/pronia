import React, { useState } from 'react';
import proniaLogo from '../images/proniaLogo.png';
import cardsImg from '../images/cards/cardsImg.png';
import { FaFacebookF, FaTwitter, FaPinterest } from 'react-icons/fa';
import { BiBasketball } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

function Footer() {
  const [activeTooltips, setActiveTooltips] = useState({
    facebook: false,
    twitter: false,
    pinterest: false,
    dribble: false,
  });

  const { t } = useTranslation();

  const handleTooltip = (tooltipName) => {
    setActiveTooltips((prev) => ({
      ...prev,
      [tooltipName]: true,
    }));
  };

  const closeTooltip = (tooltipName) => {
    setActiveTooltips((prev) => ({
      ...prev,
      [tooltipName]: false,
    }));
  };

  return (
    <footer>
      <div className="footerDiv">
        <img
          src={proniaLogo}
          alt="Pronia Logo"
        />
        <p>
          {t('FooterDescription')
            .split('\n')
            .map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
        </p>

        <div className="buttonsContainer">
          <div className="tooltipContainer">
            <span className={`tooltip ${activeTooltips.facebook ? 'active' : ''}`}>
              {t('Facebook')}
            </span>
            <a href="https://www.facebook.com/home.php">
              <button
                onMouseLeave={() => closeTooltip('facebook')}
                onMouseEnter={() => handleTooltip('facebook')}
              >
                <FaFacebookF />
              </button>
            </a>
          </div>
          <div className="tooltipContainer">
            <span className={`tooltip ${activeTooltips.twitter ? 'active' : ''}`}>
              {t('Twitter')}
            </span>
            <a href="https://x.com/home?lang=en">
              <button
                onMouseLeave={() => closeTooltip('twitter')}
                onMouseEnter={() => handleTooltip('twitter')}
              >
                <FaTwitter />
              </button>
            </a>
          </div>
          <div className="tooltipContainer">
            <span className={`tooltip ${activeTooltips.pinterest ? 'active' : ''}`}>
              {t('Pinterest')}
            </span>
            <a href="https://www.pinterest.com/">
              <button
                onMouseLeave={() => closeTooltip('pinterest')}
                onMouseEnter={() => handleTooltip('pinterest')}
              >
                <FaPinterest />
              </button>
            </a>
          </div>
          <div className="tooltipContainer">
            <span className={`tooltip ${activeTooltips.dribble ? 'active' : ''}`}>
              {t('Dribble')}
            </span>
            <a href="https://dribbble.com/">
              <button
                onMouseLeave={() => closeTooltip('dribble')}
                onMouseEnter={() => handleTooltip('dribble')}
              >
                <BiBasketball />
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="nav">
        <div className="usefulLinksContainer">
          <h1>{t('UsefulLinks')}</h1>
          <div>
            <a href="/aboutUs">{t('AboutPronia')}</a>
            <a href="/shop">{t('HowToShop')}</a>
            <a href="#">{t('FAQ')}</a>
            <a href="/contact">{t('ContactUs')}</a>
            <a href="/logIn">{t('LoginL')}</a>
          </div>
        </div>

        <div className="accountHelpContainer">
          <h1>{t('MyAccount')}</h1>
          <div>
            <a href="/register">{t('Register')}</a>
            <a href="/cart">{t('ViewCart')}</a>
            <a href="/wishlist">{t('MyWishlist')}</a>
            <a href="#">{t('TrackOrder')}</a>
            <a href="#">{t('Help')}</a>
          </div>
        </div>

        <div className="ourServiceContainer">
          <h1>{t('OurService')}</h1>
          <div>
            <a href="#">{t('PaymentMethods')}</a>
            <a href="#">{t('MoneyGuarantee')}</a>
            <a href="#">{t('Returns')}</a>
            <a href="#">{t('Shipping')}</a>
            <a href="#">{t('PrivacyPolicy')}</a>
          </div>
        </div>

        <div className="questionsContainer">
          <h1>{t('GotQuestion')}</h1>
          <div>
            <a href="tel://123-456-789">123 456 789</a>
            <p>{t('YourAddress')}</p>
            <div>
              <img
                className="cardsImg"
                src={cardsImg}
                alt="Payment Methods"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
