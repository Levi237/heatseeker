import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Form from './components/Form'

import SideBar from './sidebar/sidebar'
import EditorComponent from './editor/editor';

const firebase = require('firebase')

export default class App extends Component {

  state = {
      chilis: [{
          name: "ghost",
          heat: 10,
          price: 600,
          select: true,
        },
        {
          name: "reaper",
          heat: 14,
          price: 1000,
          select: false,
        }],
  
      spices: [{
          name: "thai",
          items: ["salt", "curry"],
          heat: 1,
          price: 400,
          select: false,
        },
          {
          name: "indian",
          items: ["cumin", "pepper"],
          heat: 1,
          price: 500,
          select: false,
        }],

        extras: [{
          name: "fresh garlic",
          heat: 0,
          price: 200,
          select: true,
        },
        {
          name: "fresh onion",
          heat: 0,
          price: 300,
          select: false,
        }],
        selectedNoteIndex: null,
        selectedNote: null, 
        notes: null,
    
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        console.log(notes);
        this.setState({ notes: notes });
      });
  }

  selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note });
  noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title, 
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  
  }


  newNote = async (title) => {
    const note = {
      title: title,
      body: ""
    }
    const newFromDB = await firebase.firestore()
    .collection('notes')
    .add({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    const newID = newFromDB.id;
    await this.setState({notes: [...this.state.notes, note]});
    const newNoteIndex =  this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0])
    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex});
  }

  deleteNote = async (note) => {
        const noteIndex = this.state.notes.indexOf(note);
        await this.setState({notes: this.state.notes.filter(_note=> _note !== note)})
        if(this.state.selectedNoteIndex === noteIndex) {
          this.setState({selectedNoteIndex: null, seectedNote: null})
        } else {
          this.state.notes.length > 1 
          ? this.selectedNote(this.state.notes[this.state.selectedNoteIndex -1], this.state.selectedNoteIndex -1)
          : this.setState({selectedNoteIndex: null, seectedNote: null})
        }
        firebase.firestore.collection('notes').doc(note.id).delete()
  }





  submitForm = (e) => {
    e.preventDefault();
    console.log(e.target, '<-----submit form')
    this.setState({
      [e.target.name]: !this.state[e.target.name]
      
    })
  }

  setToggleApp = (e) => {
    console.log("click setToggleApp")
    console.log(e.target.name)
    console.log(e.target.heat)
    const { name } = e.target
    console.log(name)
    this.setState({
      // options{chilis.ghost.select}: true,
        [name]: !this.state[name]
    })
}


  render(){
    const { chilis, spices, extras, selectedNoteIndex, notes } = this.state
    return (
      <div className="grid-container">
        <div className="grid-header">HEADER</div>
        <div className="grid-nav">NAV</div>
        <div className="grid-logo"><img src={logo} className="App-logo" alt="logo" /></div>
        <div className="grid-main">

        <SideBar 
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
        }
        <br/><Form chilis={chilis} spices={spices} extras={extras} setToggleApp={this.setToggleApp} submitForm={this.submitForm}/></div>
        <div className="grid-footer">FOOTER</div>
      </div>
    );
  }
}