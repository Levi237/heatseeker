import React from 'react';

const TestToggle = () => {
    return (
        <div className="label-toggle-container">
            <div><input type="button" className="select-outer-bars" name="" /></div>
            <div><input type="button" className="select-inner-bars" name="" /></div>
            <div><input type="button" className="select-borders" name=""></input><div className="select-outer-border"><div className="select-inner-border"></div></div></div>
            <div><input value="T" type="button" className="select-text-color" name="" /></div>
            <div><input value="Border Line" type="button" className="select" name="" /></div>
            <div><input value="Name Bar" type="button" className="select" name="" /></div>
        </div>
    );
};
export default TestToggle;