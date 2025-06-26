import React, { useState, useEffect } from 'react';
import client1 from '../images/reviewerProfiles/1.png';
import client2 from '../images/reviewerProfiles/2.png';
import client3 from '../images/reviewerProfiles/3.png';
import quotation from '../images/reviewerProfiles/quotation.png';

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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 770) {
        setVisibleCards(1);
        setCardWidth(480);
      } else if (width < 990) {
        setVisibleCards(2);
        setCardWidth(315);
      } else if (width < 1200) {
        setVisibleCards(2);
        setCardWidth(435);
      } else {
        setVisibleCards(3);
        setCardWidth(350);
      }
    };

    handleResize(); // Set on load
    window.addEventListener('resize', handleResize); // Update on resize
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
          <h1>WHAT CLIENTS SAY</h1>
        </div>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots <br /> in
          a piece of classical Latin literature
        </p>
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
                style={{ flex: `0 0 ${cardWidth}px` }}
              >
                <div className="quoteMarkContainer">
                  <img src={quotation} alt="" />
                </div>
                <div className="clientProfileContainer">
                  <img src={review.img} alt="" />
                </div>
                <h6>{review.name}</h6>
                <p>{review.role}</p>
                <p>
                  Lorem ipsum dolor sit amet, conse adipisic elit, sed do eiusmod tempo incididunt
                  ut labore et dolore magna.
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
