import React from 'react';

const WithLocalStorage = (Component)=>{

  const ComponentWithLS = ({passProps}) =>{
    return <Component LS={LS} {...passProps}/>
  }

  return(<ComponentWithLS/>)
}