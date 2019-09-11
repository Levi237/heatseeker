import React       from 'react';
import { NavLink } from 'react-router-dom';

import * as routes from '../constants/routes'

const Nav = ({order, user, logout}) => 
    <div className="navBox">
        { order
        ? <NavLink className="unlink">CREATE</NavLink>
        : <NavLink activeClassName="" to={routes.FORM}>CREATE</NavLink>
        }
        <NavLink activeClassName="" to={routes.HOME}>HOME</NavLink>
        <NavLink activeClassName="" to={routes.INFO}>ABOUT</NavLink>
        { user 
        ?  <NavLink activeClassName="" to={routes.ROOT} onClick={logout}>LOGOUT</NavLink> 
        :  <NavLink activeClassName="" to={routes.LOGN}>LOGIN</NavLink>
        }
    </div>

export default Nav