import React from 'react';

{/* <option name="" value="">Background</option>
<option name="" value="">Top Frame</option>
<option name="" value="">Title Bar</option>
<option name="" value="">Title Text</option>
<option name="" value="">Outer Border</option>
<option name="" value="">Inner Border</option>
<option name="" value="">Name Bar</option>
<option name="" value="">Name Text</option>
<option name="" value="">Bottom Frame</option>
<option name="" value="">Bottom Text</option> */}

const TestToggle = ({user, showModal}) => {
    return (
        <>

        <div className="label-tools-container">
            <section><input type="button" className="text-icon select-text" onClick={(e) => showModal(e)} name="text" value="T" /></section>
            <section>
                <input type="button" className="next-icon search-samples" onClick={(e) => showModal(e)} name="samples" value="Themes" />
            </section>
            <section>
                { user
                ? <input className="next-icon upload-images" onClick={(e) => showModal(e)} name="upload" value="Upload"/>
                : <input type="button" className="next-icon upload-images" name="" placeholder="LogIn to Upload" />
                }
            </section>
            <section><input type="button" className="next-icon" name="" value="?" /></section>
        </div>
        </>
    );
};
export default TestToggle;