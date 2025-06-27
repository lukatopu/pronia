import React, { useState, useEffect } from 'react';
import { placeOrder, getCurrentUser } from '../api/api';
import countries from '../data/countries.json';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../hooks/useLoader';

function Checkout({ cart, setCart }) {
  const { t, i18n } = useTranslation();
  const { useFakeLoader } = useLoader();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [country, setCountry] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateInput, setStateInput] = useState('');
  const [postcode, setPostcode] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => useFakeLoader(), []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        if (Array.isArray(user.addresses) && user.addresses.length > 0) {
          setAddresses(user.addresses);
          const selected = user.addresses[0];
          setCountry(selected.country || '');
          setCompany(selected.company || '');
          setAddress(selected.address || '');
          setCity(selected.city || '');
          setStateInput(selected.state || '');
          setPostcode(selected.postcode || '');
        }
        setFirstName(user.firstName || '');
        setLastName(user.lastName || '');
        setEmail(user.email || '');
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (addresses[selectedAddressIndex]) {
      const selected = addresses[selectedAddressIndex];
      setCountry(selected.country || '');
      setCompany(selected.company || '');
      setAddress(selected.address || '');
      setCity(selected.city || '');
      setStateInput(selected.state || '');
      setPostcode(selected.postcode || '');
    }
  }, [selectedAddressIndex, addresses]);

  const subtotal = cart.reduce((total, item) => {
    const price = typeof item.productId.price === 'string'
      ? parseFloat(item.productId.price)
      : item.productId.price;
    return total + price * item.quantity;
  }, 0);

  const shipping = cart.length === 0 ? 0 : 5.99;
  const total = subtotal + shipping;

  const getProductName = (nameObj) => {
    if (typeof nameObj === 'string') return nameObj;
    return nameObj?.[i18n.language] || nameObj?.eng || t('Product');
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{9}$/.test(phone);

  const handlePlaceOrder = async () => {
    const newErrors = {};

    if (!country) newErrors.country = t('CountryError');
    if (firstName.trim().length < 2) newErrors.firstName = t('FirstNameError');
    if (lastName.trim().length < 2) newErrors.lastName = t('LastNameError');
    if (!address.trim()) newErrors.address = t('AddressError');
    if (!city.trim()) newErrors.city = t('CityError');
    if (!stateInput.trim()) newErrors.stateInput = t('StateError');
    if (!postcode.trim()) newErrors.postcode = t('PostcodeError');
    if (!validateEmail(email)) newErrors.email = t('EmailError');
    if (!validatePhone(phone)) newErrors.phone = t('PhoneError');
    if (!cart || cart.length === 0) newErrors.cart = t('CartEmptyError');

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await placeOrder();
      setCart([]);
      setCountry('');
      setFirstName('');
      setLastName('');
      setCompany('');
      setAddress('');
      setCity('');
      setStateInput('');
      setPostcode('');
      setEmail('');
      setPhone('');
      setErrors({});
      alert(t('OrderSuccess'));
    } catch (error) {
      alert(t('OrderFail'));
    }
  };

  return (
    <div className="checkoutContainer">
      <div className="billingDetails">
        <h2>{t('BillingDetails')}</h2>

        {addresses.length > 1 && (
          <div className="formGroup">
            <label>{t('SelectSavedAddress')}</label>
            <select
              value={selectedAddressIndex}
              onChange={(e) => setSelectedAddressIndex(Number(e.target.value))}
            >
              {addresses.map((addr, index) => (
                <option key={index} value={index}>
                  {[addr.address, addr.city, addr.state, addr.postcode, addr.country].filter(Boolean).join(', ')}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="nameFields">
          <div className="formGroup">
            <p className="errorMessage">{errors.firstName || ' '}</p>
            <label htmlFor="firstName">{t('FirstName')}</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <p className="errorMessage">{errors.lastName || ' '}</p>
            <label htmlFor="lastName">{t('LastName')}</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="formGroup">
          <p className="errorMessage">{' '}</p>
          <label htmlFor="company">{t('CompanyOptional')}</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="formGroup">
          <p className="errorMessage">{errors.address || ' '}</p>
          <label htmlFor="address">{t('StreetAddress')}</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="formGroup">
          <p className="errorMessage">{errors.city || ' '}</p>
          <label htmlFor="city">{t('City')}</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="nameFields">
          <div className="formGroup">
            <p className="errorMessage">{errors.stateInput || ' '}</p>
            <label htmlFor="state">{t('StateCounty')}</label>
            <input
              type="text"
              id="state"
              value={stateInput}
              onChange={(e) => setStateInput(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <p className="errorMessage">{errors.postcode || ' '}</p>
            <label htmlFor="postcode">{t('PostcodeZip')}</label>
            <input
              type="text"
              id="postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
          </div>
        </div>

        <div className="nameFields">
          <div className="formGroup">
            <p className="errorMessage">{errors.email || ' '}</p>
            <label htmlFor="email">{t('EmailAddress')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <p className="errorMessage">{errors.phone || ' '}</p>
            <label htmlFor="phone">{t('ContactPhone')}</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => {
                const input = e.target.value;
                if (input.length <= 9 && /^[0-9]*$/.test(input)) {
                  setPhone(input);
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="orderSummary">
        <h1>{t('YourOrder')}</h1>
        <div className="orderItems">
          <div className="orderHeader">
            <span>{t('Product')}</span>
            <span>{t('Total')}</span>
          </div>
          {cart.map((item) => (
            <div key={item._id} className="orderItem">
              <span>
                {getProductName(item.productId.name)} × {item.quantity}
              </span>
              <span>
                $
                {(
                  (typeof item.productId.price === 'string'
                    ? parseFloat(item.productId.price)
                    : item.productId.price) * item.quantity
                ).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="orderTotals">
          <div className="totalRow">
            <span>{t('Subtotal')}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="totalRow">
            <span>{t('Shipping')}</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
        </div>
        <div className="grandTotal">
          <span>{t('Total')}</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <p className="errorMessage">{errors.cart || ' '}</p>
        <button className="placeOrderBtn" onClick={handlePlaceOrder}>
          {t('PlaceOrder')}
        </button>
      </div>
    </div>
  );
}

export default Checkout;