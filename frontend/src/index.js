import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';


const container = document.getElementById('root');

const root = createRoot(container);

// Рендер компонента App в корневой элемент
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

