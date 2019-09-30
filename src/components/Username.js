import React, { Component } from 'react';
import firebase from 'firebase/app'

export default class Username extends Component {
    state = {
        name: "",
        updateErrors: null,
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    updateUserName = () => {
        console.log(this.state.name)
        let currentUser = firebase.auth().currentUser;
        console.log(currentUser)
        currentUser.updateProfile({
          displayName: this.state.name,
        }).then(function() {
        }).catch((error) => {
            this.setState({updateErrors: error.message}) 
        });
      }

    render(){
        return(
            <form>
                <input type="text" onChange={this.handleChange} value={this.state.name} name="name" placeholder="Edit Name"/>
                <button type="submit" onClick={this.updateUserName}>Save Name</button>
            </form>
        )
    }
}