import React, { Component } from 'react'
import { Redirect }         from 'react-router-dom';
// import ScrollMenu           from 'react-horizontal-scrolling-menu';

import Labels from './Labels'
// import Simplify from './Simplify'

import * as routes from '../constants/routes';
import firebase             from 'firebase/app'
import 'firebase/firestore'

import './Form.css'
import Simplify from './Simplify';


// const MenuItem = ({text}) => {
//     return <div className="menu-item">{text}</div>;
//   };
// export const Menu = (list) =>
//   list.map(el => {
//     const {name} = el;
 
//     return <MenuItem text={name} key={name} />;
//   });
// const Arrow = ({ text, className }) => {
//   return (
//     <div className={className}>{text}</div>
//   );
// };
// const ArrowLeft  = Arrow({ text: '', className: 'arrow-prev' });
// const ArrowRight = Arrow({ text: '', className: 'arrow-next' });

// NEED PHOTO UPLOAD AND LABEL COMPONENT WITH PREVIEW OF BOTTLE?  SOMETHING WITH PHOTO UPLOAD.

export default class Edit extends Component {
    state = {
        header: null,
        style: null,
        label: null,
        icon: null,
        chili: [],
        spice: {},
        extra: [],
        vinegar: {},
        show: false,
        toggle: false,
        close: false,
    }
    componentDidMount = () => {
        const { recipes, edit } = this.props
        if (edit){
            recipes.map(recipe => {
                if (recipe.id.includes(edit)){
                    this.setState({
                        header: recipe.header,
                        style: recipe.style,
                        label: recipe.label,
                        icon: recipe.icon,
                        chili: recipe.chili,
                        spice: recipe.spice,
                        extra: recipe.extra,
                        vinegar: recipe.vinegar,
                    })
                }
            })
        }
    }

