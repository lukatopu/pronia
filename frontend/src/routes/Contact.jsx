import React, { useEffect, useState } from 'react';
import { useLoader } from '../hooks/useLoader';
import { PiPhone, PiEnvelope, PiMapPin } from 'react-icons/pi';
import backgroundImg from '../images/contactImg/contactBackground.jpg';

function Contact() {
  const { useFakeLoader } = useLoader();

  useEffect(() => useFakeLoader(), []);

  const [contactData, setContactData] = useState({
    fname: '',
    lname: '',
    number: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'number') {
      if (value.length > 9) return;
    }

    if (name === 'fname' || name === 'lname') {
      if (value.includes(' ')) return;
    }

    if(name === 'message') {
      if(value.includes('  ')) return
    }


    setContactData({ ...contactData, [name]: value });
    console.log([contactData])
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contactData.number.length < 9) {
      alert('number length is less than expected');
    } else if (!contactData.email.includes('@')) {
      alert('email must contain @');
    } else {
      alert('succesfuly sent message')
    }


  };

  return (
    <div className="contactContainer">
      <div className="contactWrapper">
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
            <p>Fill the form and our team will get back to you within 24 hours.</p>
          </div>
          <div className="contactInfo">
            <div className="infoContainer">
              <div className="iconContainer">
                <PiPhone />
              </div>
              <p>123 456 789</p>
            </div>
            <div className="infoContainer">
              <div className="iconContainer">
                <PiEnvelope />
              </div>
              <p>info@example.com</p>
            </div>
            <div className="infoContainer">
              <div className="iconContainer">
                <PiMapPin />
              </div>
              <p>13, Your Address, Here</p>
            </div>
          </div>
        </div>

        <div className="contactMessage">
          <form onSubmit={handleSubmit}>
            <div className="nameInputsContainer">
              <input
                type="text"
                name="fname"
                placeholder="First Name*"
                value={contactData.fname}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lname"
                placeholder="Last Name*"
                value={contactData.lname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="credentialInputsContainer">
              <input
                type="number"
                name="number"
                placeholder="Phone*"
                value={contactData.number}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="email"
                placeholder="Email*"
                value={contactData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="messageInputContainer">
              <textarea
                name="message"
                placeholder="Message"
                value={contactData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="commentButtonContainer">
              <button
                type="submit"
                className="commentButton"
              >
                POST COMMENT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
