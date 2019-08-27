import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import ScrollMenu from 'react-horizontal-scrolling-menu';

// make buttons that change color when selected and also update form
// onClick toggles true/false
// each "click" is essentially an option to be selected

import Modal from './modal/Modal'

// import * as routes from '../constants/routes'

// All items component
// Important! add unique key
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
 
//   const menu = this.menuItems;
const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};
 
 
const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
 
// const selected = 'item1';
 


export default class Form extends Component {
    state = {
        chili: {
            name: "Ghost Pepper",
            heat: 10,
            price: 600
        },
        spice: {
            name: "Indian",
            heat: 1,
            items: ["Indian curry", "cumin"],
            price: 500,
        },
        extra: {
            heat: 0,
            price: 0,
        },
        vinegar: {
            name: "White",
            price: 400,
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
    // toggle = e => {
    //     e.currentTarget.classList.toggle('toggleOn');
    // }
    onSelect = key => {
        this.setState({ selected: key });
      }


    render(){
        // const { setToggleApp, submitForm } = this.props
        const {chili, spice, vinegar, extra, show} = this.state
        const { chilis, spices, extras, vinegars, submitForm, newRecipe } = this.props
        const { selected } = this.state;
        // Create menu from items
        const menu = this.menuItems;


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
                    <section><h3>{spice.name}</h3><ul>{spiceItems}</ul></section>
                </section>
            )
        })
        const extraList = extras.map((extra, i) => {
            return (
                <section className="extraSection" key={i}>
                    <button name="extra" className={(this.state.extra.name === extra.name ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e, extra)}} type="button"></button>
                    <section><h3>{extra.name}</h3></section>
                </section>
            )
        })
        const vinegarList = vinegars.map((vinegar, i) => {
            return (
                <section className="vinegarSection"key={i}>
                    <button name="vinegar" className={(this.state.vinegar.name === vinegar.name? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e, vinegar)}} type="button"></button>
                    <section><h3>{vinegar.name}</h3></section>
                </section>
            )
        })

        return(
            <>
            <h2>Price: ${(chili.price + spice.price + vinegar.price + extra.price)/100}.00   |   Heat Factor: {chili.heat}</h2>
            <div className="myProgress">
                <progress className="bored-bar" value={chili.heat} max="15"></progress>
            </div>

            <form onSubmit={(e) => { submitForm(e, this.state)}}>
                <input className="" type="button" onClick={this.showModal} value="save"/>
                { newRecipe 
                ? <Redirect to={'/complete-sale'} /> 
                : <Modal show={show} onClose={this.showModal}>
                    <h2>Are you sure you want to save?</h2>
                    <br />
                        {chili.name} pepper + {spice.name} spice + {extra.name ? extra.name : "none"} + {vinegar.name} vinegar
                        <br /><br /><br />
                    <button type="submit">
                        {/* <Link to={routes.SALE}> */}
                            {/* <div><a href="/complete-sale"> */}
                            Save For Real
                            {/* </a></div> */}
                        {/* </Link> */}
                    </button>
                  </Modal>
                }
                <div className="chiliSection">
                <ScrollMenu data={chiliList} arrowLeft={ArrowLeft} arrowRight={ArrowRight} selected={selected} onSelect={this.onSelect} />
                    {/* {chiliList} */}
                </div>
                <hr />
                <div className="spiceSection">
                    {spiceList}
                </div>
                <hr />
                <div className="extraSection">
                    {extraList} 
                </div>
                <hr />
                <div className="vinegarSection">
                    {vinegarList}                  
                </div>
            </form>
            </>
        )
    }
}