import React, { Component } from 'react';
import firebase from "firebase/app"

import Username from '../components/Username';

import './Home.css'

export default class Home extends Component {

    render(){
        const { recipes } = this.props
        let currentUser = firebase.auth().currentUser;
        let listList = []
        if (currentUser && recipes){


        let list = recipes.map((e, i) => {
            if (e.creator) {
                let x = e.creator
                let y = e.chili
                let t = e.timestamp.nanoseconds
console.log(t)
                let myDate = Date(t);
                // console.log(currentUser.email, "currentUser.email", recipes)
                if (x.email === currentUser.email) {
                    return(
                        <div key={i}>
                            {myDate}
                            <img src={`../chilis/${y.src}`} />
                        </div>
                    )
                }
            }
            })
            listList.push(list)
        }
        
        return(
            <div className="userHome">
                {currentUser && currentUser.displayName}, Welcome Home, you are logged in right now
            <br />{listList}<br />
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