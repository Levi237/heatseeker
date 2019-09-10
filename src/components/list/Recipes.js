import React, { Component } from 'react';
import ScrollMenu           from 'react-horizontal-scrolling-menu';

const MenuItem = ({text, selected}) => {
    return <div
      className={`menu-item ${selected ? 'active' : ''}`}
      >{text}</div>;
  };
export const Menu = (list, selected) =>
  list.map(el => {
    const {name} = el;
 
    return <MenuItem text={name} key={name} selected={selected} />;
  });
const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};
const ArrowLeft  = Arrow({ text: '', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '', className: 'arrow-next' });

export default class RecipeList extends Component {
render(){
    const { recipes, user, remove, showThisRecipe, deleteThis } = this.props

    let listList = []
    if (user && recipes){            
        let list = recipes.map((r, i) => {
            if (r.email && r.email === user.email && r.timestamp  && !r.delete) {
                let dateCreated = r.timestamp.toDate().toDateString()

                return(
                    <div className="user-show-recipe" key={i}>
                    <button className={remove ? "deleteBtn" : "hide-delete deteleBtn"} value={r.id} onClick={deleteThis}>X</button>
                    <form className="linkBtn" >
                        <button  className="linkBtn" type="button" name="recipe" value={r.id} onClick={(e) => {showThisRecipe(e)}}>
                        <div className="recipe-data">
                            <section>{r.style}</section>
                            <section>{dateCreated}</section>
                        </div>
                        </button>
                    </form>
                    </div>
                )
            }
    })
    listList.push(list)
}
    return(
        // <ScrollMenu data={listList} arrowLeft={ArrowLeft} arrowRight={ArrowRight}/>
        <>{listList}</>
    )
}
}

