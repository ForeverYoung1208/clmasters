import React from 'react';
const { CSSTransition } = require("react-transition-group")

const withAppear = (Component) =>(props) => {
  const {isShown} = props

  return(
    <CSSTransition
      in={isShown}
      timeout={300}
      classNames="appear"
    >
      <Component {...props}/>
      
    </CSSTransition>
  )

}
export default withAppear;