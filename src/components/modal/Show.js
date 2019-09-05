import React, { Component } from 'react';

export default class Show extends Component {
    render(){
        const { show, recipes, newRecipe, user, clearNewRecipe } =  this.props
        console.log(newRecipe)
    
        let recipe = []
        if (show){
            recipes.forEach(e => {
                if (e.id === show){
                    recipe = e
                }
            })
        } else if (newRecipe){
                recipe = newRecipe
        }
    
    //         return(
    //             <div>Show, {show}, {recipe.id}</div>
    //         )
    //     }
    // }
        let addExtras = [];
        let showSpices = [];
        if (recipe && recipe.extra){
            let nre = recipe.extra
                const addExtra = nre.map((data, i) => {
                    return(
                        <li key={i}>{data.name}</li>
                    )
                })
                addExtras.push(addExtra)
            let nrs = recipe.spice.items;
            const showSpice = nrs.map((data, i) => {
                return(
                    <li key={i}>{data}</li>
                )
            })
            showSpices.push(showSpice)
        }
    
        return(
            <>
            {recipe &&
            <>
            {/* <Enter login={login} onClose={this.showModal}></Enter> */}
                <h2>Your Recipe</h2><br/>
                { recipe.chili[1]
                        ? <>
                        <img src={`../chilis/${recipe.chili[0].src}`} alt={recipe.chili[0].name} className="chili"/>
                        <h3>{recipe.style}</h3>
                        <img src={`../chilis/${recipe.chili[1].src}`} alt={recipe.chili[1].name} className="chili"/>
                        {/* <br/><span>Pepper:</span><section><strong>{ recipe.chili[0].name } & { recipe.chili[1].name }</strong></section> */}
                        </>
                        : <>
                        <img src={`../chilis/${recipe.chili[0].src}`} alt={recipe.chili[0].name} className="chili"/>
                        <h3>{recipe.style}</h3>
                        <img src={`../chilis/${recipe.chili[0].src}`} alt={recipe.chili[0].name} className="chili"/>
                        {/* <span>Pepper:</span><section><strong>{ recipe.chili[0].name }</strong></section> */}
                        </>
                        }
                
                <div className="new-recipe">
                { recipe.chili[1] 
                ? <progress className="bored-bar" value={(recipe.chili[0].heat + recipe.chili[1].heat)/2} max="15"></progress>
                : <progress className="bored-bar" value={(recipe.chili[0].heat)} max="15"></progress> 
                }
                
                    <div className="show-recipe">
                        { recipe.chili[1]
                        ? <>
                        <span>Pepper:</span><section><strong>{ recipe.chili[0].name } & { recipe.chili[1].name }</strong></section>
                        </>
                        : <>
                        <span>Pepper:</span><section><strong>{ recipe.chili[0].name }</strong></section>
                        </>
                        }
                        <img className="chalk-line" src="chalkdarkorange.png" alt="line break"/>
                        <span>Spice:</span>{ recipe.spice.name && <section><strong>{ recipe.spice.name } Spice</strong></section>}
                        { recipe.spice.name && <ul>{ showSpices }</ul>}
                        { recipe.extra[0] 
                        ? <><img className="chalk-line" src="chalkdarkorange.png" alt="line break"/><section><span>Add On:</span></section><br /><ul>{ addExtras }</ul></> 
                        : ""}
                        <img className="chalk-line" src="chalkdarkorange.png" alt="line break"/>
                        <span>Vinegar:</span>{ recipe.vinegar.name && <section><strong>{ recipe.vinegar.name }</strong></section>}
                    </div><br/>
                    {/* <h3>Total: ${(recipe.chili[0].price)/100}.00</h3> */}
                    { user 
                    ? <button onClick={clearNewRecipe}><a href="/my-home">Return Home</a></button>
                    : <button onClick={this.showModal}> Save to Account</button>
                    }
                    <button><a href="/order">Continue with Order</a></button>
                    {/* <button><a href="/my-home">Back Home</a></button> */}
                    {/* :   <Redirect to={'/home'} />  */}
                    </div>
                    </>
                }
                </>
    
        )
    }
    }
