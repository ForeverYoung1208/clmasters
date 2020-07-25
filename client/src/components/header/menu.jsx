import React, { useContext } from 'react';

import { useMenu } from '../../hooks/useMenu';
import { MenuItem } from "./menu/menuItem";
import { AuthContext } from '../../context/contexts';

import './menu.scss';

const Menu = () => {
  const { auth } =useContext(AuthContext)
  const {menuItems, setActiveMenu} = useMenu();
  return (
    <div className="menu">
      {menuItems.items.map( mi => 
        <MenuItem
          key={mi.name}
          isShown = {!mi.isForAdmin ? true : !!(auth.currentUser&&auth.currentUser.isAdmin)}
          isActive = {true}
          onClick = {()=>alert(`clicked ${mi.name}`)}    
        >
          {mi.name}
        </MenuItem> 
      )}
    
    </div>
  );
};

export default Menu;
