import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

// CONFIRM & CONTINUE w/ ORDER OR SAVE FOR LATER

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
            {   newRecipe &&
                <>
                <h1>Your Recipe:</h1>
                
                    <section>
                        { newRecipe.chili.name && <><span>{ newRecipe.chili.name }</span><br /></>}
                        { newRecipe.spice.name && <span>{ newRecipe.spice.name }</span>}
                        { newRecipe.extra[0] ? <ol>{ addExtras }</ol> : ""}

                        { newRecipe.vinegar.name && <span>{ newRecipe.vinegar.name } Vinegar</span>}
                    </section>
                    <h3>Total: ${(newRecipe.chili.price)/100}.00</h3>
                    <button>Save and Return Home</button><button>Continue with Order</button>
                    {/* :   <Redirect to={'/home'} />  */}
                    </>
                }
                </>

        )
    }
}