import React, { Component } from 'react';
import { Redirect }         from 'react-router-dom';
import ScrollMenu           from 'react-horizontal-scrolling-menu';

import Labels               from './Labels';
import Label                from './const/Label';
// import Ingredients          from './const/Ingredients';
import UploadImage          from './UploadImage';
import Modal                from './modal/Modal';
import UserImages           from './UserImages';
import UploadedLabel          from './UploadedLabel'

import firebase             from 'firebase/app';
import 'firebase/firestore';

import './Form.css';


import * as routes from '../constants/routes';

//Scroll Menu
const Arrow = ({ text, className }) => {
  return (
      <div className={className}>{text}</div>
      );
    };
    const ArrowLeft  = Arrow({ text: '', className: 'arrow-prev' });
    const ArrowRight = Arrow({ text: '', className: 'arrow-next' });
    
    // NEED PHOTO UPLOAD AND LABEL COMPONENT WITH PREVIEW OF BOTTLE?  SOMETHING WITH PHOTO UPLOAD.

    
export default class Form extends Component {
    state = {
        examples: [],
        header: "HEATMAKERS",
        style: "X Hot Sauce X",
        label: "label2",
        icon: "real-chili.jpg",
        chili: [],
        spice: {
            name: "Pick a",
            items: []
        },
        extra: [],
        vinegar: {
            name: "Pick a",
        },
        show: false,
        toggle: false,
        examplesVisibility: false,
        close: false,
        img: null,

    }
    componentDidMount = () => {
        const { recipes, edit, uid } = this.props
        if (edit){
            recipes.forEach(recipe => {
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
                        img: recipe.img,
                    })
                }
            })
        } else {
            this.loadExamples();
        }
        this.setState({
            uid
        })
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
                img: recipe.img,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            this.setState({
                close: true,
            })   
            return update    
    }
    loadExamples(){
        firebase.firestore().collection('examples').onSnapshot(serverUpdate => {
            const examples = serverUpdate.docs.map(_doc => {
                const data = _doc.data();
                data['id'] = _doc.id;
                return data
            });
            this.setState({examples})
        })
    }
    updateImageSelected = img => {
        this.setState({
          img
        })
      }
    exampleToggle = (e, value) => {
        e.preventDefault();
        this.setState({
            chili: value.chili,
            spice: value.spice,
            extra: value.extra,
            vinegar: value.vinegar
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
    setToggle = (e, value) => {
        this.setState({
            [e.target.name]: value
        })
    }
    toggleChange = e => {
        this.setState({
            [e.target.name]: !e.target.value
        })
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    setLabel = (e) => {
        let labelImage = [];
        const data = e.currentTarget.id
        labelImage = data.split(" ")
        this.setState({
            label: labelImage[0],
            icon: labelImage[1]
        })
    }
    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }
    showModal = () => {
        this.setState({
          ...this.state,
          show: !this.state.show
        })
      }
    render(){
        const { chili, spice, vinegar, extra, examples, style, label, icon, header, close, show, examplesVisibility } = this.state
        const { chilis, spices, extras, vinegars, edit, createNewRecipe, newRecipe, user, closeEditForm, uid } = this.props


        let chili1 = ""; if ( chili[0] ){ chili1 = chili[0] }  
        let chili2 = ""; if ( chili[1] ){ chili2 = chili[1] } 
        let extra1 = ""; if ( extra[0] ){ extra1 = extra[0] } 
        let extra2 = ""; if ( extra[1] ){ extra2 = extra[1] } 
        let extra3 = ""; if ( extra[2] ){ extra3 = extra[2] } 
        let extra4 = ""; if ( extra[3] ){ extra4 = extra[3] } 
        let extra5 = ""; if ( extra[4] ){ extra5 = extra[4] } 
        let extra6 = ""; if ( extra[5] ){ extra6 = extra[5] } 
        let extra7 = ""; if ( extra[6] ){ extra7 = extra[6] }

        const chiliList = chilis.map((ch, key) => {
            return(
                <section className="chiliSection" key={key}>
                    <button name="chili" value={ch} className={(chili1.id === ch.id || chili2.id === ch.id ? "toggleOn select-btn" : "select-btn")} onClick={(e) => {this.chiliToggle(e, ch)}} type="button"></button>
                    <section><img src={`../chilis/${ch.src}`} alt={ch.name}/><br/>{ch.name}</section>
                </section>
            )
        })
        const spiceList = spices.map((sp, i) => {
            const spiceItems= sp.items.map((item, key) => {
                return (
                    <li key={key}>{item}</li>
                )
            })
            return (
                <section className="spiceSection" key={i}>
                
                    <button name="spice" value={sp} className={(spice.id === sp.id ? "toggleOn select-btn" : "select-btn")} onClick={(e) => {this.setToggle(e, sp)}} type="button"></button>
                    <section>{sp.name}<ul>{spiceItems}</ul></section>
                </section>
            )
        })
        const extraList = extras.map((ex, key) => {
            return (
                <section className="chiliSection" id={`${ex.name}`} key={key}>
                    <button name="extra" value={ex} className={(extra1.id === ex.id || extra2.id === ex.id || extra3.id === ex.id || extra4.id === ex.id || extra5.id === ex.id || extra6.id === ex.id || extra7.id === ex.id ? "toggleOn select-btn" : "select-btn")} onClick={(e) => {this.extraToggle(e, ex)}} type="button"></button>
                    <section><img src={`../extras/${ex.img}`} alt={`${ex.name}`}/><br/>{ex.name}</section>
                </section>
            )
        })
        const vinegarList = vinegars.map((vi, key) => {
            return(
                <section className="chiliSection" key={key}>
                    <button name="vinegar" className={(vinegar.name === vi.name? "toggleOn select-btn" : "select-btn")} onClick={(e) => {this.setToggle(e, vi)}} type="button"></button>
                    <section><img src={`../vinegars/${vi.img}`} alt={`${vi.name}`}/><br/>{vi.name}</section>
                </section>
            )
        })

        const showExamples = examples.map((ex, i) => {
            return(
                <section className="chiliSection" key={i}>
                <button name={ex} value={ex} className={((chili === ex.chili && spice === ex.spice) ? "active select-btn" : "select-btn")}   onClick={(e) => {this.exampleToggle(e, ex)}} type="button"></button>
                <section><img src={`../chilis/${ex.chili[0].src}`} alt={ex.style}/><br/>{ex.style}</section>
            </section>
            )
        })
        
        return(<>
            <Modal show={show} onClose={this.showModal}>
                <UploadImage uid={uid} updateImageSelected={this.updateImageSelected} />
            </Modal>
            <div className="form-container">
                <button onClick={() => {this.showModal()}}>Show Upload Modal</button>
                <form onSubmit={edit ? (e) => { this.updateRecipe(e, this.state)} : (e) => { createNewRecipe(e, this.state)}}>
                { newRecipe && <Redirect to={'/save-recipe'} /> }  
                { close     && <Redirect to={routes.HOME}/> }
                    <div className="box2">
                    { examplesVisibility 
                    ? <>
                        <button name="examplesVisibility" value={examplesVisibility} onClick={this.toggleChange}>Close</button>
                        <ScrollMenu data={showExamples} arrowLeft={ArrowLeft} arrowRight={ArrowRight}/>
                        </>
                    : <button name="examplesVisibility" value={examplesVisibility} onClick={this.handleChange}>Examples</button>
                    }
                        <div className="myProgress">
                        { chili[1] 
                        ? <progress className="bored-bar" value={(chili[0].heat + chili[1].heat)/2} max="15"></progress>
                        : <progress className="bored-bar" value={chili[0] ? (chili[0].heat) : 0} max="15"></progress>           
                        }
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
                        <div className="pick-label">
                            <div>
                                <Label 
                                    img={this.state.img}
                                    label={label}
                                    icon={icon}
                                    header={header}
                                    style={style}
                                    handleChange={this.handleChange}
                                    />
                            </div>
                        </div>
                        <div className="pick-mini-labels">
                            
                            <UserImages uid={uid} user={user}/>
                            <Labels 
                                user ={user} 
                                setLabel={this.setLabel}
                                >
                                <UploadedLabel />
                            </Labels>
                        </div>
                            {/* <Ingredients chili={chili} spice={spice} vinegar={vinegar }extra={extra} /> */}
                        {edit && 
                            <>
                                <button className="save-btn" type="submit">Update</button>
                                <button className="save-btn" type="submit" onClick={closeEditForm} >Close</button>
                            </>
                        }
                        {!edit && 
                            <>
                                { (chili[0] && style && header) && <button className="save-btn" type="submit">Review</button> }
                                { (!header || !style || !chili[0]) && <input className="save-btn" type="text" value="..."/>}
                            </>
                        }                       
                    </div>      
                </form>
            </div>
        </>)
    }
}