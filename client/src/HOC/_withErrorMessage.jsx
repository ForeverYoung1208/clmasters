import React from 'react';
import './withErrorMessage.scss'

const withErrorMessage = (Component) =>(props) => {
  const {isShown} = props
  
  return(
    <>
      <ErrorMessage isShown = {isShown}/>
      <Component {...props}/>
    </>
  )

}
export default withAppear;