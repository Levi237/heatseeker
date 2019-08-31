import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

export default class Sale extends Component {
    render(){
        const { newRecipe } = this.props;

        let addExtras = [];
        if (newRecipe){
            let nr = newRecipe.extra
                const addExtra = nr.map((data, i) => {
                    return(
                        <li key={i}>{data}</li>
                    )
                })
                addExtras.push(addExtra)
        }
        return(
            <>
            {   newRecipe 
            ?   <>
                <h1>Your Order:</h1>
                
                    <section>
                        { newRecipe.chili.name && <><span>{ newRecipe.chili.name }</span><br /></>}
                        { newRecipe.spice.name && <span>{ newRecipe.spice.name }</span>}
                        { newRecipe.extra[0] ? <ol>{ addExtras }</ol> : ""}

                        { newRecipe.vinegar.name && <span>{ newRecipe.vinegar.name } Vinegar</span>}
                    </section>
                    <h3>Total: ${(newRecipe.chili.price)/100}.00</h3>
                </>
            :   <Redirect to={'/home'} /> 
            }
            </>
        )
    }
}