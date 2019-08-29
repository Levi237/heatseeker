import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import About  from './components/About';
import Form   from './components/Form';
import Nav    from './components/Nav';
import Sale   from './components/Sale';


import Home from './components/Home';
// import Username from './components/Username';
import LoginRegister from './components/LoginRegister';

// import SideBar from './tutorial/sidebar/sidebar'
// import EditorComponent from './tutorial/editor/editor';

import * as routes  from './constants/routes';


const firebase = require('firebase')

export default class App extends Component {

  state = {

      user: null,
      currentUser: [],
      chilis: [],
      spices: [],
      extras: [],
      vinegars: [],
      options: [],
      newRecipe: null,
      selection: {},
      recipes: [],


        // selectedNoteIndex: null,
        // selectedNote: null, 
        // notes: null,
    
  }

  // DRY THIS UP!
  componentDidMount = () => {
    this.authListener();
    this.loadForm();
    firebase
      .firestore()
      .collection('selection')
      .onSnapshot(serverUpdate => {
        const selection = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        this.setState({ selection: selection });
      });
      
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

    // firebase
    // .firestore()
    // .collection('options')
    // .onSnapshot(serverUpdate => {
    //   const options = serverUpdate.docs.map(_doc => {
    //     const data = _doc.data();
    //     data['id'] = _doc.id;
    //     return data;
    //   });
    //   this.setState({ options: options });
    // });
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


  
  // selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note });
  // noteUpdate = (id, noteObj) => {
  //   firebase
  //     .firestore()
  //     .collection('notes')
  //     .doc(id)
  //     .update({
  //       title: noteObj.title, 
  //       body: noteObj.body,
  //       timestamp: firebase.firestore.FieldValue.serverTimestamp()
  //     });
  // }


  
  submitForm =  async (e, data) => {
    e.preventDefault();
    this.setState({
      newRecipe: data
    })
    const recipe = {
      chili: data.chili,
      spice: data.spice,
      extra: data.extra,
      vinegar: data.vinegar
    }
    const newFromDB = await firebase.firestore()
      .collection('recipes')
      .add({
        chili: data.chili,
        spice: data.spice,
        extra: data.extra,
        vinegar: data.vinegar,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  // deleteNote = async (note) => {
  //       const noteIndex = this.state.notes.indexOf(note);
  //       await this.setState({notes: this.state.notes.filter(_note=> _note !== note)})
  //       if(this.state.selectedNoteIndex === noteIndex) {
  //         this.setState({selectedNoteIndex: null, seectedNote: null})
  //       } else {
  //         this.state.notes.length > 1 
  //         ? this.selectedNote(this.state.notes[this.state.selectedNoteIndex -1], this.state.selectedNoteIndex -1)
  //         : this.setState({selectedNoteIndex: null, seectedNote: null})
  //       }
  //       firebase.firestore.collection('notes').doc(note.id).delete()
  // }

  render(){
    const { chilis, spices, extras, vinegars, newRecipe, user } = this.state
    
    let currentUser = firebase.auth().currentUser;
    if (currentUser != null) {
      currentUser.providerData.forEach((profile) => {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    }
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
                                      <Form newRecipe={newRecipe} chilis={chilis} spices={spices} extras={extras} vinegars={vinegars} setToggleApp={this.setToggleApp} submitForm={this.submitForm}/> }/>
            <Route path={routes.SALE} render={() => 
                                      <Sale newRecipe={newRecipe} user={user}/> }/>                                         
            <Route path={routes.INFO} exact render={() => 
                                      <About /> }/>
            <Route path={routes.ROOT} render={() => 
                                      <About /> }/>
          </Switch>
        </div>     

        <div className="grid-footer">&copy;HEATSEEKERSAUCE</div>
      </div>
    );
  }
}