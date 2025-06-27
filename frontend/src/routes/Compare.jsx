import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/api';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../context/CurrencyContext';
import { PiCaretDownBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

function Compare({ cart, addToCart }) {
  const [products, setProducts] = useState([]);
  const [firstProduct, setFirstProduct] = useState(null);
  const [secondProductId, setSecondProductId] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [addingIds, setAddingIds] = useState([]);

  const { t, i18n } = useTranslation();
  const { currency } = useCurrency();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const data = await getProducts();
      setProducts(data);
      const stored = localStorage.getItem('compareProduct');
      if (stored) {
        setFirstProduct(JSON.parse(stored));
      }
    };
    fetch();
  }, []);

  const secondProduct = products.find(
    (p) => p._id === secondProductId || p.id === secondProductId
  );

  const convertPrice = (gelPrice) => {
    const rates = { GEL: 1, USD: 0.37, EUR: 0.34 };
    const numeric = parseFloat(gelPrice.toString().replace(/[^\d.]/g, '')) || 0;
    return (numeric * rates[currency]).toFixed(2);
  };

  const symbol = { USD: '$', EUR: '€', GEL: '₾' }[currency] || currency;

  const isInCart = (productId) =>
    cart.some((item) => item.productId?._id === productId || item.productId === productId);

  const handleAddToCart = async (productId) => {
    if (addingIds.includes(productId)) return;

    try {
      setAddingIds((prev) => [...prev, productId]);
      await addToCart(productId, 1);
    } catch (error) {
      if (
        error?.response?.status === 401 ||
        (error.message && error.message.includes('Not authorized'))
      ) {
        navigate('/login');
      } else {
        console.error('Failed to add to cart:', error);
      }
    } finally {
      setAddingIds((prev) => prev.filter((id) => id !== productId));
    }
  };

  return (
    <div className="compareContainer">
      <h1>{t('CompareProducts')}</h1>

      {firstProduct ? (
        <>
          <div className="customDropdown">
            <button
              className="dropdownToggle"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              {secondProduct
                ? secondProduct.name[i18n.language] || secondProduct.name
                : t('SelectProduct')}{' '}
              <PiCaretDownBold />
            </button>

            <ul className={`dropdownMenu ${dropdownOpen ? 'open' : ''}`}>
              {products
                .filter((p) => p._id !== firstProduct._id)
                .map((p) => (
                  <li
                    key={p._id}
                    onClick={() => {
                      setSecondProductId(p._id);
                      setDropdownOpen(false);
                    }}
                  >
                    {p.name[i18n.language] || p.name}
                  </li>
                ))}
            </ul>
          </div>

          <div className="comparisonTable">
            <table>
              <thead>
                <tr>
                  <th>{t('Attribute')}</th>
                  <th>{firstProduct.name[i18n.language] || firstProduct.name}</th>
                  <th>
                    {secondProduct
                      ? secondProduct.name[i18n.language] || secondProduct.name
                      : t('WaitingForSelection')}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t('Image')}</td>
                  <td>
                    <img
                      src={`/productImg/product${firstProduct.image}.jpg`}
                      alt=""
                      height="100"
                    />
                    <br />
                    <button
                      onClick={() => handleAddToCart(firstProduct._id)}
                      disabled={addingIds.includes(firstProduct._id) || isInCart(firstProduct._id)}
                    >
                      {addingIds.includes(firstProduct._id)
                        ? t('Adding')
                        : isInCart(firstProduct._id)
                        ? t('AlreadyInCart')
                        : t('AddToCart')}
                    </button>
                  </td>
                  <td>
                    {secondProduct ? (
                      <>
                        <img
                          src={`/productImg/product${secondProduct.image}.jpg`}
                          alt=""
                          height="100"
                        />
                        <br />
                        <button
                          onClick={() => handleAddToCart(secondProduct._id)}
                          disabled={
                            addingIds.includes(secondProduct._id) || isInCart(secondProduct._id)
                          }
                        >
                          {addingIds.includes(secondProduct._id)
                            ? t('Adding')
                            : isInCart(secondProduct._id)
                            ? t('AlreadyInCart')
                            : t('AddToCart')}
                        </button>
                      </>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
                <tr>
                  <td>{t('Name')}</td>
                  <td>{firstProduct.name[i18n.language] || firstProduct.name}</td>
                  <td>{secondProduct ? secondProduct.name[i18n.language] || secondProduct.name : '-'}</td>
                </tr>
                <tr>
                  <td>{t('Description')}</td>
                  <td>{firstProduct.description}</td>
                  <td>{secondProduct ? secondProduct.description : '-'}</td>
                </tr>
                <tr>
                  <td>{t('Price')}</td>
                  <td>
                    {symbol}
                    {convertPrice(firstProduct.price)}
                  </td>
                  <td>
                    {secondProduct ? (
                      <>
                        {symbol}
                        {convertPrice(secondProduct.price)}
                      </>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
                <tr>
                  <td>{t('Color')}</td>
                  <td>{firstProduct.color || '-'}</td>
                  <td>{secondProduct ? secondProduct.color || '-' : '-'}</td>
                </tr>
                <tr>
                  <td>{t('Rating')}</td>
                  <td>{firstProduct.rating}</td>
                  <td>{secondProduct ? secondProduct.rating : '-'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>{t('NoProductToCompare')}</p>
      )}
    </div>
  );
}

export default Compare;
