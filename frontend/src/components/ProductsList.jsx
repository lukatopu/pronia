import React, { useEffect, useState, useRef } from 'react';
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
  removeFromWishlist,
  selectedColors,
  selectedCategories,
}) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const productTopRef = useRef(null);
  const { useDataLoader } = useLoader();

  useEffect(() => {
    useDataLoader(() =>
      getProducts().then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
    );
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
    const sorted = [...products];
    switch (sortOption) {
      case 'price-high-low':
        sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case 'price-low-high':
        sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
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

      if (selectedColors.length > 0) {
        const productColor = product.color?.toLowerCase();
        if (!selectedColors.includes(productColor)) {
          return false;
        }
      }

      if (selectedCategories.length > 0) {
        const productCategories = product.categorie || [];
        const matchesCategory = selectedCategories.some((cat) => productCategories.includes(cat));
        if (!matchesCategory) return false;
      }

      return true;
    });
  };

  const handleSortChange = (sortOption) => {
    const filtered = filterProducts(products);
    const sorted = sortProducts(filtered, sortOption);
    setFilteredProducts(sorted);
    setCurrentPage(1);
  };

  useEffect(() => {
    const filtered = filterProducts(products);
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, priceRange, searchTerm, selectedTags, selectedColors, selectedCategories]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const scrollToProductTop = () => {
    if (productTopRef.current) {
      window.scrollTo({
        top: productTopRef.current.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="productsWrapper">
      <ProductsSort
        totalProductsCount={filteredProducts.length}
        currentPageProductsCount={paginatedProducts.length}
        onSortChange={handleSortChange}
        onViewChange={setIsGridView}
      />

      <div
        ref={productTopRef}
        className={`productsContainer ${isGridView ? 'grid-view' : 'list-view'}`}
      >
        {paginatedProducts.map((product, index) => (
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

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => {
              setCurrentPage((prev) => {
                const newPage = Math.max(prev - 1, 1);
                scrollToProductTop();
                return newPage;
              });
            }}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                scrollToProductTop();
              }}
              className={page === currentPage ? 'active' : ''}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => {
              setCurrentPage((prev) => {
                const newPage = Math.min(prev + 1, totalPages);
                scrollToProductTop();
                return newPage;
              });
            }}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductsList;
