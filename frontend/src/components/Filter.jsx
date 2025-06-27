import React from 'react';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';
import Slider from '@mui/material/Slider';
import AloeCollection from './AloeCollection';
import { useCurrency } from '../context/CurrencyContext';

function Filter({
  priceRange,
  setPriceRange,
  searchTerm,
  setSearchTerm,
  selectedTags,
  setSelectedTags,
  selectedColors,
  setSelectedColors,
  selectedCategories,
  setSelectedCategories,
}) {
  const { t } = useTranslation();
  const { currency } = useCurrency();

  const exchangeRates = {
    GEL: 1,
    USD: 0.37,
    EUR: 0.34,
  };

  const fromGEL = (value) =>
    Math.round(value * exchangeRates[currency] * 100) / 100;

  const toGEL = (value) =>
    Math.round((value / exchangeRates[currency]) * 100) / 100;

  const handleSliderChange = (e, newValue) => {
    const gelMin = toGEL(newValue[0]);
    const gelMax = toGEL(newValue[1]);
    setPriceRange([gelMin, gelMax]);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTagClick = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleColorClick = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleCategoryClick = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setPriceRange([16, 300]);
    setSearchTerm('');
    setSelectedTags([]);
    setSelectedColors([]);
    setSelectedCategories([]);
  };

  return (
    <div className="filter">
      <div className="searchContainer">
        <input
          type="text"
          placeholder={t('Search')}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <PiMagnifyingGlassBold className="filterSearchIcon" />
      </div>

      <div className="filtersContainer">
        <div className="Filter">
          <button onClick={clearFilters} className="clearFiltersButton">
            {t('ClearFilters')}
          </button>
        </div>

        <div className="Filter">
          <h2>{t('Categories')}</h2>
          <div className="FiltersContainer">
            {[
              { key: 'bansai', label: t('CategoriesBansai') },
              { key: 'housePlants', label: t('CategoriesHousePlants') },
              { key: 'indoorLiving', label: t('CategoriesIndoorLiving') },
              { key: 'perennials', label: t('CategoriesPerennnials') },
              { key: 'plantForGift', label: t('CategoriesPlantForGift') },
              { key: 'gardenTools', label: t('CategoriesGardenTools') },
            ].map(({ key, label }) => (
              <a
                key={key}
                onClick={() => handleCategoryClick(key)}
                className={selectedCategories.includes(key) ? 'activeCategory' : ''}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="Filter">
          <h2>{t('Color')}</h2>
          <div className="FiltersContainer">
            {['Gold', 'Green', 'White', 'Black'].map((color) => (
              <a
                key={color}
                onClick={() => handleColorClick(color.toLowerCase())}
                className={selectedColors.includes(color.toLowerCase()) ? 'activeColor' : ''}
              >
                {t(`Color${color}`)}
              </a>
            ))}
          </div>
        </div>

        <div className="Filter">
          <h2>{t('PriceFilter')}</h2>
          <div className="FiltersContainer">
            <Slider
              className="slider"
              getAriaLabel={() => 'Price range'}
              value={[fromGEL(priceRange[0]), fromGEL(priceRange[1])]}
              onChange={handleSliderChange}
              valueLabelDisplay="on"
              valueLabelFormat={(v) => `${Math.round(v)} ${currency}`}
              min={fromGEL(16)}
              max={fromGEL(350)}
              disableSwap
              sx={{
                '& .MuiSlider-thumb': {
                  width: 16,
                  height: 16,
                  boxShadow: 'none',
                  '&:focus, &:hover, &.Mui-focusVisible, &:active': {
                    boxShadow: 'none',
                  },
                },
                '& .MuiSlider-track': {
                  height: 4,
                },
                '& .MuiSlider-rail': {
                  height: 4,
                },
                '& .MuiSlider-valueLabel': {
                  backgroundColor: '#abd373',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  width: '50px',
                  height: '15px',
                  top: -6,
                },
              }}
            />
          </div>
        </div>

        <div className="Filter">
          <h2>{t('PopularTags')}</h2>
          <div className="tagsFilterContainer">
            <div className="tagsContainer">
              <div
                onClick={() => handleTagClick('fashion')}
                className={selectedTags.includes('fashion') ? 'activeTag' : ''}
              >
                {t('TagFashion')}
              </div>
              <div
                onClick={() => handleTagClick('organic')}
                className={selectedTags.includes('organic') ? 'activeTag' : ''}
              >
                {t('TagOrganic')}
              </div>
            </div>
            <div className="tagsContainer">
              <div
                onClick={() => handleTagClick('oldFashion')}
                className={selectedTags.includes('oldFashion') ? 'activeTag' : ''}
              >
                {t('TagOldFashion')}
              </div>
              <div
                onClick={() => handleTagClick('men')}
                className={selectedTags.includes('men') ? 'activeTag' : ''}
              >
                {t('TagMen')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AloeCollection />
    </div>
  );
}

export default Filter;
