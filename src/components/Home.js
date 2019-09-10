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
        userEdit: false,
        userCreations: true,
        userOrders: false,
    }

    toggleValue = (e) => {
        this.setState({
            [e.currentTarget.name]: !this.state[e.currentTarget.name]
        });
    };


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
        const { userEdit, userCreations, userOrders } = this.state
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
                            <h3><img src="logo.png" className="user-icon"/> {user.displayName}</h3>
                
                            <button name="userCreations" type="button" class={userCreations ? "on" : ""} onClick={this.toggleValue}>Show Creations</button>
                            <button name="userOrders" type="button" class={userOrders ? "on" : ""} onClick={this.toggleValue}>Show Orders</button>
                            <button name="userEdit" type="button" class={userEdit ? "on" : ""} onClick={this.toggleValue}>Edit Account</button>
                            <div className={this.state.userEdit ? "edit-container" : "off edit-container"}>
                                <button onClick={() => {this.showDelete()}}>Delete Recipes</button>
                                <Username />
                            </div>
                        </div>

                        <div className="home-right">
{ (this.state.userCreations) &&

                            <div className="home-show-lists">
                                <h2>CREATIONS</h2>
                                <img className="chalk" src="chalkdarkorange.png" alt="line break"/> 
                                <div className="list-left">
                                    <h3>RECIPES</h3>
                                    <img className="chalk" src="chalkdarkorange.png" alt="line break"/> 
                                    <RecipeList 
                                        user={user} 
                                        recipes={recipes}
                                        remove={this.state.remove}
                                        deleteThis={this.deleteThis}
                                        showThisRecipe={showThisRecipe} />
                                </div>

                                <div className="list-right">
                                    <h3>LABELS</h3>
                                    <img className="chalk" src="chalkdarkorange.png" alt="line break"/> 
                                    <section>HERE IS WHERE USERS WILL BE ABLE TO CREATE LABELS FOR THEIR SAUCES</section>
                                </div>
                                <img className="chalk" src="chalkdarkorange.png" alt="line break"/>
                            </div>
}


                            { (this.state.userOrders) &&

                            <div className="home-show-orders">
                                <h2>ORDERS</h2>  
                                <img className="chalk" src="chalkdarkorange.png" alt="line break"/> 
                                <RecipeList 
                                    user={user} 
                                    recipes={recipes}
                                    remove={this.state.remove}
                                    deleteThis={this.deleteThis}
                                    showThisRecipe={showThisRecipe} />
<img className="chalk" src="chalkdarkorange.png" alt="line break"/>
                            </div>
                            }
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