import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({dashOn, toggleValue}) => {
    // const {  } = this.props
    if (dashOn) {

    }
    return(
<>

                                <button className="active-menu" id="userInfo" type="button" onClick={toggleValue}>How To</button>
                                <Link  to='./create-recipe'>
                                    <button className="active-menu" type="button" to={'./create-recipe'}>Create Hotsauce</button>
                                </Link>
                                <button className="active-menu" id="userOrders" type="button" onClick={toggleValue}>Show Orders</button>
                                <button className="active-menu" id="userCreations" type="button" onClick={toggleValue}>Show Creations</button>
                                <button className="active-menu" id="userEdit" type="button" onClick={toggleValue}>Edit Account</button>
                        </>        )
}
export default Menu
