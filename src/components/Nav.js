import React from 'react';
import { NavLink } from 'react-router-dom';

import * as routes from '../constants/routes'

const Nav = ({newRecipe, user, logout}) => 
    <div className="navBox">
    <NavLink activeClassName="" to={routes.INFO}>ABOUT</NavLink>
    { !newRecipe && user ?
    <>
    <NavLink activeClassName="" to={routes.FORM}>CREATE</NavLink>
    </> : <></>
    }
    {user ? <NavLink activeClassName="" to={routes.HOME} onClick={logout}>LOGOUT</NavLink> : <NavLink activeClassName="" to={routes.HOME} onClick={logout}>LOGIN</NavLink>}
    </div>

export default Nav