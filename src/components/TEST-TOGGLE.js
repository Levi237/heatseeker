import React from 'react';

const TestToggle = () => {
    return (
        <>
        <div className="label-toggle-container">
            <div><input type="button" className="select-background" name="" /></div>
            <div><input type="button" className="select-background" name="" /></div>
            <div><input type="button" className="select-outer-bars" name="" /></div>
            <div><input type="button" className="select-inner-bars" name="" /></div>
            <div><input type="button" className="select-text-color" name="" value="T" /></div>
            <div><input type="button" className="select-borders" name=""></input><div className="select-outer-border"><div className="select-inner-border"></div></div></div>
            <section><input type="button" className="theme" name="" value="Themes" /></section>
            <section><input type="button" className="upload" name="" value="Upload" /></section>
        </div>
        </>
    );
};
export default TestToggle;