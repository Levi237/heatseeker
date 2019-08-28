import React, { Component } from 'react';
import firebase from "firebase/app"

import Username from '../components/Username';

export default class Home extends Component {


    render(){
        let currentUser = firebase.auth().currentUser;
        return(
            <div className="home">
                {currentUser && currentUser.displayName}, Welcome Home, you are logged in right now
<br /><br />
                <Username />
            </div>
        )
    }
}