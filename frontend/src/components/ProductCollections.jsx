import React from 'react';
import Button from './Button';
import { useTranslation } from 'react-i18next';
import cactusCollection from '../images/productCollectionImg/cactusCollection.jpg';
import aloeCollection from '../images/productCollectionImg/aloe.jpg';
import cactusCollection2 from '../images/productCollectionImg/cactusCollection2.jpg';
import plantPortCollection from '../images/productCollectionImg/plantPort.jpg';

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
          <p>Collection Of Cactus</p>
          <h3>
            Pottery Pots & <br /> Plant
          </h3>
          <Button
            name={t('ShopNow')}
            {...buttonStyle}
          />
        </div>

        <div className="smallDivCollection aloeBackground">
          <div className="overlayDiv1"></div>
          <div className="overlayDiv2"></div>
          <p>New Collection</p>
          <h3>Plant Port</h3>
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
          <p>New Collection</p>
          <h3>Plant Port</h3>
          <Button
            name={t('ShopNow')}
            {...buttonStyle}
          />
        </div>
        <div className="bigDivCollection cactusBackground2">
          <div className="overlayDiv1"></div>
          <div className="overlayDiv2"></div>
          <p>Collection Of Cactus</p>
          <h3>
            Hanging Pots & <br /> Plant
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
