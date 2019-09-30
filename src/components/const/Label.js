import React from 'react';

// add div to crop image in center to certain size

const Label = ({label, icon, style, header, handleChange, img}) => {
    return(
        <div className={label}>
            <input className="brand-header" name="header" placeholder={header} type="text" onChange={handleChange}/>
            <div className="center-image">
                <img src={img ? img.url : icon} alt={icon} name="label1"/>
            </div>
            
            <input className="name-sauce" name="style" placeholder={style} type="text" onChange={handleChange}/>
        </div>
    )
}

export default Label