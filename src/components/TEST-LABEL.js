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
        background: "clear",
        topFrame: "clear",
        bottomFrame: "clear",
        headerBar: "green",
        headerColor: "pink",
        nameBar: "clear",
        nameColor: "black",
        outerBorder: "clear",
        innerBorder: "clear",
    }
    render(){
        const { background, topFrame, bottomFrame, headerBar, nameBar, outerBorder, innerBorder, nameColor, headerColor } = this.state
        const { icon, img, labelMaker, user, showModal } = this.props


        return (
            <>
                <div className="label-maker-canvas">
                <div className="label-maker-container bg-wood label-bg label-body">
                    <div name="topFrame" className={`top-bar border-${topFrame}`}></div>
                    {/* <div name="topFrame" className="top-bar border-green"></div> */}
                    <div name="bottomFrame" className={`bottom-bar border-${bottomFrame}`}></div>
                    {/* <div name="headerBar" className={`header-bar bg-${headerBar}`}></div> */}
                    <div name="nameBar" className={`name-bar bg-${nameBar}`}></div>
                    <div name="outerBorder" className={`outer-border border-${outerBorder}`}></div>
                    <div name="innerBorder" className={`inner-border border-${innerBorder}`}></div>

                    <div className="label-content-container">
                        <div name="headerBar" className={`label-header header-bar bg-${headerBar}`}>
                            <input className={`text-${headerColor}`} name="header" type="text"/>
                        </div>
                        <img src={img ? img.url : icon} alt={img ? img.url : icon}/>  
                        <div className={`name-bar bg-${nameBar} label-name}`} >
                            <input name="nameBar" className={`name-bar label-name text-${nameColor}`} name="style" type="text"/>        
                        </div>
                        <div className="label-oz font-black">5 FL.OZ - 147ml</div>
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