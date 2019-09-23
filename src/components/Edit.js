import React, { Component } from 'react'
import { Redirect }         from 'react-router-dom';

import Labels from './Labels';
import Label from './const/Label';
import Ingredients from './const/Ingredients'
import Select from './Select';


import * as routes from '../constants/routes';
import firebase             from 'firebase/app'
import 'firebase/firestore'

import './Form.css'

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

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    setLabel = (e) => {
        this.setState({
            label: e.currentTarget.id,
        })
    }
    setToggle = (e, value) => {
        this.setState({
            [e.target.name]: value
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

    render(){

        const { chili, spice, vinegar, extra, style, label, icon, header, close } = this.state
        const { chilis, spices, extras, vinegars, user, closeEditForm } = this.props


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
                        <Select 
                            chili={chili} 
                            spice={spice} 
                            vinegar={vinegar }
                            extra={extra} 
                            chilis={chilis}
                            spices={spices} 
                            extras={extras} 
                            vinegars={vinegars} 
                            setToggle={this.setToggle}
                            chiliToggle={this.chiliToggle}
                            extraToggle={this.extraToggle}
                            />
                </div>   

                <div className="box1">
                    <div className="pick-label">
                        <div>
                        { label &&
                        <Label 
                            handleChange={this.handleChange}
                            setToggle={this.setToggle}
                            icon={icon}
                            label={label}
                            header={header}
                            style={style}
                            />
                        }
                        </div>
                    </div>
                    <div className="pick-mini-labels">
                        <Labels user ={user} setLabel={this.setLabel}/>
                    </div>

                    <Ingredients 
                        chili={chili} 
                        spice={spice} 
                        vinegar={vinegar }
                        extra={extra} 
                        />

                    <button className="save-btn" type="submit">Update</button>
                    <button className="save-btn" type="submit" onClick={closeEditForm} >Close</button>
                
                </div>      

            </form>
            </div>
        )
    }
}