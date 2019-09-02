import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom'

import './Sale.css'

// CONFIRM & CONTINUE w/ ORDER OR SAVE FOR LATER

export default class Sale extends Component {
    render(){
        const { newRecipe, clearNewRecipe, currentUser } = this.props;

        let addExtras = [];
        let showSpices = [];
        if (newRecipe){
            let nre = newRecipe.extra
                const addExtra = nre.map((data, i) => {
                    return(
                        <li key={i}>{data}</li>
                    )
                })
                addExtras.push(addExtra)
            let nrs = newRecipe.spice.items;
            const showSpice = nrs.map((data, i) => {
                return(
                    <li key={i}>{data}</li>
                )
            })
            showSpices.push(showSpice)

        }

        return(
            <>
            {   newRecipe &&
            <>
                <h2>Your Recipe</h2>
                <div className="new-recipe">
                <progress className="bored-bar" value={newRecipe.chili.heat} max="15"></progress>
                    <img src={`../chilis/${newRecipe.chili.src}`} alt={newRecipe.chili.name} />
                    <div className="show-recipe">
                        <span>Pepper:</span>{ newRecipe.chili.name && <><section><strong>{ newRecipe.chili.name }</strong></section></>}
                        <img className="chalk" src="chalkdarkorange.png" alt="line break"/>
                        <span>Spice:</span>{ newRecipe.spice.name && <section><strong>{ newRecipe.spice.name } Spice</strong></section>}
                        { newRecipe.spice.name && <ul>{ showSpices }</ul>}
                        
                        { newRecipe.extra[0] ? <><img className="chalk" src="chalkdarkorange.png" alt="line break"/><section><span>Add On:</span></section><br /><ul>{ addExtras }</ul></> : ""}
                        <img className="chalk" src="chalkdarkorange.png" alt="line break"/>
                        <span>Vinegar:</span>{ newRecipe.vinegar.name && <section><strong>{ newRecipe.vinegar.name }</strong></section>}
                    </div>
                    <h3>Total: ${(newRecipe.chili.price)/100}.00</h3>
                    { currentUser &&
                        <button onClick={clearNewRecipe}><a href="/my-home"> Save and Return Home</a></button>
                    }
                    <button><a href="/order">Continue with Order</a></button>
                    {/* :   <Redirect to={'/home'} />  */}
                    </div>
                    </>
                }
                </>

        )
    }
}