import React, { useEffect } from 'react';

import { useMenu } from '../../../hooks/useMenu';
import { MenuItem } from './MenuItem/MenuItem';
import withCurrentUser from '../../../HOC/withCurrentUser';
import withAppear from '../../../HOC/withAnimationAppear';

import './Menu.scss';

const AnimatedMenuItem = withAppear(MenuItem)

const Menu = (props) => {
  const { currentUser } = props
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

export default withCurrentUser(Menu);

