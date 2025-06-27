import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/api.js';
import { PiGridNineFill, PiListBulletsBold } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';

function ProductsSort({ onSortChange, onViewChange, totalProductsCount, currentPageProductsCount }) {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('default');
  const [isGridView, setIsGridView] = useState(true);
  const [showSortOptions, setShowSortOptions] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {}
    };

    fetchProducts();
  }, []);

  const handleSortChange = (option) => {
    setSortOption(option);
    setShowSortOptions(false);
    onSortChange(option);
  };

  const toggleView = () => {
    const newView = !isGridView;
    setIsGridView(newView);
    onViewChange(newView);
  };

  const sortOptions = [
    { value: 'default', label: t('Sort by Default') },
    { value: 'price-high-low', label: t('Sort By High Price') },
    { value: 'price-low-high', label: t('Sort By Low Price') },
    { value: 'rating', label: t('Sort By Rated') },
    { value: 'newest', label: t('Sort By Latest') },
  ];

  return (
     <div className="productsSortContainer">
      <div className="productsAmount">
        <span className="foundProducts">{currentPageProductsCount}</span> 
        <span> {t('ProductsFoundOnPage')} </span>
        <span className="foundProducts">{totalProductsCount}</span> 
      </div>
      <div className="viewToggle">
        <div
          className={`gridView ${isGridView ? 'active' : ''}`}
          onClick={() => toggleView()}
        >
          <PiGridNineFill />
        </div>
        <div
          className={`listView ${!isGridView ? 'active' : ''}`}
          onClick={() => toggleView()}
        >
          <PiListBulletsBold />
        </div>
      </div>
      <div
        className="sortBy"
        onClick={() => setShowSortOptions(!showSortOptions)}
      >
        {sortOptions.find((opt) => opt.value === sortOption)?.label}
        {showSortOptions && (
          <div className="sortDropdown">
            {sortOptions.map((option) => (
              <div
                key={option.value}
                className={`sortOption ${sortOption === option.value ? 'active' : ''}`}
                onClick={() => handleSortChange(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsSort;
