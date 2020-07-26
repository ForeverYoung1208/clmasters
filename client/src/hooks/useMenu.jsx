import { useState } from 'react';
export const useMenu = () => {
  
  const [menuItems] = useState({
    items:[
      { name:'Info', path:'/info', isForAdmin:false},
      { name:'Find master', path:'/masters', isForAdmin:false},
      { name:'Login', path:'/login', isForAdmin:false},
      { name:'Administration', path:'/admin', isForAdmin:true}
    ],
  })

  return( {menuItems} )
};