import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Form from './components/Form'

import SideBar from './sidebar/sidebar'
import EditorComponent from './editor/editor';

const firebase = require('firebase')

export default class App extends Component {

  state = {
      chilis: [],
      spices: [],
      extras: [],
      vinegars: [],
      newRecipe: [],

        selectedNoteIndex: null,
        selectedNote: null, 
        notes: null,
    
  }

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
        // recipe: recipe.data, // this is probably not right
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })


  }
  // newNote = async (title) => {
  //   const note = {
  //     title: title,
  //     body: ""
  //   }
  //   const newFromDB = await firebase.firestore()
  //   .collection('notes')
  //   .add({
  //     title: note.title,
  //     body: note.body,
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp()
  //   })
  //   const newID = newFromDB.id;
  //   await this.setState({notes: [...this.state.notes, note]});
  //   const newNoteIndex =  this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0])
  //   this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex});
  // }

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







//   setToggleApp = (e) => {
//     const { name } = e.target
//     this.setState({
//       // options{chilis.ghost.select}: true,
//         [name]: !this.state[name]
//     })
// }


  render(){
    const { chilis, spices, extras, vinegars, selectedNoteIndex, notes } = this.state
    return (
      <div className="grid-container">
        <div className="grid-header">HEADER</div>
        <div className="grid-nav">NAV</div>
        <div className="grid-logo"><img src={logo} className="App-logo" alt="logo" /></div>
        <div className="grid-main">

        {/* <SideBar 
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}></SideBar>
        {
          this.state.selectedNote ?
          <EditorComponent selectedNote={this.state.selectedNote}
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          noteUpdate={this.noteUpdate}></EditorComponent> :
          null
        } */}
        <br/><Form chilis={chilis} spices={spices} extras={extras} vinegars={vinegars} setToggleApp={this.setToggleApp} submitForm={this.submitForm}/></div>
        <div className="grid-footer">FOOTER</div>
      </div>
    );
  }
}