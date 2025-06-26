import React from 'react';
import { useTranslation } from 'react-i18next';

function HomeProductsFilter({ selectedButton, handleSelect }) {
  const { t } = useTranslation();

  return (
    <div className="homeProductsWrapper">
      <div className="productsSortContainer">
        <div className="ourProductsContainer">
          <h1>{t('OurProducts')}</h1>
        </div>

        <div className="sortButtonsContainer">
          <button
            className={selectedButton === 'Featured' ? 'selected' : ''}
            onClick={() => handleSelect('Featured')}
          >
            {t('Featured')}
          </button>
          <button
            className={selectedButton === 'Bestseller' ? 'selected' : ''}
            onClick={() => handleSelect('Bestseller')}
          >
            {t('Bestseller')}
          </button>
          <button
            className={selectedButton === 'Latest' ? 'selected' : ''}
            onClick={() => handleSelect('Latest')}
          >
            {t('Latest')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeProductsFilter;