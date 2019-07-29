import React, { Component } from 'react';

export default class Sale extends Component {
    render(){
        const { newRecipe } = this.props
        return(
            <>
            { newRecipe ?
            <ul>
                { newRecipe.chili.name && <li>{ newRecipe.chili.name }</li>}
                { newRecipe.spice.name && <li>{ newRecipe.spice.name }</li>}
                { newRecipe.extra.name && <li>{ newRecipe.extra.name }</li>}
                { newRecipe.vinegar.name && <li>{ newRecipe.vinegar.name }</li>}
            </ul>
            : ""
            }

            <h1>Please pay us now</h1>
            <p>Login | Guest
                <br/>
                placeholder
            </p>
            </>
        )
    }
}