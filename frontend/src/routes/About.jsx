import React, { useEffect } from 'react';
import { useLoader } from '../hooks/useLoader';
import Services from '../components/Services';

function About() {
  const { useFakeLoader } = useLoader();

  useEffect(() => useFakeLoader(), []);
  return (
    <div className='aboutUsContainer'>
      <div className='textContainer'>
        <h1>Our <span>Story</span></h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis</p>
      </div>
      <Services />
      <div className='videoContainer'></div>
      <div className='ratingWrapper'>
        <h1>Lorem ipsum dolor sit amet, consectetur adipisicing
          elit, sed do <span>eiusmod tempor</span> incididunt.</h1>
        <div className='ratingContainer'>
          <div className='ratingCount'>
            <h1>150+</h1>
            <h1>Project</h1>
          </div>
          <div className='ratingCount'>
            <h1>359+</h1>
            <h1>Clients</h1>
          </div>
          <div className='ratingCount'>
            <h1>251+</h1>
            <h1>Rating</h1>
          </div>
          <div className='ratingCount'>
            <h1>110+</h1>
            <h1>Award</h1>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About;