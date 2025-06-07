import React, { useEffect, useState } from 'react';
import { useLoader } from '../hooks/useLoader';
import { PiPhone, PiEnvelope, PiMapPin } from 'react-icons/pi';
import backgroundImg from '../images/contactImg/contactBackground.jpg';
import { useTranslation } from 'react-i18next';

function Contact() {
  const { useFakeLoader } = useLoader();

  useEffect(() => useFakeLoader(), []);

  const { i18n, t } = useTranslation();

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

    if (name === 'message') {
      if (value.includes('  ')) return;
    }

    setContactData({ ...contactData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contactData.number.length < 9) {
      alert('number length is less than expected');
    } else if (!contactData.email.includes('@')) {
      alert('email must contain @');
    } else {
      alert('succesfuly sent message');
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
            <h1>{t('ContactInfo')}:</h1>
            <p>{t('ContactDetail')}</p>
          </div>
          <div className="contactInfo">
            <div className="infoContainer">
              <div className="iconContainer">
                <PiPhone />
              </div>
              <p>{t('ContactNumber')}</p>
            </div>
            <div className="infoContainer">
              <div className="iconContainer">
                <PiEnvelope />
              </div>
              <p>{t('ContactMail')}</p>
            </div>
            <div className="infoContainer">
              <div className="iconContainer">
                <PiMapPin />
              </div>
              <p>{t('ContactAddress')}</p>
            </div>
          </div>
        </div>

        <div className="contactMessage">
          <form onSubmit={handleSubmit}>
            <div className="nameInputsContainer">
              <input
                type="text"
                name="fname"
                placeholder={t('FirstName')}
                value={contactData.fname}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lname"
                placeholder={t('LastName')}
                value={contactData.lname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="credentialInputsContainer">
              <input
                type="number"
                name="number"
                placeholder={t('ContactPhone')}
                value={contactData.number}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="email"
                placeholder={t('ContactEmail')}
                value={contactData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="messageInputContainer">
              <textarea
                name="message"
                placeholder={t('ContactMessage')}
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
                {t('PostComment')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
