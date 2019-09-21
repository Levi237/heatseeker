import React, { Component } from 'react';

import '../Form.css'

export default class RecipeList extends Component {

render(){
    const { recipes, user, remove, showThisRecipe, deleteThis } = this.props

    let addExtras = [];
    let showSpices = [];
    const list = recipes.map((r, i) => {
        if (r && r.extra){
            let nre = r.extra
                const addExtra = nre.map((data, i) => {
                    return(
                        <li key={i}>{data.name}</li>
                    )
                })
                addExtras.push(addExtra)
            let nrs = r.spice.items;
            const showSpice = nrs.map((data, i) => {
                return(
                    <li key={i}>{data}</li>
                )
            })
            showSpices.push(showSpice)
        }
        if (r.email && r.email === user.email && r.timestamp  && !r.delete){
            let dateCreated = r.timestamp.toDate().toDateString()

            return(
                <div className="user-show-recipe" key={i}>
                    <button className={remove ? "deleteBtn" : "hide-delete deteleBtn"} value={r.id} onClick={deleteThis}>X</button>

                    <form className="linkBtn" >
                        <button  className="linkBtn" type="button" name="recipe" value={r.id} onClick={(e) => {showThisRecipe(e)}}>

                            <div key={i} className="recipe-data">
                            
                                <div className="home-label pick-label ">
                                    <div className="show-left">

                                        <div className={r.label}>
                                            <h3>{r ? `${r.header}` : "HEATMAKERS"}</h3>
                                                {r.label === "label1" && <img src="chili-burn.png" alt="chili-burn.png" name="label1"/>}
                                                {r.label === "label2" && <img src="real-chili.jpg" alt="real-chili.jpg" />}
                                                {r.label === "label3" && <img src="chili-outline-bw-line.png" alt="chili-outline-bw-line.png" />}
                                                {r.label === "label4" && <img src="chili-logo.png" alt="chili-logo.png"/>}
                                            <h4>{r.style}e</h4>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="dataDiv show-right">
                                    <div className="show-recipe show-right">

                                        <section><strong>{dateCreated}</strong></section>
                                        <img className="chalk-line" src="chalkdarkorange.png" alt="line break"/>
                                        { r.chili[1]
                                        ? <><span>Pepper:</span><section><strong>{ r.chili[0].name } & { r.chili[1].name }</strong></section></>
                                        : <><span>Pepper:</span><section><strong>{ r.chili[0].name }</strong></section></>
                                        }
                                        <img className="chalk-line" src="chalkdarkorange.png" alt="line break"/>
                                        <span>Spice:</span>{ r.spice.name && <section><strong>{ r.spice.name } Spice</strong></section>}
                                        <img className="chalk-line" src="chalkdarkorange.png" alt="line break"/>
                                        <span>Vinegar:</span>{ r.vinegar.name && <section><strong>{ r.vinegar.name }</strong></section>}
                                    </div>
                                </div>

                            </div>
                            
                        </button>
                    </form>
                </div>
            )
        }
    })

    return(
        <div>
            <h2>CREATIONS</h2>
                <img className="chalk" src="chalkdarkorange.png" alt="line break"/> 
                {list}
        </div>
    )
}
}

