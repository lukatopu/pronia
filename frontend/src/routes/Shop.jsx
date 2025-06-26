import React, { useState } from 'react';
import Filter from '../components/Filter';
import ProductsList from '../components/ProductsList';

function Shop({ fetchCart, addToWishlist, addToCart, cart, wishlist, removeFromWishlist }) {
  const [priceRange, setPriceRange] = useState([16, 300]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <div className="shop">
      <Filter
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <ProductsList
        addToWishlist={addToWishlist}
        addToCart={addToCart}
        priceRange={priceRange}
        searchTerm={searchTerm}
        selectedTags={selectedTags}
        cart={cart}
        wishlist={wishlist}
        fetchCart={fetchCart}
        removeFromWishlist={removeFromWishlist}
      />
    </div>
  );
}

export default Shop;
