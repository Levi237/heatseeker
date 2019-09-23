import React, { Component } from 'react';
import ScrollMenu           from 'react-horizontal-scrolling-menu';

import './Form.css'

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

export default class Select extends Component {
    render() {

        const { chilis, spices, extras, vinegars, chili, spice, vinegar, extra, setToggle, extraToggle, chiliToggle} = this.props

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
                    <button name="chili" value={ch} className={(chili1.id === ch.id || chili2.id === ch.id ? "toggleOn select-btn" : "select-btn")} onClick={(e) => {chiliToggle(e, ch)}} type="button"></button>
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
                
                    <button name="spice" value={sp} className={(spice.id === sp.id ? "toggleOn select-btn" : "select-btn")} onClick={(e) => {setToggle(e, sp)}} type="button"></button>
                    <section>{sp.name}<ul>{spiceItems}</ul></section>
                </section>
            )
        })
        const extraList = extras.map((ex, key) => {
            return (
                <section className="chiliSection" id={`${ex.name}`} key={key}>
                    <button name="extra" value={ex} className={(extra1.id === ex.id || extra2.id === ex.id || extra3.id === ex.id || extra4.id === ex.id || extra5.id === ex.id || extra6.id === ex.id || extra7.id === ex.id ? "toggleOn select-btn" : "select-btn")} onClick={(e) => {extraToggle(e, ex)}} type="button"></button>
                    <section><img src={`../extras/${ex.img}`} alt={`${ex.name}`}/><br/>{ex.name}</section>
                </section>
            )
        })
        const vinegarList = vinegars.map((vi, key) => {
            return(
                <section className="chiliSection" key={key}>
                    <button name="vinegar" className={(vinegar.name === vi.name? "toggleOn select-btn" : "select-btn")} onClick={(e) => {setToggle(e, vi)}} type="button"></button>
                    <section><img src={`../vinegars/${vi.img}`} alt={`${vi.name}`}/><br/>{vi.name}</section>
                </section>
            )
        })

        return (
            <>
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
            </>
        )
    }
}