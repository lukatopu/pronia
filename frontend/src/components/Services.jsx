import React from 'react';
import deliveryService from '../images/serviceImg/deliveryService.png';
import paymentService from '../images/serviceImg/paymentService.png';
import aboutService from '../images/serviceImg/aboutService.png';

function Services({ small }) {
  return (
    <div className="servicesContainer">
      <div className={`serviceContainer ${small ? 'small' : ''}`}>
        <img src={deliveryService} />
        <div className="infoContainer">
          <h2>Free Shipping</h2>
          <p>Capped at $319 per order</p>
        </div>
      </div>

      <div className={`serviceContainer ${small ? 'small' : ''}`}>
        <img src={paymentService} />
        <div className="infoContainer">
          <h2>Safe Payment</h2>
          <p>With our payment gateway</p>
        </div>
      </div>

      <div className={`serviceContainer ${small ? 'small' : ''}`}>
        <img src={aboutService} />
        <div className="infoContainer">
          <h2>Best Services</h2>
          <p>Friendly & Supper Services</p>
        </div>
      </div>
    </div>
  );
}

export default Services;
