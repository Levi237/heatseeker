import React, { Component } from 'react';
import ScrollMenu           from 'react-horizontal-scrolling-menu';

import '../Form.css'
//Scroll Menu
const MenuItem = ({text}) => {
    return <div className="menu-item">{text}</div>;
  };
export const Menu = (list) =>
  list.map(el => {
    const {name} = el;
 
    return <MenuItem text={name} key={name} />;
  });
const Arrow = ({ text, className }) => {
  return (
    <div className={className}>{text}</div>
  );
};
const ArrowLeft  = Arrow({ text: '', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '', className: 'arrow-next' });

export default class RecipeList extends Component {
    // state = {}

render(){
    const { recipes, user, remove, showThisRecipe, deleteThis } = this.props
       
    const list = recipes.map((r, i) => {
        if (r.email && r.email === user.email && r.timestamp  && !r.delete){
            let dateCreated = r.timestamp.toDate().toDateString()

            return(
                <div className="user-show-recipe" key={i}>
                    <button className={remove ? "deleteBtn" : "hide-delete deteleBtn"} value={r.id} onClick={deleteThis}>X</button>
                    <form className="linkBtn" >
                        <button  className="linkBtn" type="button" name="recipe" value={r.id} onClick={(e) => {showThisRecipe(e)}}>
                        <div key={i} className="recipe-data">
                            <section>{r.style}</section>
                            <section>{dateCreated}</section>
                        </div>
                        </button>
                    </form>
                </div>
            )
        }
    })

    return(
        <>
        {/* <ScrollMenu data={list} arrowLeft={ArrowLeft} arrowRight={ArrowRight}/> */}
        {list}
        </>
    )
}
}

