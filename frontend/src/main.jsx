import React from 'react'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <ToastContainer autoClose={2500} />
      <App />
    </Provider>
  </React.StrictMode>,
)
