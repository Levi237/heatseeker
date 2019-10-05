import React from 'react';

const TestLabel = ({recipe}) => {
    return (
        <div className="bg-wood label-bg label-body">
        {/* <div className={`${recipe.label} label-bg label-body`}> */}
            <div className="label-frame frame-green"></div>
            <div className="label-border border-line border-red"></div>
            <div className="image-border border-green"></div>
            <div className="label-content-container">
                <div className="label-header">
                    <input className="font-black" name="header" placeholder={recipe.header} type="text"/>
                </div>
                <img src={recipe.img ? recipe.img.url : recipe.icon} alt={recipe.icon}/>          
                <input className="font-black label-name" name="style" placeholder={recipe.style} type="text"/>
                <div className="label-oz">5 FL.OZ - 147ml</div>
            </div>
        </div>
    );
};
export default TestLabel;