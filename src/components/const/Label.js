import React from 'react';

const Label = ({label, icon, style, header, handleChange, img}) => {
    return (
        <div className="pick-label">
            <div className={label}>
                <input className="brand-header" name="header" placeholder={header} type="text" onChange={handleChange}/>
                    <img src={img ? img.url : icon} alt={icon}/>          
                <input className="name-sauce" name="style" placeholder={style} type="text" onChange={handleChange}/>
                <div><small>5 FL.OZ - 147ml</small></div>
            </div>
        </div>
    );
};
export default Label;