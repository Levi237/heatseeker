import React from 'react';

const Label = ({label, icon, style, header, handleChange}) => {
    return(
        <>
        {/* <div className={label}>
        <input className="brand-header" name="header" placeholder="BRAND IT" type="text" onChange={this.handleChange}/>
        <img src={icon} alt="chili-burn.png" name="label1"/>
        <input className="name-sauce" name="style" placeholder="Name Your Sauce" type="text" onChange={this.handleChange}/>
        </div> */}

        <div className={label}>
        <input className="brand-header" name="header" placeholder={header} type="text" onChange={handleChange}/>
        <img src={icon} alt={icon} name="label1"/>
        <input className="name-sauce" name="style" placeholder={style} type="text" onChange={handleChange}/>
        </div>

        </>
    )
}

export default Label