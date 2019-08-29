import React, { Component } from 'react'
import { Redirect }         from 'react-router-dom';

import ScrollMenu           from 'react-horizontal-scrolling-menu';
import Modal                from './modal/Modal'

import firebase from 'firebase/app'

import './Form.css'

// import * as routes from '../constants/routes'

//Scroll Menu
const MenuItem = ({text, selected}) => {
    return <div
      className={`menu-item ${selected ? 'active' : ''}`}
      >{text}</div>;
  };
export const Menu = (list, selected) =>
  list.map(el => {
    const {name} = el;
 
    return <MenuItem text={name} key={name} selected={selected} />;
  });
const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};
const ArrowLeft  = Arrow({ text: '', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '', className: 'arrow-next' });
// const selected = 'item1';
 


export default class Form extends Component {
    state = {
        chili: {
            name: "Ghost Pepper",
            heat: 15,
            price: 6000
        },
        spice: {
            name: "Indian",
        },
        extra: {
        },
        vinegar: {
            name: "white",
        },
        show: false,
        selected: false,
        creator: "Janers",
    }


    setUser = () => {

    if (this.props.currentUser != null) {
    //     // console.log(firebase.User.UserInfo.displayName)
    //     console.log(this.props.currentUser.providerData[0].displayName)
        // currentUser.providerData.forEach((profile) => {
        //   console.log("Sign-in provider: " + profile.providerId);
        //   console.log("  Provider-specific UID: " + profile.uid);
        //   console.log("  Name: " + profile.displayName);
        //   console.log("  Email: " + profile.email);
        //   console.log("  Photo URL: " + profile.photoURL);
        //   if (!this.state.userInfo.name && profile.displayName) {
            this.setState({
                creator: this.props.currentUser.providerData[0].displayName
            })
        //   }
        // });
        
    }    
    }

    showModal = () => {
        this.setState({
          ...this.state,
          show: !this.state.show
        })
      }
      onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }
    setToggle=(e, value) => {
        this.setState({
            [e.target.name]: value
        })
    }

    onSelect = key => {
        this.setState({ selected: key });
      }




    render(){
        // const { setToggleApp, submitForm } = this.props
        const { chili, spice, vinegar, extra, show, selected} = this.state
        const { chilis, spices, extras, vinegars, submitForm, newRecipe, currentUser, user } = this.props
// console.log(user, "user")
// console.log(currentUser, "currentUser")
//         // Create menu from items
//         // const menu = this.menuItems;
//         // console.log(menu, "menu")



        const chiliList = chilis.map((chili, i) => {
            return(
                <section className="chiliSection" key={i}>
                    <button name="chili" value={chili} className={(this.state.chili.name === chili.name ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e, chili)}} type="button"></button>
                    <section><img src={`../${chili.src}`} alt="placeholder"/><br/>{chili.name}</section>
                </section>
            )
        })
        const spiceList = spices.map((spice, i) => {
            const spiceItems= spice.items.map((item, k) => {
                return (
                    <li key={k}>{item}</li>
                )
            })
            return (
                <section className="spiceSection" key={i}>
                    <button name="spice" value={spice} className={(this.state.spice.name === spice.name ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e, spice)}} type="button"></button>
                    <section>{spice.name}<ul>{spiceItems}</ul></section>
                </section>
            )
        })
        const extraList = extras.map((extra, i) => {
            return (
                <section className="chiliSection" key={i}>
                    <button name="extra" className={(this.state.extra.name === extra.name ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e, extra)}} type="button"></button>
                    <section><img src={`../${extra.img}`} alt={`${extra.name}`}/><br/>{extra.name}</section>
                    {/* <section></section> */}
                </section>
            )
        })
        const vinegarList = vinegars.map((vinegar, i) => {
            return (
                <section className="chiliSection" key={i}>
                    <button name="vinegar" className={(this.state.vinegar.name === vinegar.name? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e, vinegar)}} type="button"></button>
                    <section><img src={`../${vinegar.img}`} alt={`${vinegar.name}`}/><br/>{vinegar.name}</section>
                </section>
            )
        })

        return(
            <div className="form container">

            <form onSubmit={(e) => { submitForm(e, this.state)}}>

            { newRecipe 
                ? <Redirect to={'/complete-sale'} /> 
                : <Modal show={show} onClose={this.showModal}>
                    <h2>Are you sure you want to save?</h2>
                    <br />
                        {chili.name} pepper + {spice.name} spice + {extra.name ? extra.name : "none"} + {vinegar.name} vinegar
                        <br /><br /><br />
                    <button type="submit">
                            Save For Real
                    </button>
                  </Modal>
                }  

            <div className="box2">
                <div className="myProgress">
                    <progress className="bored-bar" value={chili.heat} max="15"></progress>
                </div>

                <div className="chiliSection">
                    <ScrollMenu data={chiliList} arrowLeft={ArrowLeft} arrowRight={ArrowRight} selected={selected} onSelect={this.onSelect} />
                </div>
                    <img className="chalk" src="chalkdarkorange.png"/>  <br />
                    <ScrollMenu data={spiceList} arrowLeft={ArrowLeft} arrowRight={ArrowRight} selected={selected} onSelect={this.onSelect} />
                    
                    <img className="chalk" src="chalkdarkorange.png"/>  <br />
                    <ScrollMenu data={extraList} arrowLeft={ArrowLeft} arrowRight={ArrowRight} selected={selected} onSelect={this.onSelect} />

                    <img className="chalk" src="chalkdarkorange.png"/>  <br />
                    <ScrollMenu data={vinegarList} arrowLeft={ArrowLeft} arrowRight={ArrowRight} selected={selected} onSelect={this.onSelect} />
                    <img className="chalk" src="chalkdarkorange.png"/>  <br />
                    

            </div>   
            <div className="box1">
                <h2>   Heat Factor: {chili.heat}</h2>
                <h2>Price: ${chili.price/100}.00   </h2>
                {currentUser != null && currentUser.providerData[0].displayName ? <span><strong>Created By: {currentUser.providerData[0].displayName}</strong></span > : <span><strong>Your Order:</strong></span>}<br />
                <span>{chili.name}</span><br />
                <span>{spice.name.charAt(0).toUpperCase() + spice.name.slice(1)} Spice</span><br />
                <span>add: {extra.name ? extra.name.charAt(0).toUpperCase() + extra.name.slice(1) : "none"}</span><br />
                <span>{vinegar.name.charAt(0).toUpperCase() + vinegar.name.slice(1)} Vinegar</span><br />
                <input className="saveBtn" type="button" onClick={this.showModal} value="save"/>
            </div>      

            </form>
            </div>
        )
    }
}