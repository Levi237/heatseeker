import React from 'react';
import { NavLink } from 'react-router-dom';

import * as routes from '../constants/routes'

const Nav = ({newRecipe, user, logout}) => 
    <div className="navBox">
        <NavLink activeClassName="" to={routes.INFO}>ABOUT</NavLink>

        { !newRecipe 
            && <NavLink activeClassName="" to={routes.FORM}>CREATE</NavLink>
        }
        <NavLink activeClassName="" to={routes.USER}>HOME</NavLink>
        { user 
            ?  <NavLink activeClassName="" to={routes.ROOT} onClick={logout}>LOGOUT</NavLink> 
            :  <NavLink activeClassName="" to={routes.LOGN}>LOGIN</NavLink>
        }
        

    </div>

export default Nav