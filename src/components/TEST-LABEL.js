import React from 'react';

const TestLabel = ({label, icon, style, header, handleChange, img}) => {
    return (
        <div className="pick-label">
            <div className={label}>
                <input className="brand-header" name="header" placeholder={header} type="text" onChange={handleChange}/>
                <img src={img ? img.url : icon} alt={icon}/>          
                <input className="name-sauce" name="style" placeholder={style} type="text" onChange={handleChange}/>
                <div className="ounces">5 FL.OZ - 147ml</div>
            </div>
        </div>
    );
};
export default TestLabel;