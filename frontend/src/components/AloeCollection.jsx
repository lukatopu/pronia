import React from 'react'
import Button from './Button';
import { useTranslation } from 'react-i18next';

function AloeCollection() {

 const buttonStyle = {
  width: '150px',
  height: '47px',
  opacity: '1',
  marginTop: '30px',
 };

 const { t } = useTranslation();
 return (
  <div className="aloeBackground">
   <div className="overlayDiv1"></div>
   <div className="overlayDiv2"></div>
   <p>New Collection</p>
   <h3>Plant Port</h3>
   <Button
    name={t('ShopNow')}
    {...buttonStyle}
   />
  </div>
 )
}

export default AloeCollection