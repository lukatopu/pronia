import React, { useEffect, useState } from 'react';
import Product from './Product';
import { getProducts } from '../api/api.js';
import { useLoader } from '../hooks/useLoader.jsx';
import ProductsSort from './ProductsSort.jsx';

function ProductsList({
  fetchCart,
  addToCart,
  addToWishlist,
  priceRange,
  searchTerm,
  selectedTags,
  cart,
  wishlist,
  removeFromWishlist
}) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const { useDataLoader } = useLoader();

  useEffect(() => {
    useDataLoader(() => getProducts().then((data) => {
      setProducts(data);
      setFilteredProducts(data);
    }));
  }, []);

  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price !== 'string') return 0;
    
    let numericString = '';
    let hasDecimal = false;
    
    for (const char of price) {
      if (char >= '0' && char <= '9') {
        numericString += char;
      } else if (char === '.' && !hasDecimal) {
        numericString += char;
        hasDecimal = true;
      }
    }
    
    return parseFloat(numericString) || 0;
  };

  const sortProducts = (products, sortOption) => {
    let sorted = [...products];
    switch (sortOption) {
      case 'price-high-low':
        sorted.sort((a, b) => {
          const priceA = parsePrice(a.price);
          const priceB = parsePrice(b.price);
          return priceB - priceA;
        });
        break;
      case 'price-low-high':
        sorted.sort((a, b) => {
          const priceA = parsePrice(a.price);
          const priceB = parsePrice(b.price);
          return priceA - priceB;
        });
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }
    return sorted;
  };

  const handleSortChange = (sortOption) => {
    const filtered = filterProducts(products);
    const sorted = sortProducts(filtered, sortOption);
    setFilteredProducts(sorted);
  };

  const filterProducts = (products) => {
    return products.filter((product) => {
      const price = parsePrice(product.price);
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
        const hasMatchingTag = selectedTags.some((tag) => categories.includes(tag));
        if (!hasMatchingTag) return false;
      }

      return true;
    });
  };

  useEffect(() => {
    const filtered = filterProducts(products);
    setFilteredProducts(filtered);
  }, [products, priceRange, searchTerm, selectedTags]);

  return (
    <div className="productsWrapper">
      <ProductsSort 
        onSortChange={handleSortChange} 
        onViewChange={setIsGridView} 
      />
      <div className={`productsContainer ${isGridView ? 'grid-view' : 'list-view'}`}>
        {filteredProducts.map((product, index) => (
          <Product
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            cart={cart}
            wishlist={wishlist}
            key={product._id || index}
            product={product}
            fetchCart={fetchCart}
            isListView={!isGridView}
            removeFromWishlist={removeFromWishlist}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;