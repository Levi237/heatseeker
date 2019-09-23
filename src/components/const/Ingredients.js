import React from 'react';

const Ingredients = ({chili, spice, extra, vinegar}) => {
    const addExtra = extra.map((ext, key) => {
        return(
            <li key={key}>{ext.name}</li>
        )
    })
    const addChili = chili.map((chi, key) => {
        return(
            <div key={key}><strong className="addChili">{chi.name}</strong><br /></div>
        )
    })
    return(
        <>
        { chili[0]
            ? <div className="add-chili">{addChili}</div>
            : <div className="add-chili"><strong>Pick a couple Peppers</strong></div>
            } 
        { spice.name &&
            <div className="add-spice"><strong>{spice.name.charAt(0).toUpperCase() + spice.name.slice(1)} Spice</strong></div>
        }
        { (extra.length > 0) && 
            <>
            <div className="add-on"><strong>Add On: </strong></div>
            <ol>{addExtra}</ol><br />
            </> 
        }
        { vinegar.name &&
            <div className="add-extra"><strong>{vinegar.name.charAt(0).toUpperCase() + vinegar.name.slice(1)} Vinegar</strong></div>
        }
        </>
    )
}
export default Ingredients