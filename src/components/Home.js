import React, { Component } from 'react';

import Order from './Order'
import Username from './Username';
import Show     from './modal/Show';

import './Home.css'

import firebase from 'firebase/app'
import 'firebase/firestore'
import RecipeList from './list/Recipes';

export default class Home extends Component {
    state = {
        remove: false,
    }
    showDelete = () => {
        this.setState({
          remove: !this.state.remove,

        })
      }
    deleteThis = (e) => {
        const _id = e.currentTarget.value
        firebase
            .firestore()
            .collection('recipes')
            .doc(_id)
            .update({
                delete: true
            })
    }

    render(){
        const { recipes, user, showThisRecipe, show, order, newRecipe, updateForm, showOrder, closeShow } = this.props
        
        return(
            <div className="userHome">
            {  (this.props.order) && <Order order={order} showOrder={showOrder} /> }
            
            {  show 
            ?  <Show 
                    closeShow={closeShow}
                    showOrder={showOrder}
                    show={show} 
                    recipes={recipes} 
                    newRecipe={newRecipe} 
                    updateForm={updateForm}
                    user={user}/> 
            :  <>
                {   (user && !user.displayName) && <Username /> }

                {   user 
                ?   <div className="home-container">

                        <div className="home-left">
                            {user.displayName}, Welcome Home!
                            <br /><br /><br /><br /><br />
                            <button onClick={() => {this.showDelete()}}>Delete Recipes</button>
                        </div>

                        <div className="home-right">


                            <div className="home-show-lists">
                                <h2>CREATIONS</h2>
                            
                                <div className="list-left">
                                    <h2>RECIPES</h2>
                                    <RecipeList 
                                        user={user} 
                                        recipes={recipes}
                                        remove={this.state.remove}
                                        deleteThis={this.deleteThis}
                                        showThisRecipe={showThisRecipe} />
                                </div>

                                <div className="list-right">
                                    <h2>LABELS</h2>
                                    <section>HERE IS WHERE USERS WILL BE ABLE TO CREATE LABELS FOR THEIR SAUCES</section>
                                </div>
                            </div>
                            {/* <div className="home-show-orders">
                                <h2>ORDERS</h2>  
                                <RecipeList 
                                    user={user} 
                                    recipes={recipes}
                                    remove={this.state.remove}
                                    deleteThis={this.deleteThis}
                                    showThisRecipe={showThisRecipe} />
                            </div> */}

                        </div>

                    </div>
                :   <> Hello, Welcome to HeatMakerSauce </>
                } 
               </>
            }
            </div>
        )
    }
}