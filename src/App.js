import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import About  from './components/About'
import Form   from './components/Form'
import Nav    from './components/Nav'
import Sale   from './components/Sale'

// import SideBar from './tutorial/sidebar/sidebar'
// import EditorComponent from './tutorial/editor/editor';

import * as routes  from './constants/routes';

const firebase = require('firebase')

export default class App extends Component {

  state = {
      chilis: [],
      spices: [],
      extras: [],
      vinegars: [],
      newRecipe: null,


        // selectedNoteIndex: null,
        // selectedNote: null, 
        // notes: null,
    
  }

  // DRY THIS UP!
  componentDidMount = () => {
    // firebase
    //   .firestore()
    //   .collection('notes')
    //   .onSnapshot(serverUpdate => {
    //     const notes = serverUpdate.docs.map(_doc => {
    //       const data = _doc.data();
    //       data['id'] = _doc.id;
    //       return data;
    //     });
    //     console.log(notes);
    //     this.setState({ notes: notes });
    //   });
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
    console.log("click submitForm")
    e.preventDefault();
    console.log(e.target, '<-----submitForm e  SUBMITFORM')
    console.log(data, '<-----submitForm data  SUBMITFORM')
    this.setState({
      newRecipe: data
    })
    const recipe = {
      chili: data.chili,
      spice: data.spice,
      extra: data.extra,
      vinegar: data.vinegar
    }
    console.log(recipe, "<---- submit recipe")
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
    const { chilis, spices, extras, vinegars, selectedNoteIndex, notes, newRecipe } = this.state
    // const { chilis, spices, extras, vinegars } = this.state.options




    return (
      <div className="grid-container">
        <div className="grid-header">HEADER</div>
        <div className="grid-nav"><Nav newRecipe={newRecipe}/></div>
        <div className="grid-logo"><img src={logo} className="App-logo" alt="logo" /></div>
        <div className="grid-main">
        
          <Switch>
            <Route path={routes.FORM} exact render={() => 
                                      <Form newRecipe={newRecipe} chilis={chilis} spices={spices} extras={extras} vinegars={vinegars} setToggleApp={this.setToggleApp} submitForm={this.submitForm}/> }/>
            <Route path={routes.SALE} render={() => 
                                      <Sale newRecipe={newRecipe}/> }/>            
            <Route path={routes.INFO} exact render={() => 
                                      <About /> }/>
            <Route path={routes.ROOT} render={() => 
                                      <About /> }/>
          </Switch>
        </div>
                
                
                
        <div className="grid-footer">FOOTER</div>



      </div>
    );
  }
}