import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/api';
import Product from './Product';
import { useTranslation } from 'react-i18next';

function NewProducts({ addToCart, addToWishlist, cart, wishlist }) {
  const [products, setProducts] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  const newProducts = products.filter((p) => p.categorie?.includes('new'));

  return (
    <div className="newProductsWrapper">
      <div className="newProductsDescription">
        <div className="newProductsTitle">
          <h1>{t('NewProductsTitle')}</h1>
        </div>
        <p>{t('TeamSectionSub')}</p>
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
