import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Button({ className = '', name, width, height, opacity, marginTop }) {
  const style = {
    width: width,
    height: height,
    opacity: opacity,
    marginTop: marginTop,
  };
  return (
    <div className="buttonContainer">
      <button
        className={`discoverButton ${className}`}
        style={style}
      >
        <Link to="/shop">{name}</Link>
      </button>
    </div>
  );
}

export default Button;
