import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ChakraTheme from './theme/ChakraTheme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <BrowserRouter> {/* BrowserRouter for routes using react-router-dom  */}
        <ChakraTheme>
          <App />
        </ChakraTheme>
      </BrowserRouter>
  </React.StrictMode>
);

