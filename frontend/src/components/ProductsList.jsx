import React, { useEffect, useState } from 'react';
import Product from './Product';
import { getProducts } from '../api/api.js';
import { useLoader } from '../hooks/useLoader.jsx';
import ProductsSort from './ProductsSort.jsx';

function ProductsList({fetchCart, addToCart, addToWishlist, priceRange, searchTerm, selectedTags, cart, wishlist }) {
  const [products, setProducts] = useState([]);
  const { useDataLoader } = useLoader();

  useEffect(() => {
    useDataLoader(() => getProducts().then((data) => setProducts(data)));
  }, []);

  const filteredProducts = products.filter((product) => {
    let price;  
    if (typeof product.price === 'string') {
      price = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0;
    } else {
      price = product.price;
    }
    if (price < priceRange[0] || price > priceRange[1]) return false;

    const nameEng = product.name?.eng || '';
    const nameGeo = product.name?.geo || '';
    const lowerSearch = searchTerm.toLowerCase();
    if (
      !nameEng.toLowerCase().includes(lowerSearch) &&
      !nameGeo.toLowerCase().includes(lowerSearch)
    ) {
      return false;
    }

    if (selectedTags.length > 0) {
      const categories = product.categorie || [];
      const hasMatchingTag = selectedTags.some((tag) =>
        categories.includes(tag)
      );
      if (!hasMatchingTag) return false;
    }

    return true;
  });

  return (
    <div className="productsWrapper">
      <ProductsSort />
      <div className="productsContainer">
        {filteredProducts.map((product, index) => (
          <Product
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            cart={cart}
            wishlist={wishlist}
            key={product._id || index}
            product={product}
            fetchCart={fetchCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
