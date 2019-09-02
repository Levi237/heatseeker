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
        chili: [{
            name: "Serrano",
            heat: 10,
            price: 3500,
            src: "serrano.JPG"
        }],
        spice: {
            name: "Indian",
            items: ["cumin", "curry", "sea salt", "pepper"]
        },
        extra: []
        ,
        vinegar: {
            name: "White Wine",
        },
        show: false,
        toggle: false,
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
    }
    chiliToggle = (e, value) => {
        const { chili } = this.state
        const target = e.currentTarget;
        if (chili.includes(value)){
            this.setState(prevState => ({ chili: prevState.chili.filter(x => x !== value) }));
        }else{
            this.setState({
                chili: [...chili, value]
            })
        }
        if (target.classList.contains('active', 'chiliBtn')){
            target.classList.remove('active');
        }else {
            target.classList.add('active');
        }
    }

    render(){

        const { chili, spice, vinegar, extra, show } = this.state
        const { chilis, spices, extras, vinegars, submitForm, newRecipe, user } = this.props

        const chiliList = chilis.map((c, i) => {
            return(
                <section className="chiliSection" key={i}>
                    <button name="chili" value={c} className="chiliBtn" onClick={(e) => {this.chiliToggle(e, c)}} type="button"></button>
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
                    <button name="spice" value={s} className={(spice.name === s.name ? "toggleOn btn" : "btn")} onClick={(e) => {this.setToggle(e, s)}} type="button"></button>
                    <section>{s.name}<ul>{spiceItems}</ul></section>
                </section>
            )
        })
        const extraList = extras.map((x, i) => {
            return (
                <section className="chiliSection" key={i}>
                    <button name="extra" value={x} className="extraBtn" onClick={(e) => {this.multiToggle(e, x)}} type="button"></button>
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
                <li key={i}>{e}</li>
            )
        })
        const addChili = chili.map((e, i) => {
            return(
                <><strong key={i}>{e.name}</strong><br /></>
            )
        })
        return(
            <div className="form container">

            <form onSubmit={(e) => { submitForm(e, this.state)}}>

            { newRecipe 
                ? <Redirect to={'/complete-sale'} /> 
                : <Modal show={show} onClose={this.showModal}>
                    <h3>Are you sure you want to save?</h3>
                    <br />
                        {addChili} pepper<br/>{spice.name} spice<br/> {addExtra}<br/>{vinegar.name} vinegar
                        <br /><br /><br />
                    <button type="submit">
                            Save For Real
                    </button>
                  </Modal>
                }  

            <div className="box2">
                <div className="myProgress">
                { chili[2] ? 
                    <progress className="bored-bar" value={(chili[1].heat + chili[2].heat)/2} max="15"></progress>
                    : 
                    <progress className="bored-bar" value={chili[1] ? (chili[1].heat) : 0} max="15"></progress>           }
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

            {chili[1] ? <><h2>   Heat Factor: {chili[0].heat + chili[1].heat}</h2></>: <><h2>   Heat Factor: {chili[0].heat}</h2></>}
                
                {/* <h2>Price: ${chili.price/100}.00   </h2> */}
                {user != null && user.providerData[0].displayName ? <strong>Created By: {user.providerData[0].displayName}</strong> : <strong>Your Order:</strong>}<br /><br />
                <div>{addChili}</div><br />
                <strong>{spice.name.charAt(0).toUpperCase() + spice.name.slice(1)} Spice</strong><br />
                <strong>Add On: </strong><br />
                <ol>{addExtra}</ol>
                <strong>{vinegar.name.charAt(0).toUpperCase() + vinegar.name.slice(1)} Vinegar</strong><br />
                <input className="saveBtn" type="button" onClick={this.showModal} value="save"/>
            </div>      

            </form>
            </div>
        )
    }
}