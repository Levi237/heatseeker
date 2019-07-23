import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

const firebase = require('firebase');
require('firebase/firestore')

  firebase.initializeApp({
    apiKey: "AIzaSyB06q_xc_3K7zv8_iCW3KTM0GTMl4OyHUA",
    authDomain: "heatseeker-custom.firebaseapp.com",
    databaseURL: "https://heatseeker-custom.firebaseio.com",
    projectId: "heatseeker-custom",
    storageBucket: "heatseeker-custom.appspot.com",
    messagingSenderId: "419102714310",
    appId: "1:419102714310:web:78e1e61a67ec4cad"
  });

  ReactDOM.render(
    <Router>
        <App />
    </Router>, 
    document.getElementById('root'));

serviceWorker.unregister();
