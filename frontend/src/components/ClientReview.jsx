import React, { useState, useEffect } from 'react';
import client1 from '../images/reviewerProfiles/1.png';
import client2 from '../images/reviewerProfiles/2.png';
import client3 from '../images/reviewerProfiles/3.png';
import quotation from '../images/reviewerProfiles/quotation.png';
import { useTranslation } from 'react-i18next';

const reviews = [
  { img: client1, name: 'PHOENIX BAKER', role: 'Client' },
  { img: client2, name: 'PHOENIX BAKER', role: 'Client' },
  { img: client3, name: 'PHOENIX BAKER', role: 'Client' },
  { img: client1, name: 'PHOENIX BAKER', role: 'Client' },
  { img: client2, name: 'PHOENIX BAKER', role: 'Client' },
];

function ClientReview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [cardWidth, setCardWidth] = useState(350);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallScreen(width < 540);

      if (width <= 540) {
        setVisibleCards(1);
        setCardWidth(350);
      } else if (width <= 770) {
        setVisibleCards(1);
        setCardWidth(480);
      } else if (width <= 990) {
        setVisibleCards(2);
        setCardWidth(315);
      } else if (width <= 1200) {
        setVisibleCards(2);
        setCardWidth(435);
      } else {
        setVisibleCards(3);
        setCardWidth(350);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gap = 30;
  const maxIndex = Math.max(reviews.length - visibleCards, 0);
  const translateX = -(currentIndex * (cardWidth + gap));

  return (
    <div className="clientReviewWrapper">
      <div className="clientReviewDescription">
        <div className="reviewBackground"></div>
        <div className="clientReviewTitle">
          <h1>{t('ClientReviewTitle')}</h1>
        </div>
        <p>{t('TeamSectionSub')}</p>
      </div>

      <div className="sliderContainer">
        <div className="sliderTrackWrapper">
          <div
            className="sliderTrack"
            style={{
              transform: `translateX(${translateX}px)`,
              transition: 'transform 0.3s ease',
            }}
          >
            {reviews.map((review, i) => (
              <div
                className="clientReviewContainer"
                key={i}
                style={{
                  flex: isSmallScreen ? '0 0 350px' : `0 0 ${cardWidth}px`,
                  maxWidth: isSmallScreen ? '350px' : `${cardWidth}px`,
                  minWidth: isSmallScreen ? '350px' : `${cardWidth}px`
                }}
              >
                <div className="quoteMarkContainer">
                  <img src={quotation} alt="quotation mark" />
                </div>
                <div className="clientProfileContainer">
                  <img src={review.img} alt="client profile" />
                </div>
                <h6>{review.name}</h6>
                <p>{t('Client')}</p>
                <p>
                  {t('ClientReviewText')}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="indicatorsContainer">
          {[...Array(maxIndex + 1)].map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClientReview;