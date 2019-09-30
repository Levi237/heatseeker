import React, { Component } from 'react';

import Order      from './Order'
import Username   from './Username';
import Show       from './Show';
import Recipes from './list/Recipes';
import Menu       from './const/Menu'
import Info       from './const/Info'

import firebase   from 'firebase/app'
import 'firebase/firestore'

import './Home.css'

export default class Home extends Component {
    state = {
        remove: false,
        dashOn: "userCreations",
    }

    toggleValue = (e) => {
        this.setState({
            dashOn: e.target.id
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
        const { remove, dashOn } = this.state
        const { recipes, user, uid, showThisRecipe, show, order, newRecipe, updateForm, showOrder, closeShow, editRecipeID, edit } = this.props
        
        return(
            <div>
            {  (this.props.order) && <Order order={order} showOrder={showOrder} /> }
            
            {  show 
            ?  <Show 
                    closeShow={closeShow}
                    showOrder={showOrder}
                    show={show} 
                    edit={edit}
                    recipes={recipes} 
                    newRecipe={newRecipe} 
                    updateForm={updateForm}
                    editRecipeID={editRecipeID}
                    user={user}
                    /> 
            :  <>
                {   (user && !user.displayName) && <Username /> }
                {   user 
                ?   <div className="home-contiainer">

                        <div className="home-left">
                            <h3><img src="chili-logo.png" alt="chili-logo.png" className="user-icon"/> {user.displayName}</h3>
                            <Menu dashOn={dashOn} toggleValue={this.toggleValue} />
                        </div>

                        <div className="home-right">
                        <br/>
                        {  (dashOn === "userEdit") &&
                                <div className="home-edit">
                                    <button onClick={() => {this.showDelete()}}>Delete Recipes</button>
                                    <Username />
                                </div>
                        }   
                        {   (dashOn === "userInfo") && <Info /> }
                        {   (dashOn === "userOrders") &&
                                <div className="home-show-orders">
                                    <h2>ORDERS</h2>  
                                    <img className="chalk" src="chalkdarkorange.png" alt="line break"/> 
                                    <h4>Orders will display Cards with a history of eCommerce orders.</h4>
                                </div>
                        }
                        {   (dashOn === "userCreations") &&          
                                <Recipes 
                                    uid={uid}
                                    user={user} 
                                    recipes={recipes}
                                    remove={remove}
                                    deleteThis={this.deleteThis}
                                    showThisRecipe={showThisRecipe} 
                                    /> }
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