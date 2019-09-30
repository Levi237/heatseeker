import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import thunk from 'redux-thunk';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import dataReducer from './reducers/dataReducer'
import userReducer from './reducers/userReducer'

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
// import { arrayTypeAnnotation } from '@babel/types';


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



  // let dataReducer = (state = [], action) => {
  //   return state
  // }
  // let userReducer = (state = '', { type, payload }) => {
  //   switch (type) {
  //     case 'updateUser':
  //       return payload;
  //   }
  //   return state
  // }

  const allReducers = combineReducers({
    data: dataReducer,
    userName: userReducer
  })
  const allStoreEnhancers = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  const store = createStore(
    allReducers, 
      {
        data: [{a: 'aaa', b:'bbb'}],
        userName: 'bob'
      },
      allStoreEnhancers
      // window.devToolsExtension && window.devToolsExtension()
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  console.log(store.getState())

  // const updateUserAction = {
  //   type: 'updateUser',
  //   payload: {
  //     userName: 'John',
  //   }
  // }
  // store.dispatch(updateUserAction)

  ReactDOM.render(
    <Router>
      <Provider store={store}>
        <App aRandomProps="whatever"/>
      </Provider>
    </Router>, 
    document.getElementById('root'));

serviceWorker.unregister();
