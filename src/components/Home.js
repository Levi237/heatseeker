import React, { Component } from 'react';

import Order from './Order'
import Username from './Username';
import Show     from './modal/Show';

import './Home.css'

import firebase from 'firebase/app'
import 'firebase/firestore'

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



        let listList = []
        if (user && recipes){            
            let list = recipes.map((r, i) => {
            if (r.email) {
                if (r.email === user.email && !r.delete) {
                    return(
                        <div key={i} className="user-show-recipe">
                        <form>
                            <button  type="button" name="recipe" value={r.id} onClick={(e) => {showThisRecipe(e)}} >
                                {r.style}
                            </button>
                        </form><br/>
                        <button className={this.state.remove ? "deleteBtn" : "hide-delete deteleBtn"} value={r.id} onClick={this.deleteThis}>Delete</button>
                        </div>
                    )
                }
            }
            })
            listList.push(list)
        }
        
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
                ?   <div>{user.displayName}, Welcome Home!
                        <br /> Here is a list of the recipes you've made so far:<br/>
                        <button onClick={() => {this.showDelete()}}>Delete Recipes</button>
                        <br />{listList}<br />
                    </div>
                :   <> Hello, Welcome to HeatMakerSauce </>
                } 
               </>
            }
            </div>
        )
    }
}