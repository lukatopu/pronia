import React from 'react';
import Button from './Button';
import { useTranslation } from 'react-i18next';

function ProductCollections() {
  const buttonStyle = {
    width: '150px',
    height: '47px',
    opacity: '1',
    marginTop: '30px',
  };

  const { t } = useTranslation();
  return (
    <div className="productCollectionsWrapper">
      <div className="firstCollectionWrapper">
        <div className="bigDivCollection cactusBackground">
          <div className="overlayDiv1"></div>
          <div className="overlayDiv2"></div>
          <p>{t('CactusCollection')}</p>
          <h3>
            {t('PotteryPots')} <br /> {t('Plant')}
          </h3>
          <Button
            name={t('ShopNow')}
            {...buttonStyle}
          />
        </div>

        <div className="smallDivCollection aloeBackground">
          <div className="overlayDiv1"></div>
          <div className="overlayDiv2"></div>
          <p>{t('NewCollection')}</p>
          <h3>{t('PlantPort')}</h3>
          <Button
            name={t('ShopNow')}
            {...buttonStyle}
          />
        </div>
      </div>

      <div className="secondCollectionWrapper">
        <div className="smallDivCollection plantPortBackground">
          <div className="overlayDiv1"></div>
          <div className="overlayDiv2"></div>
          <p>{t('NewCollection')}</p>
          <h3>{t('PlantPort')}</h3>
          <Button
            name={t('ShopNow')}
            {...buttonStyle}
          />
        </div>
        <div className="bigDivCollection cactusBackground2">
          <div className="overlayDiv1"></div>
          <div className="overlayDiv2"></div>
          <p>{t('CactusCollection')}</p>
          <h3>
            {t('HangingPots')} <br /> {t('Plant')}
          </h3>
          <Button
            name={t('ShopNow')}
            {...buttonStyle}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCollections;
