import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Form from './components/Form'

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
    const { chilis, spices, extras } = this.state
    return (
      <div className="grid-container">
        <div className="grid-header">HEADER</div>
        <div className="grid-nav">NAV</div>
        <div className="grid-logo"><img src={logo} className="App-logo" alt="logo" /></div>
        <div className="grid-main"><Form chilis={chilis} spices={spices} extras={extras} setToggleApp={this.setToggleApp} submitForm={this.submitForm}/></div>
        <div className="grid-footer">FOOTER</div>
      </div>
    );
  }
}
