import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import { createStore } from 'redux';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

  const reducer = () => {
    return 'State'
  }
  const store = createStore(reducer);

  firebase.initializeApp({
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: "heatseeker-custom.firebaseapp.com",
    databaseURL: "https://heatseeker-custom.firebaseio.com",
    projectId: "heatseeker-custom",
    storageBucket: "heatseeker-custom.appspot.com",
    messagingSenderId: "419102714310",
    appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`
  });
  const storage = firebase.storage();
  export { storage, firebase as default }

  console.log(store.getState)
  
  ReactDOM.render(
    <Router>
        <App />
    </Router>, 
    document.getElementById('root'));

serviceWorker.unregister();
