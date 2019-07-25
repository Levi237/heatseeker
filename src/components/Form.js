import React, { Component } from 'react'
import { Link } from 'react-router-dom';

// make buttons that change color when selected and also update form
// onClick toggles true/false
// each "click" is essentially an option to be selected

import Modal from './modal/Modal'

import * as routes from '../constants/routes'

export default class Form extends Component {
    state = {
        chili: {
            name: "ghost",
            heat: 10,
            info: "this is super hot",
            price: 600
        },
        spice: {
            name: "indian",
            heat: 1,
            items: ["indian curry", "cumin"],
            price: 500,
        },
        extra: {
            heat: 0,
            price: 0,
        },
        vinegar: {
            name: "white",
            info: "strong",
            price: 400,
        },
        show: false,
    }
    showModal = () => {
        console.log("click")
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
    render(){
        // const { setToggleApp, submitForm } = this.props
        const {chili, spice, vinegar, extra, show} = this.state
        const { chilis, spices, extras, vinegars, submitForm } = this.props

          

        const chiliList = chilis.map((chili, i) => {
            return(
                <section key={i}>
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
                <section key={i}>
                    <button name="spice" value={spice} className={(this.state.spice.name === spice.name ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e, spice)}} type="button"></button>
                    <section><h3>{spice.name}</h3><ul>{spiceItems}</ul></section>
                </section>
            )
        })
        const extraList = extras.map((extra, i) => {
            return (
                <section key={i}>
                    <button name="extra" className={(this.state.extra.name === extra.name ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.setToggle(e, extra)}} type="button"></button>
                    <section><h3>{extra.name}</h3></section>
                </section>
            )
        })
        const vinegarList = vinegars.map((vinegar, i) => {
            return (
                <section key={i}>
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
                <Modal show={show} onClose={this.showModal}>
                <h2>Are you sure you want to save?</h2>
                <br />
                    {chili.name} pepper + {spice.name} spice + {extra.name ? extra.name : "none"} + {vinegar.name} vinegar
                    <br /><br /><br />
                    {/* <Link to={routes.SALE}> */}
                <button type="submit">
{/* <div>
                            <a href="/complete-sale"> */}
                            Save For Real
                            {/* </a></div> */}
                        </button>
                    {/* </Link> */}
                </Modal>

                <div className="chiliSection">
                    {chiliList}
                </div>
                <div className="spiceSection">
                    {spiceList}
                </div>
                <div className="extraSection">
                    {extraList} 
                </div>
                <div className="vinegarSection">
                    {vinegarList}                  
                </div>
            </form>
            </>
        )
    }
}