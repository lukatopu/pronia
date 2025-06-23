import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/api';
import Product from './Product';

function NewProducts({ addToCart, addToWishlist, cart, wishlist }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  const newProducts = products.filter((p) => p.categorie?.includes('new'));

  return (
    <div className="newProductsWrapper">
      <div className="newProductsDescription">
        <div className="newProductsTitle">
          <h1>NEW PRODUCTS</h1>
        </div>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots <br /> in
          a piece of classical Latin literature
        </p>
      </div>
      <div className="newProductsContainer">
        {newProducts.map((product) => (
          <Product
            key={product._id}
            product={product}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            cart={cart}
            wishlist={wishlist}
          />
        ))}
      </div>
    </div>
  );
}

export default NewProducts;
