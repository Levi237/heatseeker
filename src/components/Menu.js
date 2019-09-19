import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({userInfo, userOrders, userCreations, userEdit, toggleValue}) => {
    // const {  } = this.props
    return(
<>

    <button name="userInfo" type="button" className={userInfo ? "on" : ""} onClick={toggleValue}>How To</button>
                                <Link  to='./create-recipe'><button type="button" to={'./create-recipe'}>Create Hotsauce</button></Link>
                                <button name="userOrders" type="button" className={userOrders ? "on" : ""} onClick={toggleValue}>Show Orders</button>
                                <button name="userCreations" type="button" className={userCreations ? "on" : ""} onClick={toggleValue}>Show Creations</button>
                                <button name="userEdit" type="button" className={userEdit ? "on" : ""} onClick={toggleValue}>Edit Account</button>
                        </>        )
}
export default Menu
