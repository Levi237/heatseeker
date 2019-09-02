import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom'

import './Sale.css'
import Enter from './Enter';

// CONFIRM & CONTINUE w/ ORDER OR SAVE FOR LATER
// IF USER: NULL THEN PROMPT TO LOG IN WHEN CLICKING SAVE RECIPE BUTTON AND NOT PLACE ORDER BUTTON

export default class Sale extends Component {
    // state = {
    //     login: false,
    // }
    // showModal = () => {
    //     this.setState({
    //       ...this.state,
    //       login: !this.state.login
    //     })
    //   }

    render(){
        // const { login } = this.state
        const { newRecipe, clearNewRecipe, user } = this.props;

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
            {/* <Enter login={login} onClose={this.showModal}></Enter> */}

                <h2>Your Recipe</h2>
                <div className="new-recipe">
                { newRecipe.chili[1] ? 
<progress className="bored-bar" value={(newRecipe.chili[0].heat + newRecipe.chili[1].heat)/2} max="15"></progress>
: 
<progress className="bored-bar" value={(newRecipe.chili[0].heat)} max="15"></progress>           }
                <img src={`../chilis/${newRecipe.chili.src}`} alt={newRecipe.chili.name} />
                    <div className="show-recipe">
                        { newRecipe.chili[1] 
                        ? <><span>Pepper:</span><section><strong>{ newRecipe.chili[0].name } & { newRecipe.chili[1].name }</strong></section></>
                        : <><span>Pepper:</span><section><strong>{ newRecipe.chili[0].name }</strong></section></>
                        }
                        <img className="chalk" src="chalkdarkorange.png" alt="line break"/>
                        <span>Spice:</span>{ newRecipe.spice.name && <section><strong>{ newRecipe.spice.name } Spice</strong></section>}
                        { newRecipe.spice.name && <ul>{ showSpices }</ul>}
                        
                        { newRecipe.extra[0] ? <><img className="chalk" src="chalkdarkorange.png" alt="line break"/><section><span>Add On:</span></section><br /><ul>{ addExtras }</ul></> : ""}
                        <img className="chalk" src="chalkdarkorange.png" alt="line break"/>
                        <span>Vinegar:</span>{ newRecipe.vinegar.name && <section><strong>{ newRecipe.vinegar.name }</strong></section>}
                    </div>
                    <h3>Total: ${(newRecipe.chili[0].price)/100}.00</h3>
                    { user 
                    ? <button onClick={clearNewRecipe}><a href="/my-home"> Save and Return Home</a></button>
                    : <button onClick={this.showModal}> Save to Account</button>
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