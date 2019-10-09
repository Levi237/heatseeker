import React from 'react';

const TestToggle = () => {
    return (
        <>
        <div className="label-toggle-container">
            <div><input type="button" className="select-background" name="" /></div>
            <div><input type="button" className="select-background" name="" /></div>
            <div><input type="button" className="select-outer-bars" name="" /></div>
            <div><input type="button" className="select-inner-bars" name="" /></div>
            <div><input type="button" className="select-borders" name=""></input><div className="select-outer-border"><div className="select-inner-border"></div></div></div>
            <section><input type="button" className="text-icon select-text-color" name="" value="T" /></section>
            <section><input type="button" className="next-icon search-samples" name="" value="Themes" /></section>
            <section><input type="button" className="next-icon upload-images" name="" value="Upload" /></section>
            <section><input type="button" className="next-icon" name="" value="?" /></section>
        </div>
        </>
    );
};
export default TestToggle;