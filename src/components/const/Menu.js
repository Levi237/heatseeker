import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({dashOn, toggleValue}) => {
    return(
        <div className="menu-container">
            <Link  to='./create-recipe'>
                <button onClick={toggleValue} type="button" to={'./create-recipe'}>Create Hotsauce</button>
            </Link>
            <button onClick={toggleValue} type="button" className={(dashOn === "userInfo" ? "dash-on" : undefined)} id="userInfo">How To</button>
            <button onClick={toggleValue} type="button" className={(dashOn === "userCreations" ? "dash-on" : undefined)} id="userCreations">Show Creations</button>
            <button onClick={toggleValue} type="button" className={(dashOn === "userOrders" ? "dash-on" : undefined)} id="userOrders">Show Orders</button>
            <button onClick={toggleValue} type="button" className={(dashOn === "userEdit" ? "dash-on" : undefined)} id="userEdit">Edit Account</button>
        </div>        
    )
}
export default Menu