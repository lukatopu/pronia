import React, { useState } from 'react';

function HomeProductsFilter({ selectedButton, handleSelect }) {
  return (
    <div className="homeProductsWrapper">
      <div className="productsSortContainer">
        <div className="ourProductsContainer">
          <h1>OUR PRODUCTS</h1>
        </div>

        <div className="sortButtonsContainer">
          <button
            className={selectedButton === 'Featured' ? 'selected' : ''}
            onClick={() => handleSelect('Featured')}
          >
            Featured
          </button>
          <button
            className={selectedButton === 'Bestseller' ? 'selected' : ''}
            onClick={() => handleSelect('Bestseller')}
          >
            Bestseller
          </button>
          <button
            className={selectedButton === 'Latest' ? 'selected' : ''}
            onClick={() => handleSelect('Latest')}
          >
            Latest
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeProductsFilter;