    updateRecipe = async (e, recipe) => {
        e.preventDefault();
        const _id = this.props.edit
        const update = await firebase
            .firestore()
            .collection('recipes')
            .doc(_id)
            .update({
                header: recipe.header,
                style: recipe.style,
                label: recipe.label,
                icon: recipe.icon,
                chili: recipe.chili,
                spice: recipe.spice,
                extra: recipe.extra,
                vinegar: recipe.vinegar,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            this.setState({
                close: true,
            })   
            return update    
    }

    setToggle = (e, value) => {
        this.setState({
            [e.target.name]: value
        })
    }

    setLabel = (e) => {
        this.setState({
            label: e.currentTarget.id,
        })
    }
    extraToggle = (e, value) => {
        const { extra } = this.state;
        e.preventDefault();
        if (extra.includes(value)){
            this.setState(prevState => ({ 
                extra: prevState.extra.filter(x => (
                    x.id !== value.id
                ) )
            }));
         }else{
            this.setState({
                extra: [...extra, value]
            })
        }
    }
    chiliToggle = (e, value) => {
        const { chili } = this.state
        e.preventDefault();;
        if ((chili[0] && chili[0].id === value.id) || (chili[1] && chili[1].id === value.id)){
            this.setState(prevState => ({ 
                chili: prevState.chili.filter(x => (
                    x.id !== value.id
                )) 
            }));
        }else if(chili.length < 2 ){
            this.setState({
                chili: [...chili, value]
            })
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render(){

        const { chili, spice, vinegar, extra, style, label, icon, header, close } = this.state
        const { chilis, spices, extras, vinegars, user, closeEditForm } = this.props

        // let chili1 = ""; if ( chili[0] ){ chili1 = chili[0] }  
        // let chili2 = ""; if ( chili[1] ){ chili2 = chili[1] } 
        // let extra1 = ""; if ( extra[0] ){ extra1 = extra[0] } 
        // let extra2 = ""; if ( extra[1] ){ extra2 = extra[1] } 
        // let extra3 = ""; if ( extra[2] ){ extra3 = extra[2] } 
        // let extra4 = ""; if ( extra[3] ){ extra4 = extra[3] } 
        // let extra5 = ""; if ( extra[4] ){ extra5 = extra[4] } 
        // let extra6 = ""; if ( extra[5] ){ extra6 = extra[5] } 
        // let extra7 = ""; if ( extra[6] ){ extra7 = extra[6] }

        // const chiliList = chilis.map((ch, key) => {
        //     return(
        //         <section className="chiliSection" key={key}>
        //             <button name="chili" value={ch} className={(chili1.id === ch.id || chili2.id === ch.id ? "toggleOn edit-btn" : "edit-btn")} onClick={(e) => {this.chiliToggle(e, ch)}} type="button"></button>
        //             <section><img src={`../chilis/${ch.src}`} alt={ch.name}/><br/>{ch.name}</section>
        //         </section>
        //     )
        // })
        // const spiceList = spices.map((sp, i) => {
        //     const spiceItems= sp.items.map((item, key) => {
        //         return (
        //             <li key={key}>{item}</li>
        //         )
        //     })
        //     return (
        //         <section className="spiceSection" key={i}>
                
        //             <button name="spice" value={sp} className={(spice.id === sp.id ? "toggleOn edit-btn" : "edit-btn")} onClick={(e) => {this.setToggle(e, sp)}} type="button"></button>
        //             <section>{sp.name}<ul>{spiceItems}</ul></section>
        //         </section>
        //     )
        // })
        // const extraList = extras.map((ex, key) => {
        //     return (
        //         <section className="chiliSection" id={`${ex.name}`} key={key}>
        //             <button name="extra" value={ex} className={(extra1.id === ex.id || extra2.id === ex.id || extra3.id === ex.id || extra4.id === ex.id || extra5.id === ex.id || extra6.id === ex.id || extra7.id === ex.id ? "toggleOn edit-btn" : "edit-btn")} onClick={(e) => {this.extraToggle(e, ex)}} type="button"></button>
        //             <section><img src={`../extras/${ex.img}`} alt={`${ex.name}`}/><br/>{ex.name}</section>
        //         </section>
        //     )
        // })
        // const vinegarList = vinegars.map((vi, key) => {
        //     return(
        //         <section className="chiliSection" key={key}>
        //             <button name="vinegar" className={(vinegar.name === vi.name? "toggleOn edit-btn" : "edit-btn")} onClick={(e) => {this.setToggle(e, vi)}} type="button"></button>
        //             <section><img src={`../vinegars/${vi.img}`} alt={`${vi.name}`}/><br/>{vi.name}</section>
        //         </section>
        //     )
        // })
        const addExtra = extra.map((ext, key) => {
            return(
                <li key={key}>{ext.name}</li>
            )
        })
        const addChili = chili.map((chi, key) => {
            return(
                <div key={key}><strong className="addChili">{chi.name}</strong><br /></div>
            )
        })
        return(
            <div className="edit-container">

            <form onSubmit={(e) => { this.updateRecipe(e, this.state)}}>

            {   close &&
                        <Redirect to={routes.HOME}/>
                    }
                <div className="box2">
                    <div className="myProgress">
                    { chili[1] 
                    ? <progress className="bored-bar" value={(chili[0].heat + chili[1].heat)/2} max="15"></progress>
                    : <progress className="bored-bar" value={chili[0] ? (chili[0].heat) : 0} max="15"></progress>   
                    }
                    </div>

                    {/* <div className="chiliSection">
                        <ScrollMenu data={chiliList} arrowLeft={ArrowLeft} arrowRight={ArrowRight}/>
                    </div>
                        <img className="chalk" src="chalkdarkorange.png" alt="line break"/>  
                        <ScrollMenu data={spiceList} arrowLeft={ArrowLeft} arrowRight={ArrowRight}/>
                        <img className="chalk" src="chalkdarkorange.png" alt="line break"/>  
                        <ScrollMenu data={extraList} arrowLeft={ArrowLeft} arrowRight={ArrowRight}/>       
                        <img className="chalk" src="chalkdarkorange.png" alt="line break"/>  
                        <ScrollMenu data={vinegarList} arrowLeft={ArrowLeft} arrowRight={ArrowRight}/> 
                        <img className="chalk" src="chalkdarkorange.png" alt="line break"/>   */}
                        <Simplify 
                            chili={chili} 
                            spice={spice} 
                            vinegar={vinegar }
                            extra={extra} 
                            chilis={chilis}
                             spices={spices} 
                             extras={extras} 
                             vinegars={vinegars} 
                             setToggle={this.setToggle}
                            //  exampleToggle={this.exampleToggle}
                             chiliToggle={this.chiliToggle}
                             extraToggle={this.extraToggle}
                            />
                </div>   

                <div className="box1">
                    <div className="pick-label">
                        <div>
                        { label &&
                            <div className={label}>
                                <input className="brand-header" name="header" placeholder={header} type="text" onChange={this.handleChange}/>
                                <img src={icon} alt={icon} name="label1"/>
                                <input className="name-sauce" name="style" placeholder={style} type="text" onChange={this.handleChange}/>
                            </div>
                        }
                        </div>
                    </div>
                    <div className="pick-mini-labels"><Labels user ={user} setLabel={this.setLabel}/></div>
                    { chili[0] &&
                        <div className="add-chili">{addChili}</div>
                    }   
                    { spice.name &&
                        <div className="add-spice"><strong>{spice.name.charAt(0).toUpperCase() + spice.name.slice(1)} Spice</strong></div>
                    }
                    { (extra.length > 0) && 
                        <>
                        <div className="add-on"><strong>Add On: </strong></div>
                        <ol>{addExtra}</ol><br />
                        </> 
                    }
                    { vinegar.name &&
                        <div className="add-extra"><strong>{vinegar.name.charAt(0).toUpperCase() + vinegar.name.slice(1)} Vinegar</strong></div>
                    }

                    <button className="save-Btn" type="submit">Update</button>
                    <button className="save-Btn" type="submit" onClick={closeEditForm} >Close</button>
                
                </div>      

            </form>
            </div>
        )
    }
}