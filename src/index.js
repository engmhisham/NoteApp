import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import AuthContextProvider from './context/authContext';
import { ToastContainer } from 'react-toastify';
import TokenContextProvider from './context/tokenContext';
import NoteContextProvider from './context/noteContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TokenContextProvider>
        <NoteContextProvider>
          <App />
        </NoteContextProvider>
        <ToastContainer theme="light" autoClose='1500' />
      </TokenContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

