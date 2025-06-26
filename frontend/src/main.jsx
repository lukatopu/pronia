import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './language/i18n.js';
import App from './App.jsx';
import { LoaderProvider } from './hooks/useLoader';
import { CurrencyProvider } from './context/CurrencyContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <LoaderProvider>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </LoaderProvider>
    </Router>
  </StrictMode>
);
