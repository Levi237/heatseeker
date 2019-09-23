import React, { Component } from 'react';
import { Redirect }         from 'react-router-dom';
import ScrollMenu           from 'react-horizontal-scrolling-menu';

import Labels               from './Labels';
import Label                from './const/Label';
import Ingredients          from './const/Ingredients';
import Select               from './Select';

import firebase             from 'firebase/app';
import 'firebase/firestore';

import './Form.css';

//Scroll Menu
// const MenuItem = ({text}) => {
//     return <div className="menu-item">{text}</div>;
//   };
// export const Menu = (list) =>
//   list.map(el => {
//     const {name} = el;
 
//     return <MenuItem text={name} key={name} />;
//   });
const Arrow = ({ text, className }) => {
  return (
    <div className={className}>{text}</div>
  );
};
const ArrowLeft  = Arrow({ text: '', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '', className: 'arrow-next' });

// NEED PHOTO UPLOAD AND LABEL COMPONENT WITH PREVIEW OF BOTTLE?  SOMETHING WITH PHOTO UPLOAD.

export default class Form extends Component {
    state = {
        examples: [],
        header: "HEATMAKERS",
        style: "XX Sauce",
        label: "label2",
        icon: "real-chili.jpg",
        chili: [],
        spice: {
            name: "Pick a",
            items: []
        },
        extra: [],
        vinegar: {
            name: "Pick a",
        },
        show: false,
        toggle: false,
        examplesVisibility: false,

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
        e.preventDefault();
        this.setState({
            chili: value.chili,
            spice: value.spice,
            extra: value.extra,
            vinegar: value.vinegar
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
    setToggle = (e, value) => {
        this.setState({
            [e.target.name]: value
        })
    }
    toggleChange = e => {
        this.setState({
            [e.target.name]: !e.target.value
        })
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    setLabel = (e) => {
        let labelImage = [];
        const data = e.currentTarget.id
        labelImage = data.split(" ")
        this.setState({
            label: labelImage[0],
            icon: labelImage[1]
        })
    }
    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }

    render(){

        const { chili, spice, vinegar, extra, examples, style, label, icon, header, examplesVisibility } = this.state
        const { chilis, spices, extras, vinegars, submitForm, newRecipe, user } = this.props

        const showExamples = examples.map((ex, i) => {
            return(
                <section className="chiliSection" key={i}>
                <button name={ex} value={ex} className={((chili === ex.chili && spice === ex.spice) ? "active select-btn" : "select-btn")}   onClick={(e) => {this.exampleToggle(e, ex)}} type="button"></button>
                <section><img src={`../chilis/${ex.chili[0].src}`} alt={ex.style}/><br/>{ex.style}</section>
            </section>
            )
        })
       
        return(
            <div className="form-container">

            <form onSubmit={(e) => { submitForm(e, this.state)}}>

            { newRecipe &&
                <Redirect to={'/save-recipe'} /> }  

            <div className="box2">
            { examplesVisibility 
            ? <>
                <button name="examplesVisibility" value={examplesVisibility} onClick={this.toggleChange}>Close</button>
                <ScrollMenu data={showExamples} arrowLeft={ArrowLeft} arrowRight={ArrowRight}/>
                </>
            : <button name="examplesVisibility" value={examplesVisibility} onClick={this.handleChange}>Examples</button>
            }
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
                    <Label 
                        label={label}
                        icon={icon}
                        header={header}
                        style={style}
                        handleChange={this.handleChange}
                        />
                  </div>
                </div>
                <div className="pick-mini-labels">
                    <Labels 
                        user ={user} 
                        setLabel={this.setLabel}
                        />
                </div>
                <Ingredients 
                        chili={chili} 
                        spice={spice} 
                        vinegar={vinegar }
                        extra={extra} 
                        />

            { (chili[0] && style && header) && <button className="save-btn" type="submit">Review</button> }
            { (!header || !style || !chili[0]) && <input className="save-btn" type="text" value="..."/>}
                
            </div>      

            </form>
            </div>
        )
    }
}