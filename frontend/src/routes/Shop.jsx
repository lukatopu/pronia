import React from 'react';
import Filter from '../components/Filter';
import ProductsList from '../components/ProductsList';

function Shop() {
  return (
    <div className='shop'>
      <Filter />
      <ProductsList/>
    </div>
  );
}

export default Shop;
