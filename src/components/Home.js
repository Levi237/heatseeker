import React, { Component } from 'react';
import firebase from "firebase/app"

import Username from '../components/Username';

import './Home.css'

export default class Home extends Component {

    render(){
        const { recipes } = this.props
        let currentUser = firebase.auth().currentUser;
        // let list = []
        let list = recipes.map((e, i) => {
            if (e.creator) {
                let x = e.creator
                console.log(currentUser.email, "currentUser.email", e)
                if (x.email === currentUser.email) {
                    return(
                        <div key={i}>{e.id}</div>
                    )
                }
            }
            })

        
        return(
            <div className="userHome">
                {currentUser && currentUser.displayName}, Welcome Home, you are logged in right now
            <br />{list}<br />
                <Username />
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