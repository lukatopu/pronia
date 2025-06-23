import React from 'react';
import company1 from '../images/friendCompaniesImg/1.png';
import company2 from '../images/friendCompaniesImg/2.png';
import company3 from '../images/friendCompaniesImg/3.png';
import company4 from '../images/friendCompaniesImg/4.png';
import company5 from '../images/friendCompaniesImg/5.png';

function FriendCompanies() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="friendCompaniesContainer">
      <img
        src={company1}
        onClick={scrollToTop}
        style={{ cursor: 'pointer' }}
      />
      <img
        src={company2}
        onClick={scrollToTop}
        style={{ cursor: 'pointer' }}
      />
      <img
        src={company3}
        onClick={scrollToTop}
        style={{ cursor: 'pointer' }}
      />
      <img
        src={company4}
        onClick={scrollToTop}
        style={{ cursor: 'pointer' }}
      />
      <img
        src={company5}
        onClick={scrollToTop}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
}

export default FriendCompanies;
