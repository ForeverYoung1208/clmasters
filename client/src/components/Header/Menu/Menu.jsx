import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux'

// import { AuthContext } from '../../../context/authContext';
import { useMenu } from '../../../hooks/useMenu';
import { MenuItem } from './MenuItem/MenuItem';
import withAppear from '../../../HOC/withAnimationAppear';

import './Menu.scss';

const AnimatedMenuItem = withAppear(MenuItem)

const Menu = () => {
  // const { auth } = useContext(AuthContext)
  const currentUser = useSelector(store => store.auth.user)
  const { menuItems, updateMenuItems } = useMenu(currentUser);
  useEffect(()=>{
      updateMenuItems(currentUser)
      // eslint-disable-next-line
    }, [currentUser]
  )
  
  return (
    <div className="menu">
      {menuItems.items.map( mi => 
          <AnimatedMenuItem
          key={mi.name}
          isShown = {mi.isShown}
          path={mi.path}
          >
            {mi.name}
          </AnimatedMenuItem> 
      )}
    </div>
  );
};

export default Menu;

