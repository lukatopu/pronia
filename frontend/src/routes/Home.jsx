import React, { useEffect, useState } from 'react';
import { useLoader } from '../hooks/useLoader';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import HomeProductsFilter from '../components/HomeProductsFilter';
import HomeProducts from '../components/HomeProducts';
import ProductCollections from '../components/ProductCollections';
import NewProducts from '../components/NewProducts';
import ClientReview from '../components/clientReview';
import FriendCompanies from '../components/FriendCompanies';

function Home({ addToCart, addToWishlist, cart, wishlist }) {
  const { useFakeLoader } = useLoader();
  const [selectedCategory, setSelectedCategory] = useState('Featured');

  useEffect(() => useFakeLoader(), []);

  return (
    <>
      <Carousel />
      <Services />
      <HomeProductsFilter
        selectedButton={selectedCategory}
        handleSelect={setSelectedCategory}
      />
      <HomeProducts
        addToCart={addToCart}
        addToWishlist={addToWishlist}
        cart={cart}
        wishlist={wishlist}
        filterCategory={selectedCategory}
      />
      <ProductCollections />
      <NewProducts
        addToCart={addToCart}
        addToWishlist={addToWishlist}
        cart={cart}
        wishlist={wishlist}
      />
      <ClientReview />
      <FriendCompanies />
    </>
  );
}

export default Home;
