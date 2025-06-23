import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/api';
import Product from './Product';

function HomeProducts({ addToCart, addToWishlist, cart, wishlist, filterCategory }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  const filteredProducts = products
    .filter((p) => p.categorie?.includes(filterCategory.toLowerCase()))
    .sort((a, b) => {
      const category = filterCategory.toLowerCase();

      if (category === 'bestseller') {
        const priceA = parseFloat(a.price.replace('$', ''));
        const priceB = parseFloat(b.price.replace('$', ''));
        return priceB - priceA;
      }

      if (category === 'latest') {
        const timeA = parseInt(a._id.substring(0, 8), 16);
        const timeB = parseInt(b._id.substring(0, 8), 16);
        return timeB - timeA;
      }

      return 0;
    });

  return (
    <div
      className="homeProductsContainer"
      key={filterCategory}
    >
      {filteredProducts.map((product) => (
        <div
          className="productCard"
          key={product._id}
        >
          <Product
            product={product}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            cart={cart}
            wishlist={wishlist}
          />
        </div>
      ))}
    </div>
  );
}

export default HomeProducts;
