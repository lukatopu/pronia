import React, { useEffect, useState } from 'react';
import { useLoader } from '../hooks/useLoader';
import { PiPhone, PiEnvelope, PiMapPin } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';

function Contact() {
  const { useFakeLoader } = useLoader();

  useEffect(() => useFakeLoader(), []);

  const { t } = useTranslation();

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
      setContactData({ fname: '', lname: '', number: '', email: '', message: '' });
    }
  };

  return (
    <div
      className="contactContainer"
      style={{ marginBottom: '50px' }}
    >
      <div className="contactWrapper">
        <div className="contactInfoContainer">
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

      <div className="googleMapContainer">
        <iframe
          title="Google Map NYC"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193571.43872278986!2d-74.11808639809872!3d40.70582545508737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c250b589a1db8d%3A0xe39715f31b08b1f!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1719421079276!5m2!1sen!2s"
          width="100%"
          height="600"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

export default Contact;
