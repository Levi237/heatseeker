import React, { Component } from 'react';

import '../Form.css'

export default class RecipeList extends Component {

render(){
    const { recipes, user, remove, showThisRecipe, deleteThis } = this.props
       
    const list = recipes.map((r, i) => {
        if (r.email && r.email === user.email && r.timestamp  && !r.delete){
            let dateCreated = r.timestamp.toDate().toDateString()

            return(
                <div className="user-show-recipe" key={i}>
                    <button className={remove ? "deleteBtn" : "hide-delete deteleBtn"} value={r.id} onClick={deleteThis}>X</button>
                    <form className="linkBtn" >

                        <button  className="linkBtn" type="button" name="recipe" value={r.id} onClick={(e) => {showThisRecipe(e)}}>
                        <div key={i} className="recipe-data">
                        <div className="labels pick-label">
                            <div className={r.label}></div>
                        </div>
                            <h3>{r.header}</h3>
                            <section>{r.style}</section>
                            <section>{dateCreated}</section>
                        </div>
                        </button>
                        
                    </form>
                </div>
            )
        }
    })

    return(
        <>
        {list}
        </>
    )
}
}

