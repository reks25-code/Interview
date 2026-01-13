// src/index.js (or src/main.jsx if using Vite)

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';      // Tailwind + global resets
import './global.css';     // Custom components and theme styles
import App from './App';

// Optional: Import a nice code font (Fira Code) if you plan to show code snippets
// import 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element. Check if <div id="root"></div> exists in index.html');
}

const root = ReactDOM.createRoot(rootElement);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Enhance user experience by removing loading screen smoothly
// This works with the loading screen we added in index.html
if (rootElement.children.length > 0) {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.classList.add('fade-out');
    // Also trigger the root fade-in if you have that CSS
    rootElement.classList.add('loaded');
  }
}