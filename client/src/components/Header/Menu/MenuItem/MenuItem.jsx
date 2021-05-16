import React from 'react';
import { NavLink } from 'react-router-dom';

import './MenuItem.scss';
import withAppear from '../../../../HOC/withAnimationAppear';

export const MenuItem = (props) => {
  return (
    props.isShown &&
      <NavLink
        to={props.path}
        className="menu__menuItem"
        activeClassName="menu__menuItem__active"
      >
        {props.children}
      </NavLink> 
  )
};

export const AnimatedMenuItem = withAppear(MenuItem)