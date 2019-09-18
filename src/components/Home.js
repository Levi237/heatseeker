import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Order from './Order'
import Username from './Username';
import Show     from './modal/Show';
import RecipeList from './list/Recipes';
import Labels from './levi/Labels'
import Info from './modal/Info'

import './Home.css'
import './levi/Headers.css'
// import * as routes from './constants/routes'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default class Home extends Component {
    state = {
        remove: false,
        userEdit: false,
        userCreations: true,
        userOrders: false,
        userInfo: false,
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
        const { remove, userEdit, userCreations, userOrders, userInfo } = this.state
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
                            <h3><img src="chili-logo.png" alt="chili-logo.png" className="user-icon"/> {user.displayName}</h3>
                                <button name="userInfo" type="button" className={userInfo ? "on" : ""} onClick={this.toggleValue}>How To</button>
                                <Link  to='./create-sauce'><button type="button" to={'./create-sauce'}>Create Hotsauce</button></Link>
                                <button name="userOrders" type="button" className={userOrders ? "on" : ""} onClick={this.toggleValue}>Show Orders</button>
                                <button name="userCreations" type="button" className={userCreations ? "on" : ""} onClick={this.toggleValue}>Show Creations</button>
                                <button name="userEdit" type="button" className={userEdit ? "on" : ""} onClick={this.toggleValue}>Edit Account</button>
                            <div className={userEdit ? "edit-container" : "off edit-container"}>
                                <button onClick={() => {this.showDelete()}}>Delete Recipes</button>
                                <Username />
                            </div>
                        </div>

                        <div className="home-right">
                        {   (userInfo) &&

                                <Info />

                        }
                        {   (userOrders) &&
                            <div className="home-show-orders">
                                <h2>ORDERS</h2>  
                                <img className="chalk" src="chalkdarkorange.png" alt="line break"/> 
                                <h4>Orders will display combinations of Recipes and Labels with a history of eCommerce orders.</h4>
                            </div>
                        }
                        {   (userCreations) &&
                            <div className="home-show-lists">
                                <h2>CREATIONS</h2>
                                <img className="chalk" src="chalkdarkorange.png" alt="line break"/> 
                                <RecipeList 
                                    user={user} 
                                    recipes={recipes}
                                    remove={remove}
                                    deleteThis={this.deleteThis}
                                    showThisRecipe={showThisRecipe} />                                       
                            </div>
                        }
                        </div>
                    </div>
                :   <Info />
                } 
               </>
            }
            </div>
        )
    }
}