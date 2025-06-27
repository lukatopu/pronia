import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoader } from '../hooks/useLoader';
import { useTranslation } from 'react-i18next';

function Wishlist({ wishlist, cart, addToCart, removeFromWishlist }) {
  const { useFakeLoader } = useLoader();
  const [addingProductId, setAddingProductId] = useState(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    useFakeLoader();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!productId || addingProductId) return;

    try {
      setAddingProductId(productId);
      await addToCart(productId, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAddingProductId(null);
    }
  };

  return (
    <div className="wishlistPage">
      {wishlist.length === 0 ? (
        <p>{t('YourWishlistIsEmpty')}</p>
      ) : (
        <div className="tableResponsive">
          <table>
            <thead>
              <tr>
                <th>{t('Remove')}</th>
                <th>{t('Images')}</th>
                <th>{t('Product')}</th>
                <th>{t('UnitPrice')}</th>
                <th>{t('StockStatus')}</th>
                <th>{t('AddToCart')}</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((product) => {
                const isInCart = cart.some((item) => item.productId?._id === product._id);
                const isAdding = addingProductId === product._id;

                return (
                  <tr key={product._id}>
                    <td>
                      <button onClick={() => removeFromWishlist(product._id)}>x</button>
                    </td>
                    <td>
                      <Link to={`/product/${product._id}`}>
                        <img
                          className="wishlistProductImage"
                          src={`/productImg/product${product.image}.jpg`}
                          alt={product.name?.[i18n.language] || product.name}
                        />
                      </Link>
                    </td>
                    <td>
                      <span>{product.name?.[i18n.language] ?? product.name}</span>
                    </td>
                    <td>
                      <p>{product.price}</p>
                    </td>
                    <td>
                      <p>{t('InStock')}</p>
                    </td>
                    <td>
                      <button
                        onClick={() => handleAddToCart(product._id)}
                        disabled={isInCart || isAdding}
                        className="addToCartButton"
                      >
                        {isInCart ? t('AlreadyInCart') : isAdding ? t('Adding') : t('AddToCart')}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
