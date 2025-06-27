import React, { useEffect, useState } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function RouteBanner() {
  const [title, setTitle] = useState('');
  const [mainTitle, setMainTitle] = useState('');
  const { t } = useTranslation();

  const location = useLocation();

  const titles = {
    '/shop': {
      title: 'ShopBannerT',
      mainTitle: 'ShopBannerM',
    },
    '/aboutUs': {
      title: 'AboutBannerT',
      mainTitle: 'AboutBannerM',
    },
    '/contact': {
      title: 'ContactBannerT',
      mainTitle: 'ContactBannerM',
    },
    '/pages': {
      title: 'PagesBannerT',
      mainTitle: 'PagesBannerM',
    },
    '/wishlist': {
      title: 'WishlistBannerT',
      mainTitle: 'WishlistBannerM',
    },
    '/product/:id': {
      title: 'Single Product variable',
      mainTitle: 'Single Product',
    },
    '/login': {
      title: 'LoginBannerT',
      mainTitle: 'LoginBannerM',
    },
    '/register': {
      title: 'RegisterBannerT',
      mainTitle: 'RegisterBannerM',
    },
    '/cart': {
      title: 'CartBannerT',
      mainTitle: 'CartBannerM',
    },
    '/forgot-password': {
      title: 'ForgotT',
      mainTitle: 'ForgotM',
    },
    '/reset-password/:token': {
      title: 'ResetT',
      mainTitle: 'ResetM',
    },
    '/checkout': {
      title: 'CheckoutT',
      mainTitle: 'CheckoutM',
    },
    '/profile': {
      title: 'AccountT',
      mainTitle: 'AccountM',
    }
  };

  useEffect(() => {
    const path = location.pathname;
    let matched = null;

    for (const route in titles) {
      if (matchPath({ path: route, end: true }, path)) {
        matched = titles[route];
        break;
      }
    }

    if (matched) {
      setTitle(t(matched.title));
      setMainTitle(t(matched.mainTitle));
    } else {
      setTitle('');
      setMainTitle('');
    }
  }, [location, t]);

  return (
    <div className="routeBanner">
      <h2>{mainTitle}</h2>
      <p>
        <Link to="/">{t('Home')}</Link> <span>-</span> <span>{title}</span>
      </p>
    </div>
  );
}

export default RouteBanner;
