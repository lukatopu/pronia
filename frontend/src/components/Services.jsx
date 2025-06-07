import React from 'react';
import deliveryService from '../images/serviceImg/deliveryService.png';
import paymentService from '../images/serviceImg/paymentService.png';
import aboutService from '../images/serviceImg/aboutService.png';
import { useTranslation } from 'react-i18next';

function Services({ small }) {
  const { t } = useTranslation();

  return (
    <div className="servicesContainer">
      <div className={`serviceContainer ${small ? 'small' : ''}`}>
        <img src={deliveryService} />
        <div className="infoContainer">
          <h2>{t('Shipping')}</h2>
          <p>{t('ShippingTxt')}</p>
        </div>
      </div>

      <div className={`serviceContainer ${small ? 'small' : ''}`}>
        <img src={paymentService} />
        <div className="infoContainer">
          <h2>{t('Payment')}</h2>
          <p>{t('PaymentTxt')}</p>
        </div>
      </div>

      <div className={`serviceContainer ${small ? 'small' : ''}`}>
        <img src={aboutService} />
        <div className="infoContainer">
          <h2>{t('Service')}</h2>
          <p>{t('ServiceTxt')}</p>
        </div>
      </div>
    </div>
  );
}

export default Services;
