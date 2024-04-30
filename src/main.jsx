// main.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'; // Cambia la ruta de importación
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

