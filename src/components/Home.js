import React, { Component } from 'react';

import Order from './Order'
import Username from '../components/Username';
import Show     from './modal/Show';

import './Home.css'


export default class Home extends Component {

    render(){
        const { recipes, user, showThisRecipe, show, order, newRecipe, updateForm, showOrder, closeShow } = this.props

        let listList = []
        if (user && recipes){            
            let list = recipes.map((e, i) => {
            if (e.email) {
                if (e.email === user.email) {
                    return(
                        <form key={i} >
                            <button  type="button" name="recipe"value={e.id} onClick={(e) => {showThisRecipe(e)}} >
                                {e.style}
                            </button>
                        </form>
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
                {   user && !user.displayName 
                    ? <Username /> 
                    : ""}
                {   user 
                    ?   <div>{user.displayName}, Welcome Home!
                    <br /> Here is a list of the recipes you've made so far:
                            <br />{listList}<br />
                        </div>
                    :<> Hello, Welcome to HeatMakerSauce </>
                }</>
            }
            </div>
        )
    }
}