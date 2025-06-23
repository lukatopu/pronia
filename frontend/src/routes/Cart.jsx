import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoader } from '../hooks/useLoader';
import Counter from '../components/Counter';
import { useTranslation } from 'react-i18next';

function Cart({ cart }) {
  const { useFakeLoader } = useLoader();

  const { i18n, t } = useTranslation();

  useEffect(() => useFakeLoader(), []);
  return (
    <div className="wishlistPage">
      {cart.length === 0 ? (
        <p>NOTHING IN CART</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>{t('Remove')}</th>
              <th>{t('Images')}</th>
              <th>{t('Product')}</th>
              <th>{t('UnitPrice')}</th>
              <th>{t('Quantity')}</th>
              <th>{t('Total')}</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product) => (
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
                  <Counter />
                </td>
                <td>
                  <p>{t('Total')}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Cart;
