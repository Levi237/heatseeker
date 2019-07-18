import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

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


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
