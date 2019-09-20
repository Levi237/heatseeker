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
                            <div className="home-label labels pick-label ">
                                <div className="show-left">
                                    <div className={r.label}>
                                        <h3>{r ? `${r.header}` : "HEATMAKERS"}</h3>
                                            {r.label === "label1" && <img src="chili-burn.png" alt="chili-burn.png" name="label1"/>}
                                            {r.label === "label2" && <img src="real-chili.jpg" alt="real-chili.jpg" />}
                                            {r.label === "label3" && <img src="chili-outline-bw-line.png" alt="chili-outline-bw-line.png" />}
                                            {r.label === "label4" && <img src="chili-logo.png" alt="chili-logo.png"/>}
                                        <h4>Hot Sauce</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="dataDiv show-right">
                                <h3>{r.header}</h3>
                                <section>{r.style}</section>
                                <section>{dateCreated}</section>
                            </div>
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

