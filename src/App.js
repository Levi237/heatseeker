import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import About  from './components/About';
import Form   from './components/Form';
import Nav    from './components/Nav';
import Sale   from './components/Sale';


import Home from './components/Home';
import LoginRegister from './components/LoginRegister';

import * as routes  from './constants/routes';
import firebase from 'firebase/app';
import 'firebase/app';

// const firebase = require('firebase')
// require('firebase/app')

export default class App extends Component {

  state = {

      user: null,
      chilis: [],
      spices: [],
      extras: [],
      vinegars: [],
      options: [],
      newRecipe: null,
      selection: {},
      recipes: [],
  }

  componentDidMount = () => {
    this.authListener();
    this.loadForm();
  }

  loadForm(){
    firebase
    .firestore()
    .collection('chilis')
    .onSnapshot(serverUpdate => {
      const chilis = serverUpdate.docs.map(_doc => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      });
      this.setState({ chilis: chilis });
    });
    firebase
    .firestore()
    .collection('spices')
    .onSnapshot(serverUpdate => {
      const spices = serverUpdate.docs.map(_doc => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      });
      this.setState({ spices: spices });
    });
    firebase
    .firestore()
    .collection('extras')
    .onSnapshot(serverUpdate => {
      const extras = serverUpdate.docs.map(_doc => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      });
      this.setState({ extras: extras });
    });
    firebase
    .firestore()
    .collection('vinegars')
    .onSnapshot(serverUpdate => {
      const vinegars = serverUpdate.docs.map(_doc => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      });
      this.setState({ vinegars: vinegars });
    });
  }

  authListener(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({user});
      }else{
        this.setState({user: null});
      }
    });
  };
  logout = () => {
    firebase.auth().signOut();
  }

  submitForm =  async (e, data) => {
    console.log("click")
    const creator = firebase.auth().currentUser;
    const creatorData = creator.providerData[0]
    e.preventDefault();
    this.setState({
      newRecipe: data
    })
    const newFromDB = await firebase.firestore()
      .collection('recipes')
      .add({
        chili: data.chili,
        spice: data.spice,
        extra: data.extra,
        vinegar: data.vinegar,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        creator: creatorData
      })
      return newFromDB
  }

  render(){
    const { chilis, spices, extras, vinegars, newRecipe, user } = this.state

    return (
      <div className="grid-container">
      
        <div className="grid-logo">
          <img src="tiedye-heatseekersauce.png" className="App-logo" alt="logo" />
        </div>

        <div className="grid-header">
          <h1>HEATMAKERSAUCE</h1>
        </div>

        <div className="grid-nav">
          <Nav newRecipe={newRecipe} logout={this.logout} user={user}/>
        </div>

        <div className="grid-main">
          <Switch>
            <Route path={routes.HOME} render={() => user 
                                    ? <Home/> 
                                    : <LoginRegister/>} />
            <Route path={routes.USER} render={() => 
                                      <Home /> }/>
            <Route path={routes.FORM} exact render={() => 
                                      <Form user={user} newRecipe={newRecipe} chilis={chilis} spices={spices} extras={extras} vinegars={vinegars} setToggleApp={this.setToggleApp} submitForm={this.submitForm}/> }/>
            <Route path={routes.SALE} render={() => 
                                      <Sale newRecipe={newRecipe} user={user}/> }/>                                         
            <Route path={routes.INFO} exact render={() => 
                                      <About /> }/>
            <Route path={routes.ROOT} render={() => 
                                      <About /> }/>
          </Switch>
        </div>     
        
        <div className="grid-footer">
        <img className="chalk-bottom" src="chalkdarkorange.png" alt="footer line break"/><br />
          <section>&copy;HEATSEEKERSAUCE</section>
          </div>
      </div>
    );
  }
}