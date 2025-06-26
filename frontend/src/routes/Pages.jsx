import React, { useEffect } from 'react';
import { useLoader } from '../hooks/useLoader';
import image404 from '../images/notFoundPage/404.png'
import { PiPaperPlaneTiltLight } from "react-icons/pi";

function Pages() {
  const { useFakeLoader } = useLoader();

  useEffect(() => useFakeLoader(), []);

  return (
    <div className='Wrapper404'>
      <div className='Background404'>
        <img src={image404} alt="" />
        <h1>Oops, page not found!</h1>
        <a href="/">
          <button>BACK TO HOME</button>
        </a>
      </div>
      <div className='subscribeContainer'>
      <h1>Subscribe Our Newsletter & Get Update Everytime</h1>
      <div className='inputContainer'>
      <input placeholder='Enter Your Email' type="text" name="email" id="email" />
      <PiPaperPlaneTiltLight/>
      </div>
      </div>
    </div>
  );
}

export default Pages;
