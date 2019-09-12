import React, { Component } from 'react';
import firebase from 'firebase/app'
import Enter from '../Enter'

import './Show.css'

export default class Show extends Component {
    state = {
        login: false,
    }
    showEnter = () => {
        this.setState({
          ...this.state,
          login: !this.state.login
        })
      }

      onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }

      saveForm = async () => {
          const { newRecipe, user } = this.props
        const newFromDB = await firebase.firestore()
          .collection('recipes')
          .add({
            style: newRecipe.style,
            chili: newRecipe.chili,
            spice: newRecipe.spice,
            extra: newRecipe.extra,
            vinegar: newRecipe.vinegar,
            creator: user.displayName,
            email: user.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          return newFromDB
      }

    render(){
        const { show, recipes, newRecipe, user, order, clearNewRecipe, showOrder, closeShow } =  this.props
    
        let recipe = []
        let addExtras = [];
        let showSpices = [];

        if (show || order){
            recipes.forEach(e => {
                if (e.id === show){
                    recipe = e
                }
            })
        } else if (newRecipe){
                recipe = newRecipe
        }
    
        if (recipe && recipe.extra){
            let nre = recipe.extra
                const addExtra = nre.map((data, i) => {
                    return(
                        <li key={i}>{data.name}</li>
                    )
                })
                addExtras.push(addExtra)
            let nrs = recipe.spice.items;
            const showSpice = nrs.map((data, i) => {
                return(
                    <li key={i}>{data}</li>
                )
            })
            showSpices.push(showSpice)
        }

        return(
            <>
            {recipe &&
                <>
                {  (!user && this.state.login) && <Enter newRecipe={newRecipe} onClose={this.showEnter} /> }
                {  user ?  <h2>{user.displayName}'s Recipe</h2> : <h2>Your Recipe</h2> }
                    <br/>
                    { recipe.chili[1]
                        ? <>
                            <img src={`../chilis/${recipe.chili[0].src}`} alt={recipe.chili[0].name} className="chili"/>
                            <h3>{recipe.style}</h3>
                            <img src={`../chilis/${recipe.chili[1].src}`} alt={recipe.chili[1].name} className="chili"/>
                          </>
                        : <>
                            <img src={`../chilis/${recipe.chili[0].src}`} alt={recipe.chili[0].name} className="chili"/>
                            <h3>{recipe.style}</h3>
                            <img src={`../chilis/${recipe.chili[0].src}`} alt={recipe.chili[0].name} className="chili"/>
                          </>
                    }
                    <div className="new-recipe">
                    { recipe.chili[1] 
                    ? <progress className="bored-bar" value={(recipe.chili[0].heat + recipe.chili[1].heat)/2} max="15"></progress>
                    : <progress className="bored-bar" value={(recipe.chili[0].heat)} max="15"></progress> 
                    }
                    
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
                        </div><br/>

                        { (user && !newRecipe) && <>
                            <button onClick={() => {closeShow();}}>Return Home</button>
                            <button onClick={() => {showOrder(); closeShow();}}>Complete Order</button>
                        </> }
                        { (user && newRecipe ) && <>
                            <button onClick={() => {this.saveForm(); clearNewRecipe()}}>Save & Return Home</button>
                            <button onClick={() => {showOrder();}}>Complete Order</button>
                        </> }
                        { (!user && newRecipe ) && <>
                            <button onClick={this.showEnter}>Save to Account</button>
                            <button onClick={() => {showOrder();}}>Complete Order</button>
                        </> }
                        
                    </div>
                </>
            }
            </>
    
        )
    }
}