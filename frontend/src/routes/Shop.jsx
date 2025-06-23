import React, { useState } from 'react';
import Filter from '../components/Filter';
import ProductsList from '../components/ProductsList';

function Shop({ addToWishlist, addToCart, cart, wishlist }) {
  const [priceRange, setPriceRange] = useState([16, 300]);
  return (
    <div className="shop">
      <Filter
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
      <ProductsList
        addToWishlist={addToWishlist}
        addToCart={addToCart}
        priceRange={priceRange}
        cart={cart}
        wishlist={wishlist}
      />
    </div>
  );
}

export default Shop;
