import React, { useState, useEffect } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi';

function SearchBlur({ isActive, closeSearch }) {
  const [isTooltipActive, setIsTooltipActive] = useState(false);

  const handleTooltip = () => {
    setIsTooltipActive(true);
  };

  const closeTooltip = () => {
    setIsTooltipActive(false);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeSearch();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeSearch]);

  return (
    <div className={`searchBlur ${isActive ? 'active' : ''}`}>
      <div className="closeSearchContainer">
        <button
          onMouseEnter={handleTooltip}
          onMouseLeave={closeTooltip}
          className="closeSearch"
          onClick={closeSearch}
        >
          X
        </button>
        <span className={`tooltip ${isTooltipActive ? 'active' : ''}`}>Close</span>
      </div>
      <p>Start typing and press Enter to search or ESC to close</p>
      <div className="searchInputContainer">
        <input
          type="text"
          placeholder="Search..."
        />
        <PiMagnifyingGlass />
      </div>
    </div>
  );
}

export default SearchBlur;
