import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoader } from '../hooks/useLoader';
import { useTranslation } from 'react-i18next';

function Wishlist({ wishlist, cart, addToCart, removeFromWishlist }) {
  const { useFakeLoader } = useLoader();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    useFakeLoader();
  }, []);

  return (
    <div className="wishlistPage">
      {wishlist.length === 0 ? (
        <p>{t('YourWishlistIsEmpty')}</p>
      ) : (
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
                      onClick={() => addToCart(product._id, 1)}
                      disabled={isInCart}
                      className="addToCartButton"
                    >
                      {isInCart ? t('AlreadyInCart') : t('AddToCart')}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Wishlist;
