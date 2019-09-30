import React, { Component } from 'react';

import '../Form.css'

export default class Recipes extends Component {

render(){
    const { recipes, user, remove, showThisRecipe, deleteThis, uid } = this.props

    let addExtras = [];
    let showSpices = [];
    
    const list = recipes.map((r, key) => {
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
        if (r && r.uid === uid && !r.delete){
            let dateCreated = r.timestamp.toDate().toDateString()
            return(
                <div className="recipe-container" key={key}>
                    <button className={remove ? "deleteBtn" : "hide-delete deteleBtn"} value={r.id} onClick={deleteThis}>X</button>
                    <form className="recipe-link">   
                        <button  className="recipe-link" type="button" name="recipe" value={r.id} onClick={(e) => {showThisRecipe(e)}}>
                                <div className="card-label pick-label ">
                                    <div className="card-left">
                                        <div className={r.label}>
                                            <h3>{r ? `${r.header}` : "HEATMAKERS"}</h3>
                                                <img src={r.img ? r.img.url : r.icon} alt={r.icon} />
                                            <h4>{r.style}</h4>
                                        </div> 
                                    </div>
                                    <div className="card-recipe card-right">
                                        <section><strong>{dateCreated}</strong></section>
                                        <img className="chalk-line" src="chalkdarkorange.png" alt="line break"/>
                                        { r.chili[1]
                                        ? <><span>Pepper:</span><section><strong>{ r.chili[0].name } & { r.chili[1].name }</strong></section></>
                                        : <><span>Pepper:</span><section><strong>{ r.chili[0].name }</strong></section></>
                                        }
                                        <img className="chalk-line" src="chalkdarkorange.png" alt="line break"/>
                                        <span>Spice:</span>{ r.spice.name && <section><strong>{ r.spice.name } Spice</strong></section> }
                                        <img className="chalk-line" src="chalkdarkorange.png" alt="line break"/>
                                        <span>Vinegar:</span>{ r.vinegar.name && <section><strong>{ r.vinegar.name }</strong></section> }
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

