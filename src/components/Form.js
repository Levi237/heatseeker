import React, { Component } from 'react'
import { Redirect }         from 'react-router-dom';

import ScrollMenu           from 'react-horizontal-scrolling-menu';
import Modal                from './modal/Modal'

import './Form.css'
// import { tsThisType } from '@babel/types';

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


export default class Form extends Component {
    state = {
        chili: {
            name: "Ghost Pepper",
            heat: 15,
            price: 6000,
            img: "ghost_pepper.JPG"
        },
        spice: {
            name: "Indian",
        },
        extra: []
        ,
        vinegar: {
            name: "White Wine",
        },
        show: false,
        toggle: false,
        // selected: false,
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

    setToggle = (e, value) => {
        this.setState({
            [e.target.name]: value
        })
    }
    multiToggle = (e, value) => {
        const target = e.currentTarget;
        if (this.state.extra.includes(value.name)){
            this.setState(prevState => ({ extra: prevState.extra.filter(x => x !== value.name) }));
        }else{
            this.setState({
                extra: [...this.state.extra, value.name]
            })
        }

        if (target.classList.contains('active', 'extraBtn')){
            target.classList.remove('active');
        }else {
            target.classList.add('active');
    }

    // handleAddPlayer = () => {
    //     // create a clone of your array of players; don't modify objects on the state directly

    //   };
    // multiToggle = (e, value) => {
    //     const target = e.currentTarget;
    //     this.setState({
    //         [e.target.name]: this.state.extra + " " + value.name
    //     })
    //     if (target.classList.contains('active', 'extraBtn')){
    //         target.classList.remove('active');
    //     }else {
    //         target.classList.add('active');
    // }
}


    render(){

        const { chili, spice, vinegar, extra, show } = this.state
        const { chilis, spices, extras, vinegars, submitForm, newRecipe, user } = this.props

        const chiliList = chilis.map((chili, i) => {
            return(
                <section className="chiliSection" key={i}>
                    <button name="chili" value={chili} className={(this.state.chili.name === chili.name ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e, chili)}} type="button"></button>
                    <section><img src={`../chilis/${chili.src}`} alt={chili.name}/><br/>{chili.name}</section>
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
                    <button name="extra" className="extraBtn" onClick={(e) => {this.multiToggle(e, extra)}} type="button"></button>
                    <section><img src={`../extras/${extra.img}`} alt={`${extra.name}`}/><br/>{extra.name}</section>
                </section>
            )
        })
        const vinegarList = vinegars.map((vinegar, i) => {
            return(
                <section className="chiliSection" key={i}>
                    <button name="vinegar" className={(this.state.vinegar.name === vinegar.name? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e, vinegar)}} type="button"></button>
                    <section><img src={`../vinegars/${vinegar.img}`} alt={`${vinegar.name}`}/><br/>{vinegar.name}</section>
                </section>
            )
        })
        const addExtra = extra.map((e, i) => {
            return(
                <li key={i}>{e}</li>
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
                        {chili.name} pepper<br/>{spice.name} spice<br/> {addExtra}<br/>{vinegar.name} vinegar
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
                    <ScrollMenu data={chiliList} arrowLeft={ArrowLeft} arrowRight={ArrowRight}/>
                </div>
                    <img className="chalk" src="chalkdarkorange.png" alt="line break"/>  <br />
                    <ScrollMenu data={spiceList} arrowLeft={ArrowLeft} arrowRight={ArrowRight}/>
                    <img className="chalk" src="chalkdarkorange.png" alt="line break"/>  <br />
                    <ScrollMenu data={extraList} arrowLeft={ArrowLeft} arrowRight={ArrowRight}/>       
                    <img className="chalk" src="chalkdarkorange.png" alt="line break"/>  <br />
                    <ScrollMenu data={vinegarList} arrowLeft={ArrowLeft} arrowRight={ArrowRight}/> 
                    <img className="chalk" src="chalkdarkorange.png" alt="line break"/>  <br />
            </div>   

            <div className="box1">
                <h2>   Heat Factor: {chili.heat}</h2>
                <h2>Price: ${chili.price/100}.00   </h2>
                {user != null && user.providerData[0].displayName ? <span><strong>Created By: {user.providerData[0].displayName}</strong></span > : <span><strong>Your Order:</strong></span>}<br /><br />
                <span>{chili.name}</span><br />
                <span>{spice.name.charAt(0).toUpperCase() + spice.name.slice(1)} Spice</span><br />
                <span>Add On: </span><br />
                <ol>{addExtra}</ol>
                <span>{vinegar.name.charAt(0).toUpperCase() + vinegar.name.slice(1)} Vinegar</span><br />
                <input className="saveBtn" type="button" onClick={this.showModal} value="save"/>
            </div>      

            </form>
            </div>
        )
    }
}