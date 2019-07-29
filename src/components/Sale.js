import React, { Component } from 'react';

export default class Sale extends Component {
    render(){
        const { newRecipe } = this.props
        return(
            <>
            { newRecipe ?
            <ul>
                <li>{ newRecipe.chili }</li>
                <li>{ newRecipe.spice }</li>
                <li>{ newRecipe.extra }</li>
                <li>{ newRecipe.vinegar }</li>
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