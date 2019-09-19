import React, { Component } from 'react';

import './Labels.css'
import '../Home.css'

export default class Labels extends Component {
render(){
    const { user, setLabel } = this.props

        return(
            <div className="labels">
                <div>
                <div id="label1" className="label1" type="submit" onClick={(e) => {setLabel(e)}}>
                    <h3>{user ? `${user.displayName}'s` : "HEATMAKERS"}</h3>
                    <img src="chili-burn.png" alt="chili-burn.png" name="label1"/>
                    <h4>Hot Sauce</h4>
                </div>
                </div>

                <div>
                <div id="label2" className="label2" type="submit" onClick={(e) => {setLabel(e)}}>
                    <h3>{user ? `${user.displayName}'s` : "HEATMAKERS"}</h3>
                    <img src="real-chili.jpg" alt="real-chili.jpg" />
                    <h4>Hot Sauce</h4>
                </div> 
                </div>

                <div>
                <div id="label3" className="label3" type="submit" onClick={(e) => {setLabel(e)}}>
                    <h3>{user ? `${user.displayName}'s` : "HEATMAKERS"}</h3>
                    <img src="chili-outline-bw-line.png" alt="chili-outline-bw-line.png" />
                    <h4>Hot Sauce</h4>
                </div> 
                </div>

                <div>
                <div id="label4" className="label4" type="submit" onClick={(e) => {setLabel(e)}}>
                    <h3>{user ? `${user.displayName}'s` : "HEATMAKERS"}</h3>
                    <img src="chili-logo.png" alt="chili-logo.png"/>
                    <h4>Hot Sauce</h4>
                </div>
                </div>
            </div>
        )
    }
}