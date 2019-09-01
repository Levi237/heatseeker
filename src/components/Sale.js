import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom'

import './Sale.css'

// CONFIRM & CONTINUE w/ ORDER OR SAVE FOR LATER

export default class Sale extends Component {
    render(){
        const { newRecipe } = this.props;

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
                <h2>Your Recipe:</h2>
                <div className="new-recipe">
                
                    <img src={`../chilis/${newRecipe.chili.img}`} />
                    <div className="show-recipe">
                        <span>Pepper</span>{ newRecipe.chili.name && <><section><strong>{ newRecipe.chili.name }</strong></section><br /></>}
                        <span>Spice</span>{ newRecipe.spice.name && <section><strong>{ newRecipe.spice.name } Spice</strong></section>}
                        { newRecipe.spice.name && <ul>{ showSpices }</ul>}
                        <span>Add On:</span><br/>{ newRecipe.extra[0] ? <ul>{ addExtras }</ul> : "none"}

                        <span>Vinegar</span>{ newRecipe.vinegar.name && <section><strong>{ newRecipe.vinegar.name }</strong></section>}
                    </div>
                    <h3>Total: ${(newRecipe.chili.price)/100}.00</h3>
                    <button>Save and Return Home</button><button>Continue with Order</button>
                    {/* :   <Redirect to={'/home'} />  */}
                    </div>
                    </>
                }
                </>

        )
    }
}