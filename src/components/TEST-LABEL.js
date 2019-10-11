import React, { Component } from 'react';

import TestToggle from './TEST-TOGGLE';

export default class TestLabel extends Component {

    state = {
        topBar: null,
        headerBar: null,
        outerBorder: null,
        innerBorder: null, 
        nameBar: null,
        bottomBar: null,
        imgCover: null,
        imgIcon: null,
        icon: null,
        background: "wood",
        topFrame: "green",
        bottomFrame: "green",
        bottomTextColor: "white",
        headerBar: "white",
        headerTextColor: "black",
        nameBar: "white",
        nameTextColor: "black",
        outerBorder: "black",
        innerBorder: "black",
    }
    render(){
        const { background, topFrame, bottomFrame, headerBar, nameBar, outerBorder, innerBorder, nameTextColor, headerTextColor, bottomTextColor } = this.state
        const { icon, img, labelMaker, user, showModal } = this.props


        return (
            <>
                <div className="label-maker-canvas">
                <div className={`label-maker-container bg-${background} label-bg label-body`}>
                    <div name="topFrame" className={`top-bar border-${topFrame}`}></div>
                    <div name="bottomFrame" className={`bottom-bar border-${bottomFrame}`}></div>
                    <div name="nameBar" className={`name-bar bg-${nameBar}`}></div>
                    <div name="outerBorder" className={`outer-border border-${outerBorder}`}></div>
                    <div name="innerBorder" className={`inner-border border-${innerBorder}`}></div>

                    <div className="label-content-container">
                        <div name="headerBar" className={`label-header header-bar bg-${headerBar}`}>
                            <input className={`text-${headerTextColor}`} name="header" type="text"/>
                        </div>
                        <img src={img ? img.url : icon} alt={img ? img.url : icon}/>  
                        <div className={`name-bar bg-${nameBar} label-name`} >
                            <input name="nameBar" className={`name-bar label-name text-${nameTextColor}`} name="style" type="text"/>        
                        </div>
                        <div className={`label-oz text-${bottomTextColor}`}>5 FL.OZ - 147ml</div>
                    </div>
                </div>
                

                <div className="label-key-container">
                    <div className={`select-background bg-${background}`} name="background"></div>
                    <div className={`select-top-frame border-${topFrame}`} name="topFrame"></div>
                    <div className={`select-bottom-frame border-${bottomFrame}`} name="bottomFrame"></div>
                    <div className={`select-header-bar border-${headerBar}`} name="headerBar"></div>
                    <div className={`select-name-bar border-${nameBar}`} name="nameBar"></div>
                    <div>
                        <div className={`select-outer-border border-${outerBorder}`} name="outerBorder">
                            <div className={`select-inner-border border-${innerBorder}`} name="innerBorder"></div>
                        </div>
                    </div>
                </div>

                <TestToggle user={user} showModal={showModal}/>
                </div>
                <div className="color-box-container">
                    <div className="label-navigation">

                        <div>
                            <select>
                                <option name="" value="">Background</option>
                                <option name="" value="">Top Frame</option>
                                <option name="" value="">Header Bar</option>
                                <option name="" value="">Title Text</option>
                                <option name="" value="">Outer Border</option>
                                <option name="" value="">Inner Border</option>
                                <option name="" value="">Name Bar</option>
                                <option name="" value="">Name Text</option>
                                <option name="" value="">Bottom Frame</option>
                                <option name="" value="">Bottom Text</option>
                            </select>
                        </div>
                        <div>
                            <section className="arrow-left"></section>
                            <section className="arrow-right"></section>
                        </div>
                    </div>
                    <div className="color-box selector">
                        <div>
                            <section className="box clear" name="clear"></section>
                            <section className="box tiedye" name="tiedye"></section>
                            <section className="box wood" name="wood"></section>
                            <section className="box white" name="white"></section>
                            <section className="box black" name="black"></section>
                            <section className="box green" name="green"></section>
                            <section className="box yellow" name="yellow"></section>
                            <section className="box orange" name="orange"></section>
                            <section className="box orangered" name="orangered"></section>
                            <section className="box red" name="red"></section>
                            <section className="box pink" name="pink"></section>
                            <section className="box dodgerblue" name="dodgerblue"></section>
                            <section className="box navy" name="navy"></section>
                            <section className="box purple" name="purple"></section>
                        </div>
                    </div>
                </div>
            </>
        );
    };
};