import React, { Component } from 'react';

import './Labels.css'
import './Home.css'

export default class Labels extends Component {
    state ={
        labels: [
            "label1 chili-burn.png", 
            "label2 real-chili.jpg",
            "label3 chili-outline-bw-line.png",
            "label4 chili-logo.png",
            "label5 real-chili.jpg",
        ]
    }
    render(){
        const { labels } = this.state
        const { user, setLabel } = this.props

        const makeList = labels.map((label) => {
            let labelImage = [];
            labelImage = label.split(" ");
            console.log(labelImage, "labelImage")

            return(
                <div>
                <div  id={label} className={labelImage[0]} type="submit" onClick={(e) => {setLabel(e)}}>
                    <h3>{user ? `${user.displayName}'s` : "HEATMAKERS"}</h3>
                    <img src={labelImage[1]} alt={labelImage[1]}/>
                    <h4>Hot Sauce</h4>
                </div>
                </div>
            )
        })

            return(
                <>
                {makeList}
                </>
                // <div className="labels">
                //     <div>
                //     <div  id="label1 chili-burn.png" className="label1" type="submit" onClick={(e) => {setLabel(e)}}>
                //         <h3>{user ? `${user.displayName}'s` : "HEATMAKERS"}</h3>
                //         <img src="chili-burn.png" alt="chili-burn.png" name="label1"/>
                //         <h4>Hot Sauce</h4>
                //     </div>
                //     </div>

                //     <div>
                //     <div  id="label2 real-chili.jpg" className="label2" type="submit" onClick={(e) => {setLabel(e)}}>
                //         <h3>{user ? `${user.displayName}'s` : "HEATMAKERS"}</h3>
                //         <img src="real-chili.jpg" alt="real-chili.jpg" />
                //         <h4>Hot Sauce</h4>
                //     </div> 
                //     </div>

                //     <div>
                //     <div  id="label3 chili-outline-bw-line.png" className="label3" type="submit" onClick={(e) => {setLabel(e)}}>
                //         <h3>{user ? `${user.displayName}'s` : "HEATMAKERS"}</h3>
                //         <img src="chili-outline-bw-line.png" alt="chili-outline-bw-line.png" />
                //         <h4>Hot Sauce</h4>
                //     </div> 
                //     </div>

                //     <div>
                //     <div  id="label4 chili-logo.png" className="label4" type="submit" onClick={(e) => {setLabel(e)}}>
                //         <h3>{user ? `${user.displayName}'s` : "HEATMAKERS"}</h3>
                //         <img src="chili-logo.png" alt="chili-logo.png"/>
                //         <h4>Hot Sauce</h4>
                //     </div>
                //     </div>

                //     <div>
                //     <div  id="label5 real-chili.jpg" className="label5" type="submit" onClick={(e) => {setLabel(e)}}>
                //         <h3>{user ? `${user.displayName}'s` : "HEATMAKERS"}</h3>
                //         <img src="real-chili.jpg" alt="real-chili.jpg" />
                //         <h4>Hot Sauce</h4>
                //     </div>
                //     </div>
                // </div>
            )
        }
    }