import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoader } from '../hooks/useLoader';
import { useTranslation } from 'react-i18next';

function Wishlist({ wishlist }) {
  const { useFakeLoader } = useLoader();

  const { i18n, t } = useTranslation();

  useEffect(() => useFakeLoader(), []);
  return (
    <div className="wishlistPage">
      {wishlist.length === 0 ? (
        <p></p>
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
            {wishlist.map((product) => (
              <tr key={product._id}>
                <td>
                  <button>x</button>
                </td>
                <td>
                  <Link to={`/product/${product._id}`}>
                    <img
                      className="wishlistProductImage"
                      src={product.image}
                    ></img>
                  </Link>
                </td>
                <td>
                  <a>
                    {product.name?.[i18n.language] ? product.name[i18n.language] : product.name}
                  </a>
                </td>
                <td>
                  <p>{product.price}</p>
                </td>
                <td>
                  <p>{t('InStock')}</p>
                </td>
                <td>
                  <button className="addToCartButton">{t('AddToCart')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Wishlist;
