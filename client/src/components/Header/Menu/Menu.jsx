import React, { useContext, useEffect } from 'react';

import { AuthContext } from '../../../context/contexts';
// import { CSSTransition } from 'react-transition-group';
import { useMenu } from '../../../hooks/useMenu';
import { MenuItem } from './MenuItem/MenuItem';
import withAppear from '../../../HOC/withAnimationAppear';


import './Menu.scss';

const AnimatedMenuItem = withAppear(MenuItem)

const Menu = () => {
  const { auth } =useContext(AuthContext)
  const { menuItems, updateMenuItems } = useMenu(auth.currentUser);
  useEffect(()=>{
      updateMenuItems(auth.currentUser)
    }, [auth.currentUser]
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


// return (
//   <CSSTransition
//   in={!!auth.currentUser}
//   timeout={300}
//   classNames="appear"
//   >
//     <div className="menu">
//       {menuItems.items.map( mi => 
//           <MenuItem
//             key={mi.name}
//             isShown = {mi.isShown}
//             path={mi.path}
//             >
//             {mi.name}
//           </MenuItem> 
//       )}
    
//     </div>
//   </CSSTransition>      
// );
// };
