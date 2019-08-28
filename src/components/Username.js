import React, { Component } from 'react';
import firebase from 'firebase/app'

export default class Username extends Component {
    state = {
        name: "",
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    updateUserName = () => {
        let currentUser = firebase.auth().currentUser;
        currentUser.updateProfile({
          displayName: this.state.name,
          // photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function() {
          // Update successful.
        }).catch((error) => {
            this.setState({updateErrors: error.message}) // need to add to state
        });
    
      }

    render(){
        return(
            <form >
                <input type="text" onChange={this.handleChange} value={this.state.name} name="name" placeholder="Edit Name"/>
                <button type="submit" onClick={this.updateUserName}>Save</button>
            </form>
        )
    }
}