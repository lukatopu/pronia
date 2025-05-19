import React, { useEffect, useState } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';

function RouteBanner() {
  const [title, setTitle] = useState('');
  const [mainTitle, setMainTitle] = useState('');

  const location = useLocation();

  const titles = {
    '/shop': {
      title: 'shop Default',
      mainTitle: 'shop',
    },
    '/blog': {
      title: 'Blog Grid View',
      mainTitle: 'blog',
    },
    '/aboutUs': {
      title: 'About Us',
      mainTitle: 'about us',
    },
    '/contact': {
      title: 'Contact Us',
      mainTitle: 'contact',
    },
    '/pages': {
      title: 'pages',
      mainTitle: 'pages',
    },
    '/wishlist': {
      title: 'Wishlist',
      mainTitle: 'Wishlist Page',
    },
    '/product/:id': {
      title: 'Single Product variable',
      mainTitle: 'Single Product',
    },
    '/login': {
      title: 'Login',
      mainTitle: 'LOGIN PAGE',
    },
    '/register': {
      title: 'Register',
      mainTitle: 'REGISTER PAGE',
    },
    '/cart': {
      title: 'Cart Page',
      mainTitle: 'CART PAGE',
    },
    '/forgot-password': {
      title: 'forgot password',
      mainTitle: 'FORGOT PASSWORD',
    },
    '/reset-password/:token': {
      title: 'reset password',
      mainTitle: 'RESET PASSWORD',
    },
  };

  useEffect(() => {
    const path = location.pathname;

    if (titles[path]) {
      setTitle(titles[path].title);
      setMainTitle(titles[path].mainTitle);
    } else if (matchPath('/product/:id', path)) {
      setTitle(titles['/product/:id'].title);
      setMainTitle(titles['/product/:id'].mainTitle);
    }
  }, [location]);

  return (
    <div className="routeBanner">
      <h2>{mainTitle}</h2>
      <p>
        <Link to="/">Home</Link> <span>-</span> <span>{title}</span>
      </p>
    </div>
  );
}

export default RouteBanner;
