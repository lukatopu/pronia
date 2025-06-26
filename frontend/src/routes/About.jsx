import React, { useEffect, useState } from 'react';
import { useLoader } from '../hooks/useLoader';
import Services from '../components/Services';
import profile1 from '../images/aboutProfile/1.png'
import profile2 from '../images/aboutProfile/2.png'
import profile3 from '../images/aboutProfile/3.png'
import profile4 from '../images/aboutProfile/4.png'
import { FaFacebookF, FaTwitter, FaPinterest } from 'react-icons/fa';
import FriendCompanies from '../components/FriendCompanies';

function About() {
  const { useFakeLoader } = useLoader();


  useEffect(() => useFakeLoader(), []);

  const [activeTooltips, setActiveTooltips] = useState({
    facebook: false,
    twitter: false,
    pinterest: false
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
    <div className="aboutUsContainer">
      <div className="textContainer">
        <h1>
          Our <span>Story</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum. Sed ut perspiciatis
        </p>
      </div>
      <Services />
      <div className="videoContainer"></div>
      <div className="ratingWrapper">
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          <span>eiusmod tempor</span> incididunt.
        </h1>
        <div className="ratingContainer">
          <div className="ratingCount">
            <h3>150+</h3>
            <h3>Project</h3>
          </div>
          <div className="ratingCount">
            <h3>159+</h3>
            <h3>Clients</h3>
          </div>
          <div className="ratingCount">
            <h3>251+</h3>
            <h3>Rating</h3>
          </div>
          <div className="ratingCount">
            <h3>110+</h3>
            <h3>Award</h3>
          </div>
        </div>
      </div>

      <div className="teamDescription">
        <div className="teamTitle">
          <h1>NEW PRODUCTS</h1>
        </div>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots <br /> in
          a piece of classical Latin literature
        </p>
      </div>

      <div className='aboutProfileWrapper'>
        <div className='aboutProfileContainer'>
          <div className='profileImageContainer'>
            <div className='profileOverlay'>
              <p>Michal Murphy</p>
              <p>Sales man</p>
              <div className='nav'>
                <div className='tooltipContainer'>
                  <span className={`tooltip ${activeTooltips.facebook ? 'active' : ''}`}>Facebook</span>
                  <a href="https://www.facebook.com/home.php">
                  <div
                    onMouseLeave={() => closeTooltip('facebook')}
                    onMouseEnter={() => handleTooltip('facebook')} 
                  ><FaFacebookF /></div>
                  </a>
                </div>
                <div className='tooltipContainer'>
                  <span className={`tooltip ${activeTooltips.twitter ? 'active' : ''}`}>Twitter</span>
                  <a href="https://x.com/home?lang=en">
                  <div
                    onMouseLeave={() => closeTooltip('twitter')}
                    onMouseEnter={() => handleTooltip('twitter')} 
                  ><FaTwitter /></div>
                  </a>
                </div>
                <div className='tooltipContainer'>
                  <span className={`tooltip ${activeTooltips.pinterest ? 'active' : ''}`}>Pinterest</span>
                  <a href="https://www.pinterest.com/">
                  <div
                    onMouseLeave={() => closeTooltip('pinterest')}
                    onMouseEnter={() => handleTooltip('pinterest')} 
                  ><FaPinterest /></div>
                  </a>
                </div>
              </div>
            </div>
            <img src={profile1} alt="" />
          </div>
          <p>Michal Murphy</p>
        </div>

        <div className='aboutProfileContainer'>
          <div className='profileImageContainer'>
            <div className='profileOverlay'>
              <p>Michal Murphy</p>
              <p>Sales man</p>
              <div className='nav'>
                <div className='tooltipContainer'>
                  <span className={`tooltip ${activeTooltips.facebook ? 'active' : ''}`}>Facebook</span>
                  <a href="https://www.facebook.com/home.php">
                  <div
                    onMouseLeave={() => closeTooltip('facebook')}
                    onMouseEnter={() => handleTooltip('facebook')} 
                  ><FaFacebookF /></div>
                  </a>
                </div>
                <div className='tooltipContainer'>
                  <span className={`tooltip ${activeTooltips.twitter ? 'active' : ''}`}>Twitter</span>
                  <a href="https://x.com/home?lang=en">
                  <div
                    onMouseLeave={() => closeTooltip('twitter')}
                    onMouseEnter={() => handleTooltip('twitter')} 
                  ><FaTwitter /></div>
                  </a>
                </div>
                <div className='tooltipContainer'>
                  <span className={`tooltip ${activeTooltips.pinterest ? 'active' : ''}`}>Pinterest</span>
                  <a href="https://www.pinterest.com/">
                  <div
                    onMouseLeave={() => closeTooltip('pinterest')}
                    onMouseEnter={() => handleTooltip('pinterest')} 
                  ><FaPinterest /></div>
                  </a>
                </div>
              </div>
            </div>
            <img src={profile2} alt="" />
          </div>
          <p>Michal Murphy</p>
        </div>

        <div className='aboutProfileContainer'>
          <div className='profileImageContainer'>
            <div className='profileOverlay'>
              <p>Michal Murphy</p>
              <p>Sales man</p>
              <div className='nav'>
                <div className='tooltipContainer'>
                  <span className={`tooltip ${activeTooltips.facebook ? 'active' : ''}`}>Facebook</span>
                  <a href="https://www.facebook.com/home.php">
                  <div
                    onMouseLeave={() => closeTooltip('facebook')}
                    onMouseEnter={() => handleTooltip('facebook')} 
                  ><FaFacebookF /></div>
                  </a>
                </div>
                <div className='tooltipContainer'>
                  <span className={`tooltip ${activeTooltips.twitter ? 'active' : ''}`}>Twitter</span>
                  <a href="https://x.com/home?lang=en">
                  <div
                    onMouseLeave={() => closeTooltip('twitter')}
                    onMouseEnter={() => handleTooltip('twitter')} 
                  ><FaTwitter /></div>
                  </a>
                </div>
                <div className='tooltipContainer'>
                  <span className={`tooltip ${activeTooltips.pinterest ? 'active' : ''}`}>Pinterest</span>
                  <a href="https://www.pinterest.com/">
                  <div
                    onMouseLeave={() => closeTooltip('pinterest')}
                    onMouseEnter={() => handleTooltip('pinterest')} 
                  ><FaPinterest /></div>
                  </a>
                </div>
              </div>
            </div>
            <img src={profile3} alt="" />
          </div>
          <p>Michal Murphy</p>
        </div>

        <div className='aboutProfileContainer'>
          <div className='profileImageContainer'>
            <div className='profileOverlay'>
              <p>Michal Murphy</p>
              <p>Sales man</p>
              <div className='nav'>
                <div className='tooltipContainer'>
                  <span className={`tooltip ${activeTooltips.facebook ? 'active' : ''}`}>Facebook</span>
                  <a href="https://www.facebook.com/home.php">
                  <div
                    onMouseLeave={() => closeTooltip('facebook')}
                    onMouseEnter={() => handleTooltip('facebook')} 
                  ><FaFacebookF /></div>
                  </a>
                </div>
                <div className='tooltipContainer'>
                  <span className={`tooltip ${activeTooltips.twitter ? 'active' : ''}`}>Twitter</span>
                  <a href="https://x.com/home?lang=en">
                  <div
                    onMouseLeave={() => closeTooltip('twitter')}
                    onMouseEnter={() => handleTooltip('twitter')} 
                  ><FaTwitter /></div>
                  </a>
                </div>
                <div className='tooltipContainer'>
                  <span className={`tooltip ${activeTooltips.pinterest ? 'active' : ''}`}>Pinterest</span>
                  <a href="https://www.pinterest.com/">
                  <div
                    onMouseLeave={() => closeTooltip('pinterest')}
                    onMouseEnter={() => handleTooltip('pinterest')} 
                  ><FaPinterest /></div>
                  </a>
                </div>
              </div>
            </div>
            <img src={profile4} alt="" />
          </div>
          <p>Michal Murphy</p>
        </div>
      </div>
      <FriendCompanies />
    </div>
  );
}

export default About;
