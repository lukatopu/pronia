import React, { useState } from 'react';
import { placeOrder } from '../api/api';
import countries from '../data/countries.json';

function Checkout({ cart, setCart }) {
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

  const subtotal = cart.reduce((total, item) => {
    const price =
      typeof item.productId.price === 'string'
        ? parseFloat(item.productId.price)
        : item.productId.price;
    return total + price * item.quantity;
  }, 0);

  const shipping = cart.length === 0 ? 0 : 5.99;
  const total = subtotal + shipping;

  const getProductName = (nameObj) => {
    if (typeof nameObj === 'string') return nameObj;
    if (nameObj?.eng) return nameObj.eng;
    return 'Product';
  };

  const handlePlaceOrder = async () => {
    if (!cart || cart.length === 0) {
      alert('There is nothing in the cart!');
      return;
    }

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

      alert('Successfully placed order!');
    } catch (error) {
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="checkoutContainer">
      <div className="billingDetails">
        <h2>Billing details</h2>
        <div className="formGroup">
          <label htmlFor="country">Country / Region</label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Select a country</option>
            {countries.map((countryObj) => (
              <option
                key={countryObj.code}
                value={countryObj.code}
              >
                {countryObj.name}
              </option>
            ))}
          </select>
        </div>
        <div className="nameFields">
          <div className="formGroup">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              id="firstName"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              id="lastName"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="company">Company name (optional)</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="address">Street address</label>
          <input
            type="text"
            id="address"
            required
            placeholder="House number and street name"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="city">Town / City</label>
          <input
            type="text"
            id="city"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="nameFields">
          <div className="formGroup">
            <label htmlFor="state">State / County</label>
            <input
              type="text"
              id="state"
              required
              value={stateInput}
              onChange={(e) => setStateInput(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="postcode">Postcode / ZIP</label>
            <input
              type="text"
              id="postcode"
              required
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
          </div>
        </div>

        <div className="nameFields">
          <div className="formGroup">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="orderSummary">
        <h1>Your order</h1>
        <div className="orderItems">
          <div className="orderHeader">
            <span>Product</span>
            <span>Total</span>
          </div>
          {cart.map((item) => (
            <div
              key={item._id}
              className="orderItem"
            >
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
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="totalRow">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
        </div>
        <div className="grandTotal">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          className="placeOrderBtn"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
