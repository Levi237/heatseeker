import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/firestore';

  firebase.initializeApp({
    apiKey: "process.env.API_KEY",
    authDomain: "process.env.AUTH_DOMAIN",
    databaseURL: "process.env.DATABASE_URL",
    projectId: "heatseeker-custom",
    storageBucket: "process.env.STORAGE_BUCKET",
    messagingSenderId: "process.env.MESSAGING_SENDER_ID",
    appId: "process.env.APP_ID"
  });

  ReactDOM.render(
    <Router>
        <App />
    </Router>, 
    document.getElementById('root'));

serviceWorker.unregister();
