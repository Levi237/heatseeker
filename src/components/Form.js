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
        style: "HeatMaker Hot Sauce",
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
        if (this.props.newRecipe) {
            this.goBack();
        }
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
    goBack = () => {
        const { newRecipe } = this.props
        this.setState({
            style: newRecipe.style,
            chili: newRecipe.chili,
            spice: newRecipe.spice,
            extra: newRecipe.extra,
            vinegar: newRecipe.vinegar
        }) 
    }
    exampleToggle = (e, value) => {
        const target = e.currentTarget
        this.setState({
            // style: value.style,
            chili: value.chili,
            spice: value.spice,
            extra: value.extra,
            vinegar: value.vinegar
        }) 
    }

    // showModal = () => {
    //     this.setState({
    //       ...this.state,
    //       show: !this.state.show
    //     })
    //   }
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
        const target = e.currentTarget;
        if (chili.includes(value)){
            this.setState(prevState => ({ 
                chili: prevState.chili.filter(x => (
                    x.id !== value.id
                )) 
            }));
        // }else if(chili.length < 2){
        }else if(chili.length < 2 || chili[0].id === value.id || chili[1].id === value.id){
            this.setState({
                chili: [...chili, value]
            })
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };



    render(){

        const { chili, spice, vinegar, extra, show, examples, style } = this.state
        const { chilis, spices, extras, vinegars, submitForm, newRecipe, user } = this.props

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
                <button name={ex} value={ex} className={(style === ex.style  ? "active btn" : "btn")}   onClick={(e) => {this.exampleToggle(e, ex)}} type="button"></button>
                <section><img src={`../chilis/${ex.chili[0].src}`} alt={ex.style}/><br/>{ex.style}</section>
            </section>
            )
        })
        const chiliList = chilis.map((c, i) => {
            return(
                <section className="chiliSection" key={i}>
                    <button name="chili" value={c} className={(chili1.id === c.id || chili2.id === c.id ? "toggleOn btn" : "btn")} onClick={(e) => {this.chiliToggle(e, c)}} type="button"></button>
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
                
                    <button name="spice" value={s} className={(spice.id === s.id ? "toggleOn btn" : "btn")} onClick={(e) => {this.setToggle(e, s)}} type="button"></button>
                    <section>{s.name}<ul>{spiceItems}</ul></section>
                </section>
            )
        })
        const extraList = extras.map((x, k) => {
                return (
                    <section className="chiliSection" id={`${x.name}`} key={k}>
                        <button name="extra" value={x} className={(extra1.id === x.id || extra2.id === x.id || extra3.id === x.id || extra4.id === x.id || extra5.id === x.id || extra6.id === x.id || extra7.id === x.id ? "toggleOn btn" : "btn")} onClick={(e) => {this.extraToggle(e, x)}} type="button"></button>
                        {/* <button name="extra" value={x} className={(x == extra ? "toggleOn btn" : "btn")} onClick={(e) => {this.extraToggle(e, x)}} type="button"></button> */}
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
                <div key={i}><strong>{e.name}</strong><br /></div>
            )
        })
        return(
            <div className="form container">

            <form onSubmit={(e) => { submitForm(e, this.state)}}>

            { newRecipe &&
                <Redirect to={'/save-recipe'} /> }  

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
                    <img className="chalk" src="chalkdarkorange.png" alt="line break"/>  
                    <ScrollMenu data={spiceList} arrowLeft={ArrowLeft} arrowRight={ArrowRight}/>
                    <img className="chalk" src="chalkdarkorange.png" alt="line break"/>  
                    <ScrollMenu data={extraList} arrowLeft={ArrowLeft} arrowRight={ArrowRight}/>       
                    <img className="chalk" src="chalkdarkorange.png" alt="line break"/>  
                    <ScrollMenu data={vinegarList} arrowLeft={ArrowLeft} arrowRight={ArrowRight}/> 
                    <img className="chalk" src="chalkdarkorange.png" alt="line break"/>  
            </div>   

            <div className="box1">
            <h3>Name your Sauce!</h3><br/>
                    <input className="name-sauce" name="style" value={style} type="tex" onChange={this.handleChange}/><br/>
            {/* {chili[0].heat ? <><h2>   Heat Factor: {chili[0].heat + chili[0].heat}</h2></>: <><h2>   Heat Factor: {chili[0].heat}</h2></>} */}
                
                {/* <h2>Price: ${chili.price/100}.00   </h2> */}
                {user !== null && user.displayName ? <strong>Created By: {user.displayName}</strong> : <strong>Your Order:</strong>}<br /><br />
                <div>{addChili}</div><br />
                <strong>{spice.name.charAt(0).toUpperCase() + spice.name.slice(1)} Spice</strong><br />
                <strong>Add On: </strong><br />
                <ol>{addExtra}</ol>
                <strong>{vinegar.name.charAt(0).toUpperCase() + vinegar.name.slice(1)} Vinegar</strong><br />

                { chili[0]
                ? <button className="saveBtn" type="submit">Review</button>
                : <input className="saveBtn" type="text" value="add chili"/>
                }
            </div>      

            </form>
            </div>
        )
    }
}