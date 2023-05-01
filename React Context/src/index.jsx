import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {HashRouter } from 'react-router-dom';
import GlobalStyles from './style/GlobalStyle';
import { FavProvider } from './context/FavContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <FavProvider>
  <GlobalStyles></GlobalStyles>
    <App />
    </FavProvider>
  </HashRouter>,
)
