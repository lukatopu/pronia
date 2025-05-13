import React, { useEffect } from 'react';
import { useLoader } from '../hooks/useLoader';
import { PiPhone, PiEnvelope, PiMapPin } from 'react-icons/pi';
import backgroundImg from '../images/contactImg/contactBackground.jpg';

function Contact() {
  const { useFakeLoader } = useLoader();

  useEffect(() => useFakeLoader(), []);

  return (
    <div className="contactContainer">
      <div className='contactWrapper'>
      <div
        className="contactInfoContainer"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="contactDetails">
          <h1>Contact Info:</h1>
          <p>Fill the form amd our teaam will get to back to you within 24 hours.</p>
        </div>
        <div className="contactInfo">
          <div className="infoContainer">
            <div className='iconContainer'><PiPhone /></div>
            <p>123 456 789</p>
          </div>
          <div className="infoContainer">
            <div className='iconContainer'><PiEnvelope /></div>
            <p>info@example.com</p>
          </div>
          <div className="infoContainer">
            <div className='iconContainer'><PiMapPin /></div>
            <p>13, Your Address, Here</p>
          </div>
        </div>
      </div>


      <div className="contactMessage">
        <div className='nameInputsContainer'>
          <input type='text' placeholder='First Name*'/>
          <input type='text' placeholder='Last Name*'/>
        </div>
        <div className='credentialInputsContainer'>
          <input type='text' placeholder='Phone*'/>
          <input type='text' placeholder='Email*'/>
        </div>

        <div className='messageInputContainer'>
          <textarea placeholder='Message'></textarea>
        </div>
        
      </div>
    </div>
    </div>
  );
}

export default Contact;
