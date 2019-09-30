import React, { Component } from 'react';
import { Redirect }         from 'react-router-dom';

import firebase             from 'firebase/app';

import Enter                from './Enter';
import Label                from './const/Label';

import './Labels.css';

export default class Show extends Component {
    state = {
        login: false,
    };

    showEnter = () => {
        this.setState({
        //   ...this.state,
          login: !this.state.login
        })
    };

    saveForm = async () => {
        const { newRecipe } = this.props
        const newFromDB = await firebase.firestore()
            .collection('recipes')
            .add({
                header: newRecipe.header,
                style: newRecipe.style,
                label: newRecipe.label,
                icon: newRecipe.icon,
                chili: newRecipe.chili,
                spice: newRecipe.spice,
                extra: newRecipe.extra,
                vinegar: newRecipe.vinegar,
                img: newRecipe.img,
                uid: firebase.auth().currentUser.uid,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        return newFromDB
    };

    render(){
        const { login } = this.state;
        const { show, recipes, newRecipe, user, order, clearNewRecipe, showOrder, closeShow, editRecipeID, edit } =  this.props;
    
        let recipe = [];
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
        };

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
            <>
                <div className="show-buttons">
                    { (user && !newRecipe) && <>
                        <button onClick={() => {closeShow();}}>Return Home</button>
                        <button onClick={() => {showOrder(); closeShow();}}>Complete Order</button>
                        <button value={recipe.id} onClick={(e) => {editRecipeID(e)}}>Edit</button>
                        { edit && <Redirect to={'./edit-recipe'}/> }
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
            { recipe &&
                <>
                {  (!user && login) && <Enter newRecipe={newRecipe} onClose={this.showEnter} /> }
                {  user ?  <h2>{recipe.header}</h2> : <h2>Your Recipe</h2> }
                    <div className="show-style-div">
                        <div className="float-left">
                            <img src={`../chilis/${recipe.chili[0].src}`} alt={recipe.chili[0].name} className="chili"/>
                        </div>
                        <div className="show-style">
                            {recipe.style}
                        </div>
                        { recipe.chili[1]
                        ? <div className="float-right">
                            <img src={`../chilis/${recipe.chili[1].src}`} alt={recipe.chili[1].name} className="chili"/>
                            </div>
                        : <div className="float-right">
                            <img src={`../chilis/${recipe.chili[0].src}`} alt={recipe.chili[0].name} className="chili"/>
                            </div>
                        }
                    </div>
                    <div className="new-recipe">

                    { recipe.chili[1] 
                    ? <progress className="bored-bar" value={(recipe.chili[0].heat + recipe.chili[1].heat)/2} max="15"></progress>
                    : <progress className="bored-bar" value={(recipe.chili[0].heat)} max="15"></progress> 
                    }
                    <br /><br/>

                        <div className="show-left">
                        <Label
                            img={recipe.img}
                            label={recipe.label}
                            icon={recipe.icon}
                            header={recipe.header}
                            style={recipe.style}
                            />
                        </div>

                        <div className="show-recipe show-right">
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
                    <br/>
                    </div>
                </>
            }
            </>
    
        );
    };
};