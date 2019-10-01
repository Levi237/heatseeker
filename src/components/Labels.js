import React, { Component } from 'react';

import './Labels.css';

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
    };

    render(){
        const { labels } = this.state;
        const { user, setLabel } = this.props;

        const makeList = labels.map((label, key) => {
            return(
                <div key={key} className="pick-label">

                    <div  id={`${label.header} ${label.icon}`} className={label.header} type="submit" onClick={(e) => {setLabel(e)}}>
                        <input className="brand-header" name="header" value={user ? `${user.displayName}'s` : "HEATMAKERS"} type="text"/>
                        <img src={label.icon} alt={label.icon} value={label.icon}/>
                        <input className="name-sauce" name="style" value={label.style} placeholder="X Hot Sauce X" type="text"/>
                        <div><small>5 FL.OZ - 147ml</small></div>
                    </div>
                </div>
            )
        });

            return (
                <div className="labels">
                    {makeList}                  
                </div>
            );
        };
    };