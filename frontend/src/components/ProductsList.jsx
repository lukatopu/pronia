import React, { useEffect, useState } from 'react';
import Product from './Product';
import { getProducts } from '../api/api.js';
import { useLoader } from '../hooks/useLoader.jsx';
import ProductsSort from './ProductsSort.jsx';

function ProductsList({ addToCart, addToWishlist, priceRange, cart, setIsProductAddedToCart, IsProductAddedToCart }) {
  const [products, setProducts] = useState([]);

  const { useDataLoader } = useLoader();

  useEffect(() => {
    useDataLoader(() => getProducts().then((data) => setProducts(data)));
  }, []);

  const filteredProducts = products.filter((product) => {
    let price;

    if (typeof product.price === 'string') {
      let numericString = '';
      for (const char of product.price) {
        if ((char >= '0' && char <= '9') || char === '.') {
          numericString += char;
        }
      }
      price = parseFloat(numericString) || 0;
    } else {
      price = product.price;
    }

    return price >= priceRange[0] && price <= priceRange[1];
  });

  return (
    <div className="productsWrapper">
      <ProductsSort />
      <div className="productsContainer">
        {filteredProducts?.map((product, index) => (
          <Product
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            cart={cart}
            key={index}
            product={product}
            
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
