import React from 'react';
import { useState } from 'react';

export const DataContext = React.createContext();

export const DataProvider = (props) => {
  const [data, setData] = useState()
  return(
  <DataContext.Provider value={ {data, setData} }>
    {props.children}
  </DataContext.Provider>
  )
}