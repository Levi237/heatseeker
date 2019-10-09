import React from 'react';

const TestToggle = ({user, showModal}) => {
    return (
        <>
        <div className="label-toggle-container">
            {/* <div><input type="button" className="select-background" name="" /></div> */}
            <div><input type="button" className="select-background" name="" /></div>
            <div><input type="button" className="select-frame" name="" /></div>
            <div><input type="button" className="select-bars" name="" /></div>
            <div><input type="button" className="select-borders" name=""></input><div className="select-outer-border"><div className="select-inner-border"></div></div></div>
            <section><input type="button" className="text-icon select-text" name="" value="T" /></section>
            <section>
                <input type="button" className="next-icon search-samples" onClick={(e) => showModal(e)} name="samples" value="Themes" />
            </section>
            <section>
                {/* <input type="button" className="next-icon upload-images" name="" value="Upload" /> */}
                { user
                ? <input className="next-icon upload-images" onClick={(e) => showModal(e)} name="upload" value="Upload"/>
                : <input type="button" className="next-icon upload-images" name="" value="LogIn to Upload" />
                }
            </section>
            <section><input type="button" className="next-icon" name="" value="?" /></section>
        </div>
        </>
    );
};
export default TestToggle;