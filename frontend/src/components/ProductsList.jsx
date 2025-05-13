import React, { useEffect, useState } from 'react';
import Product from './Product';
import { getProducts } from '../api/api.js';
import { useLoader } from '../hooks/useLoader.jsx';
import ProductsSort from './ProductsSort.jsx'

function ProductsList() {
  const [products, setProducts] = useState([]);

  const { useDataLoader } = useLoader();

  useEffect(() => {
    useDataLoader(() => getProducts().then((data) => setProducts(data)));
  }, []);

  return (
    <div className='productsWrapper'>
      <ProductsSort />
      <div className="productsContainer">
        {products?.map((product, index) => (
          <Product
            key={index}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
