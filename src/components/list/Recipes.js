import React, { Component } from 'react';

export default class RecipeList extends Component {
render(){
    const { recipes, user, remove, showThisRecipe, deleteThis } = this.props

    let listList = []
if (user && recipes){            
    let list = recipes.map((r, i) => {
        if (r.email) {
            let dateCreated = r.timestamp.toDate().toDateString()
            // console.log(date)
        if (r.email === user.email && !r.delete) {
            return(
                <div className="user-show-recipe">
                <button className={remove ? "deleteBtn" : "hide-delete deteleBtn"} value={r.id} onClick={deleteThis}>X</button>
                <form className="linkBtn" key={i}>
                    <button  className="linkBtn" type="button" name="recipe" value={r.id} onClick={(e) => {showThisRecipe(e)}}>
                    <div className="recipe-data">
                        <section>{r.style}</section>
                        <section>{dateCreated}</section>
                    </div>

                    </button>
                </form>
                </div>
            )
        }
    }
    })
    listList.push(list)
}
    return(
        <>{listList}</>
    )
}
}

