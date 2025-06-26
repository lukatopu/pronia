import React from 'react';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';
import Slider from '@mui/material/Slider';
import AloeCollection from './AloeCollection';

function Filter({
  priceRange,
  setPriceRange,
  searchTerm,
  setSearchTerm,
  selectedTags,
  setSelectedTags,
  selectedCategories,
  setSelectedCategories

}) {
  const { t } = useTranslation();

  const handleSliderChange = (e, newValue) => {
    setPriceRange(newValue);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTagClick = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="filter">
      <div className="searchContainer">
        <input
          type="text"
          placeholder={t('Search') || 'Search'}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <PiMagnifyingGlassBold className="filterSearchIcon" />
      </div>

      <div className="filtersContainer"> 
        <div className="Filter">
          <h2>{t('Categories')}</h2>
          <div className="FiltersContainer">
            <a href="#">{t('CategoriesAll')}</a>
            <a href="#">{t('CategoriesBansai')}</a>
            <a href="#">{t('CategoriesHousePlants')}</a>
            <a href="#">{t('CategoriesIndoorLiving')}</a>
            <a href="#">{t('CategoriesPerennnials')}</a>
            <a href="#">{t('CategoriesPlantForGift')}</a>
            <a href="#">{t('CategoriesGardenTools')}</a>
          </div>
        </div>

        <div className="Filter">
          <h2>{t('Color')}</h2>
          <div className="FiltersContainer">
            <a>{t('ColorAll')}</a>
            <a>{t('ColorGold')}</a>
            <a>{t('ColorGreen')}</a>
            <a>{t('ColorWhite')}</a>
            <a>{t('ColorBlack')}</a>
          </div>
        </div>

        <div className="Filter">
          <h2>{t('PriceFilter')}</h2>
          <div className="FiltersContainer">
            <Slider
              className="slider"
              getAriaLabel={() => 'Price range'}
              value={priceRange}
              onChange={handleSliderChange}
              valueLabelDisplay="on"
              min={16}
              max={350}
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
                  width: '2px',
                  height: '15px',
                  top: -6,
                },
              }}
            />
          </div>
        </div>

        <div className="Filter">
          <h2>{t('Popular Tags')}</h2>
          <div className="tagsFilterContainer">
            <div className="tagsContainer">
              <div
                onClick={() => handleTagClick('fashion')}
                className={selectedTags.includes('fashion') ? 'activeTag' : ''}
              >
                Fashion
              </div>
              <div
                onClick={() => handleTagClick('organic')}
                className={selectedTags.includes('organic') ? 'activeTag' : ''}
              >
                Organic
              </div>
            </div>
            <div className="tagsContainer">
              <div
                onClick={() => handleTagClick('old fashion')}
                className={selectedTags.includes('old fashion') ? 'activeTag' : ''}
              >
                Old Fashion
              </div>
              <div
                onClick={() => handleTagClick('men')}
                className={selectedTags.includes('men') ? 'activeTag' : ''}
              >
                Men
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
