import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({toggleValue}) => {
    // const {  } = this.props
    return(
<>

                                <button name="userInfo" type="button" onClick={toggleValue}>How To</button>
                                <Link  to='./create-recipe'>
                                    <button type="button" to={'./create-recipe'}>Create Hotsauce</button>
                                </Link>
                                <button name="userOrders" type="button" onClick={toggleValue}>Show Orders</button>
                                <button name="userCreations" type="button" onClick={toggleValue}>Show Creations</button>
                                <button name="userEdit" type="button" onClick={toggleValue}>Edit Account</button>
                        </>        )
}
export default Menu
