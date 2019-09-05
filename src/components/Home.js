// import React, { Component } from 'react';
// // import firebase from "firebase/app"

// import Username from '../components/Username';

// import './Home.css'


// // HOW TO SET TIME STAMP TO SORT ARRAY

// export default class Home extends Component {

//     render(){
//         const { recipes, user } = this.props


//         // let sort = recipes.sort((a, b) => a.chili.length  > b.chili.length)
//         let listList = []
//         if (user && recipes){

            
//         let list = recipes.map((e, i) => {
//             if (e.creator) {
//                 let x = e.creator
//                 let y = e.chili
//                 // let s = e
//                 // console.log(s)
//                 // let t = e.timestamp.seconds

//                 if (x.email === user.email) {
//                     return(
//                         <div key={i}>
//                             {/* {myDate} */}
//                             <img className="recipeList" alt={y[0].name} src={`../chilis/${y[0].src}`} />
//                             <br/>
//                             <span>{e.style}</span>
//                         </div>
//                     )
//                 }
//             }
//             })
//             listList.push(list)
//         }
        
//         return(
//             <div className="userHome">
            
//                 {user ?
//                 <div>{user.displayName}, Welcome Home, you are logged in right now
//                     <br />{listList}<br />
//                     <Username />
//                 </div>
//                 :
//                 <>
//                  Hello, Welcome to HeatMakerSauce
//                 </>
//                 }
//             </div>
//         )
//     }
// }

import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import firebase from "firebase/app"

import Username from '../components/Username';
import Show from './modal/Show';
// import Show from '../components/modal/Show';
import './Home.css'


// HOW TO SET TIME STAMP TO SORT ARRAY

export default class Home extends Component {
// state = {
//     show: null,
// }
// showThisRecipe = (e) => {
//     console.log(e.target)
//     //  this.setState({
//     //      show: e.currentTarget
//     //  })
// }

    render(){
        const { recipes, user, showThisRecipe, show } = this.props


        // let sort = recipes.sort((a, b) => a.chili.length  > b.chili.length)
        let listList = []
        if (user && recipes){

            
        let list = recipes.map((e, i) => {
            if (e.creator) {
                let x = e.creator
                // let y = e.chili
                // let t = e.timestamp.seconds

                if (x.email === user.email) {
                    // console.log(e)
                    return(
                        <form key={i} >
                            <button  type="button" name="recipe"value={e.id} onClick={(e) => {showThisRecipe(e)}} >
                            {/* <a href={`/show/${e.id}`}> */}

                            {/* <Link to={`/show/${e.id}`}>  */}
                            {e.style}
                            {/* </a> */}
                            {/* </Link> */}
                                {/* <img className="recipeList" alt={y.name} src={`../public/chilis/${y[0].src}`} /> */}
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
            {  show 
            ?  <Show show={show} recipes={recipes}/> 
            :  <>
                {   user && !user.displayName 
                    ? <Username /> 
                    : ""}
                {   user 
                    ?   <div>{user.displayName}, Welcome Home, you are logged in right now
                            <br />{listList}<br />
                        </div>
                    :<> Hello, Welcome to HeatMakerSauce </>
                }</>
            }
            </div>
        )
    }
}