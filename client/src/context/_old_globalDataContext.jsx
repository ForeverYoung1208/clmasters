// import React from 'react';
// import { useState } from 'react';

// export const GlobalDataContext = React.createContext();

// export const GlobalDataProvider = (props) => {
//   const [globalData, _setGlobalData] = useState()

//   const setGlobalData = (newData)=>{
//     _setGlobalData({...globalData, ...newData})
//   }

//   return(
//   <GlobalDataContext.Provider value={ {globalData, setGlobalData}} >
//     {props.children}
//   </GlobalDataContext.Provider>
//   )
// }