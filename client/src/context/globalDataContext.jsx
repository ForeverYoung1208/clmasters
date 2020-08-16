import React from 'react';
import { useState } from 'react';

export const GlobalDataContext = React.createContext();

export const GlobalDataProvider = (props) => {
  const [globalData, setGlobalData] = useState({
    data:{},
    setData:function(){}
  })
  return(
  <GlobalDataContext.Provider value={ {globalData, setGlobalData}} >
    {props.children}
  </GlobalDataContext.Provider>
  )
}