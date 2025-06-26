import React, { useState, useEffect } from 'react';
import { PiCaretDoubleUp } from 'react-icons/pi';

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`scrollToTopButton ${isVisible ? 'active' : ''}`}
      onClick={scrollToTop}
    >
      <PiCaretDoubleUp size={20} />
    </button>
  );
}

export default ScrollToTopButton;
