import React from 'react';
import { NavLink } from 'react-router-dom';

import * as routes from '../constants/routes'

const Nav = ({newRecipe}) => 
    <div className="navBox">
    { !newRecipe && 
    <>
    <NavLink activeClassName="" to={routes.FORM}>CREATE</NavLink>
    <NavLink activeClassName="" to={routes.INFO}>ABOUT</NavLink>
    </>
    }
    </div>

export default Nav