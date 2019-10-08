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
        background: null,
    }
    render(){
        const {icon, img, labelMaker} = this.props


        return (
            <>
                <div className="label-maker-canvas">
                <div className="label-maker-container bg-wood label-bg label-body">

                {/* <div className={`${recipe.label} label-bg label-body`}> */}
                    {/* <div className="label-frame frame-wood"></div> */}
                    {/* <div className="label-border border-red"></div> */}
                    {/* <div className="image-border border-green"></div> */}
                    <div name="topBar" className="top-bar bar-green"></div>
                    <div name="bottomBar" className="bottom-bar bar-green"></div>
                    <div name="headerBar" className="header-bar bg-green"></div>
                    <div name="nameBar" className="name-bar bg-green"></div>
                    <div name="outerBorder" className="outer-border border-green"></div>
                    <div name="innerBorder" className="inner-border border-red"></div>

                    <div className="label-content-container">
                        <div className="label-header bar-green">
                            <input className="font-black bg-red" name="header" type="text"/>
                            {/* <input className="font-black" name="header" placeholder={recipe.header} type="text"/> */}
                        </div>
                        <img src={img ? img.url : icon} alt={img ? img.url : icon}/>  
                        {/* <img alt={icon} src={`${icon}`}/>           */}
                        <input className="font-black label-name bg-green" name="style" type="text"/>        
                        {/* <input className="font-black label-name" name="style" placeholder={recipe.style} type="text"/> */}
                        <div className="label-oz font-black">5 FL.OZ - 147ml</div>
                    </div>
                </div>
                <TestToggle />
                </div>
                <div className="color-box-container">
                    <h5>Upper</h5>
                    <div className="color-box selector">
                        <div className="box clear" name="clear"></div>
                        <div className="box tiedye" name="tiedye"></div>
                        <div className="box wood" name="wood"></div>
                        <div className="box white" name="white"></div>
                        <div className="box black" name="black"></div>
                        <div className="box green" name="green"></div>
                        <div className="box yellow" name="yellow"></div>
                        <div className="box orangered" name="orangered"></div>
                        <div className="box red" name="red"></div>
                        <div className="box pink" name="pink"></div>
                        <div className="box dodgerblue" name="dodgerblue"></div>
                        <div className="box navy" name="navy"></div>
                        <div className="box purple" name="purple"></div>
                    </div>
                    <h5>Lower</h5>
                    <div className="color-box selector">
                        <div className="box clear" name="clear"></div>
                        <div className="box tiedye" name="tiedye"></div>
                        <div className="box wood" name="wood"></div>
                        <div className="box white" name="white"></div>
                        <div className="box black" name="black"></div>
                        <div className="box green" name="green"></div>
                        <div className="box yellow" name="yellow"></div>
                        <div className="box orangered" name="orangered"></div>
                        <div className="box red" name="red"></div>
                        <div className="box pink" name="pink"></div>
                        <div className="box dodgerblue" name="dodgerblue"></div>
                        <div className="box navy" name="navy"></div>
                        <div className="box purple" name="purple"></div>
                    </div>
                </div>
            </>
        );
    };
};