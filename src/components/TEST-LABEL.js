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
        headerBar: "clear",
        nameBar: "clear",
        outerBorder: "clear",
        innerBorder: "clear",
    }
    render(){
        const { icon, img, labelMaker, user, showModal } = this.props


        return (
            <>
                <div className="label-maker-canvas">
                <div className="label-maker-container bg-wood label-bg label-body">
                    <div name="topFrame" className="top-bar bar-green"></div>
                    <div name="bottomFrame" className="bottom-bar bar-green"></div>
                    <div name="headerBar" className="header-bar bg-orangered"></div>
                    <div name="nameBar" className="name-bar bg-white"></div>
                    <div name="outerBorder" className="outer-border border-black"></div>
                    <div name="innerBorder" className="inner-border border-red"></div>

                    <div className="label-content-container">
                        <div className="label-header bar-green">
                            <input className="font-black bg-red" name="header" type="text"/>
                        </div>
                        <img src={img ? img.url : icon} alt={img ? img.url : icon}/>  
                        <input className="font-black label-name bg-yellow" name="style" type="text"/>        
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