import { useState } from 'react';
export const useMenu = (currentUser) => {

  const buildMenuItems = (cu) => {
    return([
      { name:'Info', path:'/info', isShown:true},
      { name:'Find master', path:'/masters', isShown:true},
      { name: 'Login', path: '/login', isShown: !(cu?.email) },
      { name: 'Administration', path: '/admin', isShown: !!(cu?.isAdmin) },

      // uncomment for testing unauthorized access cases:
      // { name:'Administration', path:'/admin', isShown:true}
    ])
  };
  
  const [menuItems,setMenuItems] = useState({
    items:buildMenuItems(currentUser),
  })

  const updateMenuItems = (currentUser)=>{
    setMenuItems({
      items:buildMenuItems(currentUser),
    })
  }

  return( {menuItems, updateMenuItems} )
};