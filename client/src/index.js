import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { MoneyContextProvider } from './context/MoneyContext';
import { StocksContextProvider } from './context/StocksContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MoneyContextProvider>
        <StocksContextProvider>
          <App />
        </StocksContextProvider>
      </MoneyContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