//     render(){
//         const { show, recipes, newRecipe } =  this.props
//         console.log(newRecipe)

//         let recipe = []
//         recipes.forEach(e => {
//             if (e.id === show){
//                 recipe = e
//             } else if (newRecipe){
//                 recipe = newRecipe
//             }
//         })

// //         return(
// //             <div>Show, {show}, {recipe.id}</div>
// //         )
// //     }
// // }
//         let addExtras = [];
//         let showSpices = [];
//         if (recipe){
//             let nre = recipe.extra
//                 const addExtra = nre.map((data, i) => {
//                     return(
//                         <li key={i}>{data.name}</li>
//                     )
//                 })
//                 addExtras.push(addExtra)
//             let nrs = recipe.spice.items;
//             const showSpice = nrs.map((data, i) => {
//                 return(
//                     <li key={i}>{data}</li>
//                 )
//             })
//             showSpices.push(showSpice)
//         }

//         return(
//             <>
//             {recipe &&
//             <>
//             {/* <Enter login={login} onClose={this.showModal}></Enter> */}
//                 <h2>Your Recipe</h2><br/>
//                 { recipe.chili[1]
//                         ? <>
//                         <img src={`../chilis/${recipe.chili[0].src}`} alt={recipe.chili[0].name} className="chili"/>
//                         <h3>{recipe.style}</h3>
//                         <img src={`../chilis/${recipe.chili[1].src}`} alt={recipe.chili[1].name} className="chili"/>
//                         {/* <br/><span>Pepper:</span><section><strong>{ recipe.chili[0].name } & { recipe.chili[1].name }</strong></section> */}
//                         </>
//                         : <>
//                         <img src={`../chilis/${recipe.chili[0].src}`} alt={recipe.chili[0].name} className="chili"/>
//                         <h3>{recipe.style}</h3>
//                         <img src={`../chilis/${recipe.chili[0].src}`} alt={recipe.chili[0].name} className="chili"/>
//                         {/* <span>Pepper:</span><section><strong>{ recipe.chili[0].name }</strong></section> */}
//                         </>
//                         }
                
//                 <div className="new-recipe">
//                 { recipe.chili[1] 
//                 ? <progress className="bored-bar" value={(recipe.chili[0].heat + recipe.chili[1].heat)/2} max="15"></progress>
//                 : <progress className="bored-bar" value={(recipe.chili[0].heat)} max="15"></progress> 
//                 }
                
//                     <div className="show-recipe">
//                         { recipe.chili[1]
//                         ? <>
//                         <span>Pepper:</span><section><strong>{ recipe.chili[0].name } & { recipe.chili[1].name }</strong></section>
//                         </>
//                         : <>
//                         <span>Pepper:</span><section><strong>{ recipe.chili[0].name }</strong></section>
//                         </>
//                         }
//                         <img className="chalk-line" src="chalkdarkorange.png" alt="line break"/>
//                         <span>Spice:</span>{ recipe.spice.name && <section><strong>{ recipe.spice.name } Spice</strong></section>}
//                         { recipe.spice.name && <ul>{ showSpices }</ul>}
//                         { recipe.extra[0] 
//                         ? <><img className="chalk-line" src="chalkdarkorange.png" alt="line break"/><section><span>Add On:</span></section><br /><ul>{ addExtras }</ul></> 
//                         : ""}
//                         <img className="chalk-line" src="chalkdarkorange.png" alt="line break"/>
//                         <span>Vinegar:</span>{ recipe.vinegar.name && <section><strong>{ recipe.vinegar.name }</strong></section>}
//                     </div><br/>
//                     {/* <h3>Total: ${(recipe.chili[0].price)/100}.00</h3> */}
//                     {/* { user 
//                     ? <button onClick={clearrecipe}><a href="/my-home"> Save and Return Home</a></button>
//                     : <button onClick={this.showModal}> Save to Account</button>
//                     } */}
//                     <button><a href="/order">Continue with Order</a></button>
//                     <button><a href="/my-home">Back Home</a></button>
//                     {/* :   <Redirect to={'/home'} />  */}
//                     </div>
//                     </>
//                 }
//                 </>

//         )
//     }
// }