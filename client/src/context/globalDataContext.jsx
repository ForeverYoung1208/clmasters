import React from 'react';
import { useState } from 'react';

export const GlobalDataContext = React.createContext();

export const GlobalDataProvider = (props) => {
  const [data, setData] = useState({
    data:{},
    setData:function(){}
  })
  return(
  <GlobalDataContext.Provider value={ {data, setData}} >
    {props.children}
  </GlobalDataContext.Provider>
  )
}