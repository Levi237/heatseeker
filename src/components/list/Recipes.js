import React, { Component } from 'react';

import Label                from '../const/Label';
import Recipe               from '../const/Recipe';

import '../Form.css';

export default class Recipes extends Component {

render(){
    const { recipes, remove, showThisRecipe, deleteThis, uid } = this.props;

    let addExtras = [];
    let showSpices = [];
    
    const list = recipes.map((r, key) => {
        if (r && r.extra){
            let nre = r.extra
                const addExtra = nre.map((data, i) => {
                    return <li key={i}>{data.name}</li>
                });
                addExtras.push(addExtra);
            let nrs = r.spice.items;
            const showSpice = nrs.map((data, i) => {
                return <li key={i}>{data}</li>
            })
            showSpices.push(showSpice);
        }
        if (r && r.uid === uid && r.timestamp && !r.delete){
            // let dateCreated = r.timestamp.toDate().toDateString();
            return (
                <div className="recipe-container" key={key}>
                    <button className={remove ? "deleteBtn" : "hide-delete deteleBtn"} value={r.id} onClick={deleteThis}>X</button>
                        <button  className="recipe-link" type="button" name="recipe" value={r.id} onClick={(e) => {showThisRecipe(e)}}>
                                <div className="card-label">
                                    <div className="card-left">
                                    <Label
                                        img={r.img}
                                        label={r.label}
                                        icon={r.icon}
                                        header={r.header}
                                        style={r.style}
                                        />
                                    </div>
                                    <div className="card-recipe card-right">
                                        <Recipe recipe={r} />
                                    </div>
                                </div> 
                        </button>
                </div>
            )
        }
    });
        return(
            <>
                <h2>CREATIONS</h2>
                <img className="chalk" src="chalkdarkorange.png" alt="line break"/> 
                <div className="overflow">
                        {list}
                </div>
            </>
        );
    };
};