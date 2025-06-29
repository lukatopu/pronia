import React, { useState, useEffect, useRef } from 'react';
import plant1 from '../images/carouselImg/carouselPlant2.png';
import plant2 from '../images/carouselImg/carouselPlant1.png';
import { PiCaretLeftThin, PiCaretRightThin } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';
import Button from './Button';

function Carousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const images = [plant1, plant2];
  const intervalRef = useRef(null);
  const { t } = useTranslation();

  const triggerAnimations = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 10);
  };

  const nextImage = () => {
    triggerAnimations();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    triggerAnimations();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      triggerAnimations();
      nextImage();
    }, 4000);
  };

  useEffect(() => {
    setAnimate(true);
    startAutoSlide();

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    clearInterval(intervalRef.current);
    if (!isHovering) {
      startAutoSlide();
    }
  }, [isHovering]);

  return (
    <div
      className="carousel"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="caretLeftContainer"
        onClick={prevImage}
      >
        <PiCaretLeftThin className="caretLeft" />
      </div>
      <div
        className="caretRightContainer"
        onClick={nextImage}
      >
        <PiCaretRightThin className="caretRight" />
      </div>

      <div className="carouselDescriptionContainer">
        <p className={`saleText ${animate ? 'animate' : ''}`}>{t('65%')}</p>
        <h2 className={`plantName ${animate ? 'animate' : ''}`}>{t('NewPlant')}</h2>
        <p className={`descriptionText ${animate ? 'animate' : ''}`}>
          {t('ProniaCarouselDescription')}
        </p>

        <Button
          className={`${animate ? 'animate' : ''}`}
          name={t('Discover')}
          width="210px"
          height="65px"
          opacity="0"
          marginTop="40px"
        />
      </div>

      <div className={`imageContainer ${animate ? 'animate' : ''}`}>
        <img
          src={images[currentImageIndex]}
          alt="Plant"
        />
      </div>

      <div className="carouselDotContainer">
        {images.map((_, index) => (
          <span
            key={index}
            className={`carouselDot ${currentImageIndex === index ? 'active' : ''}`}
            onClick={
              currentImageIndex === index
                ? undefined
                : () => {
                    triggerAnimations();
                    setCurrentImageIndex(index);
                  }
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
