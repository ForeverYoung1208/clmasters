import React from 'react';
import { useState } from 'react';

export const GlobalDataContext = React.createContext(
  {
    data:{},
    setData:null
  }
);

export const GlobalDataProvider = (props) => {
  const [data, setData] = useState()
  return(
  <GlobalDataContext.Provider value={ {data, setData} }>
    {props.children}
  </GlobalDataContext.Provider>
  )
}