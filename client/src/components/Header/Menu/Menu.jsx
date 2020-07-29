import React, { useContext, useEffect } from 'react';

import { AuthContext } from '../../../context/contexts';
import { CSSTransition } from 'react-transition-group';
import { useMenu } from '../../../hooks/useMenu';
import { MenuItem } from './MenuItem/MenuItem';

import './Menu.scss';

const Menu = () => {
  const { auth } =useContext(AuthContext)
  const { menuItems, updateMenuItems } = useMenu(auth.currentUser);
  useEffect(()=>{
      updateMenuItems(auth.currentUser)
    }, [auth.currentUser]
  )
  
  return (
    <CSSTransition
    in={!!auth.currentUser}
    timeout={300}
    classNames="appear"
    >
      <div className="menu">
        {menuItems.items.map( mi => 
            <MenuItem
              key={mi.name}
              isShown = {mi.isShown}
              path={mi.path}
              >
              {mi.name}
            </MenuItem> 
        )}
      
      </div>
    </CSSTransition>      
  );
};

export default Menu;
