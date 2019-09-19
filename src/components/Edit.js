import React, { Component } from 'react'
import { Redirect }         from 'react-router-dom';
import ScrollMenu           from 'react-horizontal-scrolling-menu';

import Labels from './levi/Labels'

import * as routes from '../constants/routes';
import firebase             from 'firebase/app'
import 'firebase/firestore'
import './Form.css'
// import { tsThisType } from '@babel/types';

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

// NEED PHOTO UPLOAD AND LABEL COMPONENT WITH PREVIEW OF BOTTLE?  SOMETHING WITH PHOTO UPLOAD.  NEED DEFAULT LABEL IMAGE

export default class Edit extends Component {
    state = {
        header: null,
        style: null,
        label: null,
        chili: [],
        spice: {},
        extra: [],
        vinegar: {},
        show: false,
        toggle: false,
        close: false,
    }
    componentDidMount = () => {
        // let editThis = []; 
        const { recipes, edit } = this.props
        if (edit){
            recipes.map(recipe => {
                if (recipe.id.includes(edit)){
                    // editThis.push(recipe);
                    this.setState({
                        header: recipe.header,
                        style: recipe.style,
                        label: recipe.label,
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
        console.log("updateRecipe click")
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
                chili: recipe.chili,
                spice: recipe.spice,
                extra: recipe.extra,
                vinegar: recipe.vinegar,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            
               await this.setState({
                    close: true,
                })
            
    }
    // closeForm(){
    //     this.setState({
    //         close: true,
    //     })
    // }

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

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render(){

        const { chili, spice, vinegar, extra, style, label, header } = this.state
        const { chilis, spices, extras, vinegars, newRecipe, user, closeEditForm } = this.props

        let chili1 = ""; if ( chili[0] ){ chili1 = chili[0] }  
        let chili2 = ""; if ( chili[1] ){ chili2 = chili[1] } 
        let extra1 = ""; if ( extra[0] ){ extra1 = extra[0] } 
        let extra2 = ""; if ( extra[1] ){ extra2 = extra[1] } 
        let extra3 = ""; if ( extra[2] ){ extra3 = extra[2] } 
        let extra4 = ""; if ( extra[3] ){ extra4 = extra[3] } 
        let extra5 = ""; if ( extra[4] ){ extra5 = extra[4] } 
        let extra6 = ""; if ( extra[5] ){ extra6 = extra[5] } 
        let extra7 = ""; if ( extra[6] ){ extra7 = extra[6] }

        const chiliList = chilis.map((c, i) => {
            return(
                <section className="chiliSection" key={i}>
                    <button name="chili" value={c} className={(chili1.id === c.id || chili2.id === c.id ? "toggleOn btn" : "btn")} onClick={(e) => {this.chiliToggle(e, c)}} type="button"></button>
                    <section><img src={`../chilis/${c.src}`} alt={c.name}/><br/>{c.name}</section>
                </section>
            )
        })
        const spiceList = spices.map((s, i) => {
            const spiceItems= s.items.map((item, k) => {
                return (
                    <li key={k}>{item}</li>
                )
            })
            return (
                <section className="spiceSection" key={i}>
                
                    <button name="spice" value={s} className={(spice.id === s.id ? "toggleOn btn" : "btn")} onClick={(e) => {this.setToggle(e, s)}} type="button"></button>
                    <section>{s.name}<ul>{spiceItems}</ul></section>
                </section>
            )
        })
        const extraList = extras.map((x, k) => {
            return (
                <section className="chiliSection" id={`${x.name}`} key={k}>
                    <button name="extra" value={x} className={(extra1.id === x.id || extra2.id === x.id || extra3.id === x.id || extra4.id === x.id || extra5.id === x.id || extra6.id === x.id || extra7.id === x.id ? "toggleOn btn" : "btn")} onClick={(e) => {this.extraToggle(e, x)}} type="button"></button>
                    <section><img src={`../extras/${x.img}`} alt={`${x.name}`}/><br/>{x.name}</section>
                </section>
            )
        })
        const vinegarList = vinegars.map((v, i) => {
            return(
                <section className="chiliSection" key={i}>
                    <button name="vinegar" className={(vinegar.name === v.name? "toggleOn btn" : "btn")} onClick={(e) => {this.setToggle(e, v)}} type="button"></button>
                    <section><img src={`../vinegars/${v.img}`} alt={`${v.name}`}/><br/>{v.name}</section>
                </section>
            )
        })
        const addExtra = extra.map((e, i) => {
            return(
                <li key={i}>{e.name}</li>
            )
        })
        const addChili = chili.map((e, i) => {
            return(
                <div key={i}><strong className="addChili">{e.name}</strong><br /></div>
            )
        })
        return(
            <div className="form container">

            <form onSubmit={(e) => { this.updateRecipe(e, this.state)}}>

            {   this.state.close &&
                        <Redirect to={routes.HOME}/>
                    }
                <div className="box2">
                    <div className="myProgress">
                    { chili[1] ? 
                        <progress className="bored-bar" value={(chili[0].heat + chili[1].heat)/2} max="15"></progress>
                        : 
                        <progress className="bored-bar" value={chili[0] ? (chili[0].heat) : 0} max="15"></progress>           }
                    </div>

                    <div className="chiliSection">
                        <ScrollMenu data={chiliList} arrowLeft={ArrowLeft} arrowRight={ArrowRight}/>
                    </div>
                        <img className="chalk" src="chalkdarkorange.png" alt="line break"/>  
                        <ScrollMenu data={spiceList} arrowLeft={ArrowLeft} arrowRight={ArrowRight}/>
                        <img className="chalk" src="chalkdarkorange.png" alt="line break"/>  
                        <ScrollMenu data={extraList} arrowLeft={ArrowLeft} arrowRight={ArrowRight}/>       
                        <img className="chalk" src="chalkdarkorange.png" alt="line break"/>  
                        <ScrollMenu data={vinegarList} arrowLeft={ArrowLeft} arrowRight={ArrowRight}/> 
                        <img className="chalk" src="chalkdarkorange.png" alt="line break"/>  
                </div>   

                <div className="box1">
                    <div className="pick-label labels ">
                        <div>
                        { label &&
                            <div className={label}>
                                <input className="brand-sauce" name="header" placeholder={header} type="text" onChange={this.handleChange}/>
                                {label === "label1" && <img src="chili-burn.png" alt="chili-burn.png" name="label1"/>}
                                {label === "label2" && <img src="real-chili.jpg" alt="real-chili.jpg" />}
                                {label === "label3" && <img src="chili-outline-bw-line.png" alt="chili-outline-bw-line.png" />}
                                {label === "label4" && <img src="chili-logo.png" alt="chili-logo.png"/>}
                                <input className="name-sauce" name="style" placeholder={style} type="text" onChange={this.handleChange}/>
                            </div>
                        }
                        </div>
                    </div>
                    <div className="pick-labels"><Labels user ={user} setLabel={this.setLabel}/></div>
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

                    {/* <button className="saveBtn" onClick={this.closeForm} type="submit">Update</button> */}
                    <button className="saveBtn" type="submit" onClick={closeEditForm}>Update</button>

                    
                </div>      

            </form>
            </div>
        )
    }
}