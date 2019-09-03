import React, { Component } from 'react'
import { Redirect }         from 'react-router-dom';

import ScrollMenu           from 'react-horizontal-scrolling-menu';
import Modal                from './modal/Modal'

import firebase from 'firebase/app'
import 'firebase/firestore'

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



// NEED PHOTO UPLOAD AND LABEL COMPONENT WITH PREVIEW OF BOTTLE?  SOMETHING WITH PHOTO UPLOAD.  NEED DEFAULT LABEL IMAGE

// CREATE PRESETTING SAUCES.  {GREEN. RED. CHIPOTLE}

export default class Form extends Component {
    state = {
        examples: [],
        style: "",
        chili: [],
        spice: {
            name: "Indian",
            items: ["cumin", "curry", "sea salt", "pepper"]
        },
        extra: [],
        vinegar: {
            name: "White Wine",
        },
        show: false,
        toggle: false,
    }
    componentDidMount = () => {
        this.loadExamples();
    }
    loadExamples(){
        firebase.firestore().collection('examples').onSnapshot(serverUpdate => {
            const examples = serverUpdate.docs.map(_doc => {
                const data = _doc.data();
                data['id'] = _doc.id;
                return data
            });
            this.setState({
                examples: examples
            })
        })
    }
    exampleToggle = (e, value) => {
        const target = e.currentTarget
        this.setState({
            style: value.style,
            chili: value.chili,
            spice: value.spice,
            extra: value.extra,
            vinegar: value.vinegar
        }) 
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
    extraToggle = (e, value) => {
        const { extra } = this.state
        const target = e.currentTarget;
        if (extra.includes(value)){
            this.setState(prevState => ({ 
                extra: prevState.extra.filter(x => (
                    x !== value
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
        const target = e.currentTarget;
        if (chili.includes(value)){
            this.setState(prevState => ({ 
                chili: prevState.chili.filter(x => (
                    x.id !== value.id
                )) 
            }));
        // }else if(chili.length < 2){
        }else if(chili.length < 2 || chili[0].name === value.name || chili[1].name === value.name){
            this.setState({
                chili: [...chili, value]
            })
        }
    }

    render(){

        const { chili, spice, vinegar, extra, show, examples, style } = this.state
        const { chilis, spices, extras, vinegars, submitForm, newRecipe, user } = this.props

        for (let i = 0; i < extra.length; i++){

        }
        let chili1 = "";
        if (chili[0]){
            chili1 = chili[0]
        } 
        let chili2 = "";
        if ( chili[1]){
            chili2 = chili[1]
        }
        let extra1 = "";
        if ( extra[0]){
            extra1 = extra[0]
        }
        let extra2 = "";
        if ( extra[1]){
            extra2 = extra[1]
        }
        let extra3 = "";
        if ( extra[2]){
            extra3 = extra[2]
        }
        let extra4 = "";
        if ( extra[3]){
            extra4 = extra[3]
        }
        let extra5 = "";
        if ( extra[4]){
            extra5 = extra[4]
        }
        let extra6 = "";
        if ( extra[5]){
            extra6 = extra[5]
        }
        let extra7 = "";
        if ( extra[6]){
            extra7 = extra[6]
        }



        const showExamples = examples.map((ex, i) => {
            return(
                <section className="chiliSection" key={i}>
                <button name={ex} value={ex} className={(style === ex.style  ? "active chiliBtn" : "chiliBtn")}   onClick={(e) => {this.exampleToggle(e, ex)}} type="button"></button>
                <section><img src={`../chilis/${ex.chili[0].src}`} alt={ex.style}/><br/>{ex.style}</section>
            </section>
            )
        })
        const chiliList = chilis.map((c, i) => {
            return(
                <section className="chiliSection" key={i}>
                    <button name="chili" value={c} className={(chili1.name === c.name || chili2.name === c.name ? "toggleOn chiliBtn" : "chiliBtn")} onClick={(e) => {this.chiliToggle(e, c)}} type="button"></button>
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
        const extraList = extras.map((x, k) => {
                return (
                    <section className="chiliSection" id={`${x.name}`} key={k}>
                    <button name="extra" value={x} className={(extra1.name === x.name || extra2.name === x.name || extra3.name === x.name || extra4.name === x.name || extra5.name === x.name || extra6.name === x.name || extra7.name === x.name ? "toggleOn extraBtn" : "extraBtn")} onClick={(e) => {this.extraToggle(e, x)}} type="button"></button>
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
                <ScrollMenu data={showExamples} arrowLeft={ArrowLeft} arrowRight={ArrowRight}/>
                <div className="myProgress">
                { chili[1] ? 
                    <progress className="bored-bar" value={(chili[0].heat + chili[1].heat)/2} max="15"></progress>
                    : 
                    <progress className="bored-bar" value={chili[0] ? (chili[0].heat) : 0} max="15"></progress>           }
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

            {/* {chili[0].heat ? <><h2>   Heat Factor: {chili[0].heat + chili[0].heat}</h2></>: <><h2>   Heat Factor: {chili[0].heat}</h2></>} */}
                
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