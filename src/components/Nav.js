import React       from 'react';
import { NavLink } from 'react-router-dom';

import * as routes from '../constants/routes'

const Nav = ({order, user, logout}) => 
    <div className="navBox">
        { order
        ? <NavLink className="unlink">CREATE</NavLink>
        : <NavLink activeClassName="activeNav" to={routes.FORM}>CREATE</NavLink>
        }
        <NavLink activeClassName="activeNav" to={routes.HOME}>HOME</NavLink>
        <NavLink activeClassName="activeNav" to={routes.INFO}>ABOUT</NavLink>
        { user 
        ?  <NavLink activeClassName="activeNav" to={routes.ENTR} onClick={logout}>LOGOUT</NavLink> 
        :  <NavLink activeClassName="activeNav" to={routes.LOGN}>LOGIN</NavLink>
        }
    </div>

export default Nav