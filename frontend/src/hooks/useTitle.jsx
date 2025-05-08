import { useEffect } from 'react';

function useTitle() {
  useEffect(() => {
    switch (window.location.pathname) {
      case '/':
        document.title = 'Pronia - Plant Store';
        break;

      case '/shop':
        document.title = 'Pronia - Shop';
        break;
      case '/blog':
        document.title = 'Pronia - Blog';
        break;
      case '/aboutUs':
        document.title = 'Pronia - About';
        break;
      case '/pages':
        document.title = 'Pronia - Pages';
        break;
      case '/contact':
        document.title = 'Pronia - Contact';
        break;
      case '/wishlist':
        document.title = 'Pronia - Wishlist';
        break;
      case '/cart':
        document.title = 'Pronia - Cart';
        break;
    }
  }, [window.location.pathname]);
}

export default useTitle;
