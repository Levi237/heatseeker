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
// import firebase from "firebase/app"

import Username from '../components/Username';

import './Home.css'


// HOW TO SET TIME STAMP TO SORT ARRAY

export default class Home extends Component {

    render(){
        const { recipes, user } = this.props


        // let sort = recipes.sort((a, b) => a.chili.length  > b.chili.length)
        let listList = []
        if (user && recipes){

            
        let list = recipes.map((e, i) => {
            if (e.creator) {



                if (e.creator.id === user.id) {
                    console.log(e.chili)
                    return(
                        <div key={i}>

{e.style}

                        </div>
                    )
                }
            }
            })
            listList.push(list)
        }
        
        return(
            <div className="userHome">
            {user && !user.displayName ? <Username /> : ""}
                {user ?
                <div>{user.displayName}, Welcome Home, you are logged in right now
                    <br />{listList}<br />
                    <Username />
                </div>
                :
                <>
                 Hello, Welcome to HeatMakerSauce
                </>
                }
            </div>
        )
    }
}