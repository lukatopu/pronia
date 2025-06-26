import React, { useState } from 'react';
import Filter from '../components/Filter';
import ProductsList from '../components/ProductsList';

function Shop({ fetchCart, addToWishlist, addToCart, cart, wishlist, removeFromWishlist }) {
  const [priceRange, setPriceRange] = useState([16, 300]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);



  return (
    <div className="shop">
      <Filter
  priceRange={priceRange}
  setPriceRange={setPriceRange}
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  selectedTags={selectedTags}
  setSelectedTags={setSelectedTags}
  selectedColors={selectedColors}
  setSelectedColors={setSelectedColors}
  selectedCategories={selectedCategories}
  setSelectedCategories={setSelectedCategories}
/>

<ProductsList
  addToWishlist={addToWishlist}
  addToCart={addToCart}
  priceRange={priceRange}
  searchTerm={searchTerm}
  selectedTags={selectedTags}
  selectedColors={selectedColors}
  selectedCategories={selectedCategories}
  cart={cart}
  wishlist={wishlist}
  fetchCart={fetchCart}
  removeFromWishlist={removeFromWishlist}
/>


    </div>
  );
}

export default Shop;
