import React, { useEffect } from 'react';
import { useLoader } from '../hooks/useLoader';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import ProductsList from '../components/ProductsList';

function Home() {
  const { useFakeLoader } = useLoader();

  useEffect(() => useFakeLoader(), []);

  return (
    <>
      <Carousel />
      <Services />
    </>
  );
}

export default Home;
