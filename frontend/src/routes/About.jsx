import React, { useEffect, useState } from 'react';
import { useLoader } from '../hooks/useLoader';
import Services from '../components/Services';
import profile1 from '../images/aboutProfile/1.png';
import profile2 from '../images/aboutProfile/2.png';
import profile3 from '../images/aboutProfile/3.png';
import profile4 from '../images/aboutProfile/4.png';
import { FaFacebookF, FaTwitter, FaPinterest } from 'react-icons/fa';
import FriendCompanies from '../components/FriendCompanies';
import { useTranslation } from 'react-i18next';

function About() {
  const { useFakeLoader } = useLoader();
  const { t } = useTranslation();

  useEffect(() => useFakeLoader(), []);

  const [activeTooltips, setActiveTooltips] = useState({
    facebook: false,
    twitter: false,
    pinterest: false,
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

  const teamProfiles = [
    profile1,
    profile2,
    profile3,
    profile4,
  ];

  return (
    <div className="aboutUsContainer">
      <div className="textContainer">
        <h1>
          {t('Our')} <span>{t('Story')}</span>
        </h1>
        <p>{t('AboutMainText')}</p>
      </div>

      <Services />

      <div className="videoContainer"></div>

      <div className="ratingWrapper">
        <h1>{t('StatsTitle')}</h1>
        <div className="ratingContainer">
          <div className="ratingCount">
            <h3>150+</h3>
            <h3>{t('Project')}</h3>
          </div>
          <div className="ratingCount">
            <h3>159+</h3>
            <h3>{t('Clients')}</h3>
          </div>
          <div className="ratingCount">
            <h3>251+</h3>
            <h3>{t('Rating')}</h3>
          </div>
          <div className="ratingCount">
            <h3>110+</h3>
            <h3>{t('Award')}</h3>
          </div>
        </div>
      </div>

      <div className="teamDescription">
        <div className="teamTitle">
          <h1>{t('TeamSectionTitle')}</h1>
        </div>
        <p>{t('TeamSectionSub')}</p>
      </div>

      <div className="aboutProfileWrapper">
        {teamProfiles.map((img, idx) => (
          <div className="aboutProfileContainer" key={idx}>
            <div className="profileImageContainer">
              <div className="profileOverlay">
                <p>Michal Murphy</p>
                <p>{t('SalesMan')}</p>
                <div className="nav">
                  <div className="tooltipContainer">
                    <span className={`tooltip ${activeTooltips.facebook ? 'active' : ''}`}>
                      {t('Facebook')}
                    </span>
                    <a href="https://www.facebook.com/home.php">
                      <div
                        onMouseLeave={() => closeTooltip('facebook')}
                        onMouseEnter={() => handleTooltip('facebook')}
                      >
                        <FaFacebookF />
                      </div>
                    </a>
                  </div>
                  <div className="tooltipContainer">
                    <span className={`tooltip ${activeTooltips.twitter ? 'active' : ''}`}>
                      {t('Twitter')}
                    </span>
                    <a href="https://x.com/home?lang=en">
                      <div
                        onMouseLeave={() => closeTooltip('twitter')}
                        onMouseEnter={() => handleTooltip('twitter')}
                      >
                        <FaTwitter />
                      </div>
                    </a>
                  </div>
                  <div className="tooltipContainer">
                    <span className={`tooltip ${activeTooltips.pinterest ? 'active' : ''}`}>
                      {t('Pinterest')}
                    </span>
                    <a href="https://www.pinterest.com/">
                      <div
                        onMouseLeave={() => closeTooltip('pinterest')}
                        onMouseEnter={() => handleTooltip('pinterest')}
                      >
                        <FaPinterest />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <img src={img} alt="team member" />
            </div>
            <p>Michal Murphy</p>
          </div>
        ))}
      </div>

      <FriendCompanies />
    </div>
  );
}

export default About;
