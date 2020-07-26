import React from 'react';
import { NavLink } from 'react-router-dom';
import './menuItem.scss';
import PT from 'prop-types';

export const MenuItem = (props) => {

  return (
    props.isShown &&
      <NavLink
        to={props.path}
        // exact=true
        className="menu__menuItem"
        activeClassName="menu__menuItem__active"
      >
        {props.children}
      </NavLink> 
  )
};

MenuItem.propTypes={
  children: PT.node.isRequired,
  isShown: PT.bool.isRequired,
  path: PT.string.isRequired
}

