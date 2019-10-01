import React, { Component } from 'react';

export default class Recipe extends Component {
    render(){
        const {recipe} = this.props
        let addExtras = [];
        let showSpices = [];
        if (recipe && recipe.extra){
            let nre = recipe.extra
                const addExtra = nre.map((data, i) => {
                    return <li key={i}>{data.name}</li>
                })
                addExtras.push(addExtra)
            let nrs = recipe.spice.items;
            const showSpice = nrs.map((data, i) => {
                return <li key={i}>{data}</li>
            })
            showSpices.push(showSpice)
        };
        return(
            <div className="show-recipe">
                { recipe.chili[1]
                ? <><span>Pepper:</span><section><strong>{ recipe.chili[0].name } & { recipe.chili[1].name }</strong></section></>
                : <><span>Pepper:</span><section><strong>{ recipe.chili[0].name }</strong></section></>
                }
                <img className="chalk-line" src="chalkdarkorange.png" alt="line break"/>
                <span>Spice:</span>{ recipe.spice.name && <section><strong>{ recipe.spice.name } Spice</strong></section>}
                { recipe.spice.name && <ul>{ showSpices }</ul>}
                { recipe.extra[0] 
                ? <><img className="chalk-line" src="chalkdarkorange.png" alt="line break"/><section><span>Add On:</span></section><br /><ul>{ addExtras }</ul></> 
                : ""}
                <img className="chalk-line" src="chalkdarkorange.png" alt="line break"/>
                <span>Vinegar:</span>{ recipe.vinegar.name && <section><strong>{ recipe.vinegar.name }</strong></section>}
            </div>
        )
    }
}