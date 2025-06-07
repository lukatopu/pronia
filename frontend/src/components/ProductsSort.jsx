import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/api.js';
import { PiGridNineFill, PiListBulletsBold } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';

function ProductsSort() {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="productsSortContainer">
      <div className="productsAmount">
        <span className="foundProducts">{products.length}</span> <span> {t('ProductsFound')} </span>
        <span className="foundProducts">30</span>
      </div>
      <div className="gridView">
        <PiGridNineFill />
      </div>
      <div className="listView">
        <PiListBulletsBold />
      </div>
      <div className="sortBy">Sort by Default</div>
    </div>
  );
}

export default ProductsSort;
