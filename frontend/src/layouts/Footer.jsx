import React, { useState } from 'react';
import proniaLogo from '../images/proniaLogo.png';
import cardsImg from '../images/cards/cardsImg.png';
import { FaFacebookF, FaTwitter, FaPinterest } from 'react-icons/fa';
import { BiBasketball } from 'react-icons/bi';

function Footer() {
  const [activeTooltips, setActiveTooltips] = useState({
    facebook: false,
    twitter: false,
    pinterest: false,
    dribble: false,
  });

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
          Lorem ipsum dolor sit amet, <br /> consec adipisl elit, sed do eiusmod <br /> tempor{' '}
          <br />
          incidio ut labore et dolore magna.
        </p>
        <div className="buttonsContainer">
          <div className="tooltipContainer">
            <span className={`tooltip ${activeTooltips.facebook ? 'active' : ''}`}>Facebook</span>
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
            <span className={`tooltip ${activeTooltips.twitter ? 'active' : ''}`}>Twitter</span>
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
            <span className={`tooltip ${activeTooltips.pinterest ? 'active' : ''}`}>Pinterest</span>
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
            <span className={`tooltip ${activeTooltips.dribble ? 'active' : ''}`}>Dribble</span>
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
      <div className='nav'>
        <div className="usefulLinksContainer">
          <h1>Useful Links</h1>
          <div>
            <a href="/aboutUs">About Pronia</a>
            <a href="/shop">How to shop</a>
            <a href="#">FAQ</a>
            <a href="/contact">Contact us</a>
            <a href="/logIn">Log in</a>
          </div>
        </div>

        <div className="accountHelpContainer">
          <h1>My Account</h1>
          <div>
            <a href="/register">Sign Up</a>
            <a href="/cart">View Cart</a>
            <a href="/wishlist">My Wishlist</a>
            <a href="#">Track My Order</a>
            <a href="#">Help</a>
          </div>
        </div>

        <div className="ourServiceContainer">
          <h1>Our Service</h1>
          <div>
            <a href="#">Payment Methods</a>
            <a href="#">Money Guarantee!</a>
            <a href="#">Returns</a>
            <a href="#">Shipping</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>

        <div className="questionsContainer">
          <h1>Got Question? Call Us</h1>
          <div>
            <a href="tel://123-456-789">123 456 789</a>
            <p>Your Address Goes Here</p>
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
