import React, { Component } from 'react';

// import './Labels.css'
import '../Home.css'

export default class Labels extends Component {
render(){
    const { user } = this.props


        return(
            // <div className="labels overflow-list">
            <div className="labels overflow-list">
                <div className="label1">
                    <h3>{user ? `${user.displayName}'s` : "HEATMAKERS"}</h3>
                    <img src="chili-burn.png" />
                    <h4>Hot Sauce</h4>
                </div>
                
                <div className="label2">
                    <h3>{user ? `${user.displayName}'s` : "HEATMAKERS"}</h3>
                    <img src="real-chili.jpg" />
                    <h4>Hot Sauce</h4>
                </div> 

                <div className="label3">
                    <h3>{user ? `${user.displayName}'s` : "HEATMAKERS"}</h3>
                    <img src="chili-outline-bw-line.png" />
                    <h4>Hot Sauce</h4>
                </div> 
                
                <div className="label4">
                    <h3>{user ? `${user.displayName}'s` : "HEATMAKERS"}</h3>
                    <img src="../chili-logo.png" />
                    <h4>Hot Sauce</h4>
                </div>
            </div>
        )
    }
}