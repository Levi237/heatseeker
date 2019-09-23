import React       from 'react';
import { NavLink } from 'react-router-dom';

import * as routes from '../../constants/routes'

const Nav = ({order, user, logout}) => 
    <div className="nav-container">
        { order
        ? <NavLink>CREATE</NavLink>
        : <NavLink activeClassName="nav-active" to={routes.FORM}>CREATE</NavLink>
        }
        <NavLink activeClassName="nav-active" to={routes.HOME}>HOME</NavLink>
        <NavLink activeClassName="nav-active" to={routes.INFO}>ABOUT</NavLink>
        { user 
        ?  <NavLink activeClassName="nav-active" to={routes.ENTR} onClick={logout}>LOGOUT</NavLink> 
        :  <NavLink activeClassName="nav-active" to={routes.LOGN}>LOGIN</NavLink>
        }
    </div>

export default Nav