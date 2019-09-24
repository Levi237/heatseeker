import React, { Component } from 'react';

import './Labels.css'

export default class Labels extends Component {
    state ={
        labels: [{
            header: "label1",
            icon: "chili-burn.png"
        },{
            header: "label2",
            icon: "real-chili.jpg"
        },{
            header: "label3",
            icon: "chili-outline-bw-line.png"
        },{
            header: "label4",
            icon: "chili-logo.png"
        },{
            header: "label5",
            icon: "real-chili.jpg"
        }]
    }
    render(){
        const { labels } = this.state
        const { user, setLabel } = this.props

        const makeList = labels.map((label, key) => {
            return(
                <div key={key}>
                <div  id={`${label.header} ${label.icon}`} className={label.header} type="submit" onClick={(e) => {setLabel(e)}}>
                    <h3>{user ? `${user.displayName}'s` : "HEATMAKERS"}</h3>
                    <img src={label.icon} alt={label.icon} value={label.icon}/>
                    <h4>Hot Sauce</h4>
                </div>
                </div>
            )
        })

            return(
                <div className="labels">
                    {makeList}                  
                </div>
            )
        }
    }