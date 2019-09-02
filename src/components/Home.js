import React, { Component } from 'react';
import firebase from "firebase/app"

import Username from '../components/Username';

import './Home.css'

export default class Home extends Component {

    render(){
        const { recipes, user } = this.props


        // let sort = recipes.sort((a, b) => a.chili.length  > b.chili.length)
        let listList = []
        if (user && recipes){

            
        let list = recipes.map((e, i) => {
            if (e.creator) {
                let x = e.creator
                let y = e.chili
                // let t = e.timestamp.seconds

                if (x.email === user.email) {
                    return(
                        <div key={i}>
                            {/* {myDate} */}
                            <img className="recipeList" alt={y.name} src={`../chilis/${y.src}`} />
                        </div>
                    )
                }
            }
            })
            listList.push(list)
        }
        
        return(
            <div className="userHome">
                {user && 
                <div>{user.displayName}, Welcome Home, you are logged in right now
                    <br />{listList}<br />
                    <Username />
                </div>
                }
            </div>
        )
    }
}

// import React, { Component } from 'react';
// import firebase from "firebase/app"

// import Username from '../components/Username';

// import './Home.css'

// export default class Home extends Component {

//     render(){
//         const { recipes } = this.props
//         let currentUser = firebase.auth().currentUser;
//         let recipeList = recipes.map((e, i) => {
//             return(
//                 <div key={i}>{e.chili.name}</div>
//             )
//         }

//         }
//         return(
//             <div className="userHome">
//                 {currentUser && currentUser.displayName}, Welcome Home, you are logged in right now<br />
//                 { recipeList }
//             <br /><br />
//                 <Username />
//             </div>
//         )
//     }
// }