import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

export default class Sale extends Component {
    render(){
        const { newRecipe } = this.props
        return(
            <>
            {   newRecipe 
            ?   <>
                <h1>Your Order:</h1>
                
                    <ul>
                        { newRecipe.chili.name && <li>{ newRecipe.chili.name }</li>}
                        { newRecipe.spice.name && <li>{ newRecipe.spice.name }</li>}
                        { newRecipe.extra.name ? <li>{ newRecipe.extra.name }</li> : ""}
                        { newRecipe.vinegar.name && <li>{ newRecipe.vinegar.name }</li>}
                    </ul>
                    <h3>Total: ${(newRecipe.chili.price + newRecipe.spice.price + newRecipe.extra.price + newRecipe.vinegar.price)/100}.00</h3>
                </>
            :   <Redirect to={'/home'} /> 
            }
            </>
        )
    }
}