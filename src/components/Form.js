import React, { Component } from 'react'
import { Redirect }         from 'react-router-dom';

import ScrollMenu           from 'react-horizontal-scrolling-menu';
import Modal                from './modal/Modal'

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
const ArrowLeftSmall  = Arrow({ text: '', className: 'arrow-prev-small' });
const ArrowRightSmall = Arrow({ text: '', className: 'arrow-next-small' });
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
        const { chilis, spices, extras, vinegars, submitForm, newRecipe } = this.props

        // Create menu from items
        // const menu = this.menuItems;
        // console.log(menu, "menu")


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
                    <button name="spice" value={spice} className={(this.state.spice.name === spice.name ? "toggleOn selectBtn" : "selectBtn")} onClick={(e) => {this.setToggle(e, spice)}} type="button"></button>
                    <section>{spice.name}<ul>{spiceItems}</ul></section>
                </section>
            )
        })
        const extraList = extras.map((extra, i) => {
            return (
                <section className="extraSection" key={i}>
                    <button name="extra" className={(this.state.extra.name === extra.name ? "toggleOn selectBtn" : "selectBtn")} onClick={(e) => {this.setToggle(e, extra)}} type="button"></button>
                    <section>{extra.name}</section>
                </section>
            )
        })
        const vinegarList = vinegars.map((vinegar, i) => {
            return (
                <section className="vinegarSection"key={i}>
                    <button name="vinegar" className={(this.state.vinegar.name === vinegar.name? "toggleOn selectBtn" : "selectBtn")} onClick={(e) => {this.setToggle(e, vinegar)}} type="button"></button>
                    <section>{vinegar.name}</section>
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
                    <ScrollMenu data={extraList} arrowLeft={ArrowLeftSmall} arrowRight={ArrowRightSmall} selected={selected} onSelect={this.onSelect} />

                    <img className="chalk" src="chalkdarkorange.png"/>  <br />
                    <ScrollMenu data={vinegarList} arrowLeft={ArrowLeftSmall} arrowRight={ArrowRightSmall} selected={selected} onSelect={this.onSelect} />
  

            </div>   
            <div className="box1">
                <h2>   Heat Factor: {chili.heat}</h2>
                <h2>Price: ${chili.price/100}.00   </h2>
                <span>{chili.name}</span><br />
                <span>{spice.name} Spice</span><br />
                <span>add: {extra.name ? extra.name : "none"}</span><br />
                <span>{vinegar.name} Vinegar</span><br />
                <input className="saveBtn" type="button" onClick={this.showModal} value="save"/>
            </div>      
            </form>
            </div>
        )
    }
}