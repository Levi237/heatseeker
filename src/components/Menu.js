import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({dashOn, toggleValue}) => {

    return(
        <>

                <button onClick={toggleValue} type="button" className={(dashOn === "userInfo" && "dash-on")} id="userInfo">How To</button>
            <Link  to='./create-recipe'>
                <button onClick={toggleValue} type="button" to={'./create-recipe'}>Create Hotsauce</button>
            </Link>
                <button onClick={toggleValue} type="button" className={(dashOn === "userOrders" && "dash-on")} id="userOrders">Show Orders</button>
                <button onClick={toggleValue} type="button" className={(dashOn === "userCreations" && "dash-on")} id="userCreations">Show Creations</button>
                <button onClick={toggleValue} type="button" className={(dashOn === "userEdit" && "dash-on")} id="userEdit">Edit Account</button>
        </>        
    )
}

export default Menu