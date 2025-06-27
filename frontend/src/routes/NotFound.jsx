import React, { useEffect } from 'react';
import { useLoader } from '../hooks/useLoader';
import image404 from '../images/notFoundPage/404.png';
import { PiPaperPlaneTiltLight } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';

function NotFound() {
  const { useFakeLoader } = useLoader();
  const { t } = useTranslation();

  useEffect(() => useFakeLoader(), []);

  return (
    <div className='Wrapper404'>
      <div className='Background404'>
        <img src={image404} alt="404" />
        <h1>{t('NotFoundTitle')}</h1>
        <a href="/">
          <button>{t('BackToHome')}</button>
        </a>
      </div>
      <div className='subscribeContainer'>
        <h1>{t('SubscribeTitle')}</h1>
        <div className='inputContainer'>
          <input placeholder={t('EnterEmail')} type="text" name="email" id="email" />
          <PiPaperPlaneTiltLight />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
