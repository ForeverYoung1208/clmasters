import { useState } from 'react';
export const useMenu = (currentUser) => {

  const buildMenuItems = (cu) => {
    return([
      { name:'Info', path:'/info', isShown:true},
      { name:'Find master', path:'/masters', isShown:true},
      { name:'Login', path:'/login', isShown:!(cu?.email)},
      { name:'User page', path:'/user', isShown:true},
      { name:'Administration', path:'/admin', isShown:!!(cu && cu.isAdmin)}
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