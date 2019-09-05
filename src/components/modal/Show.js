import React, { Component } from 'react';

export default class Show extends Component {
    render(){
        const { show, recipes } =  this.props
        let recipe = []

recipes.forEach(e => {
    // console.log(e)
    if (e.id === show){
        // console.log("yay it matches")
        recipe = e
    }
})
        return(
            <div>Show, {show}, {recipe.id}</div>
        )
    }
}