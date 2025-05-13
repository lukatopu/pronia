import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/api.js';
import { PiGridNineFill, PiListBulletsBold } from 'react-icons/pi';

function ProductsSort() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="productsSortContainer">
      <div className="productsAmount"><span className='foundProducts'>{products.length}</span> Products Found of <span className='totalProducts'>30</span></div>
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
