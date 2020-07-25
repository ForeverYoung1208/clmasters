import { useState } from 'react';
export const useMenu = () => {
  
  const [menuItems, setMenuItems] = useState({
    items:[
      { name:'Info', path:'/info', isForAdmin:false},
      { name:'Find master', path:'/masters', isForAdmin:false},
      { name:'Login', path:'/login', isForAdmin:false},
      { name:'Administration', path:'/admin', isForAdmin:true}
    ],
    active:0
  })

  const setActiveMenuItem = (item) => {
    setMenuItems( (prevItems)=>{
      if(item > (prevItems.lenth-1)) return prevItems;
      return({ ...prevItems, active: item })
    })
    
  };

  return( {menuItems, setActiveMenuItem} )
};