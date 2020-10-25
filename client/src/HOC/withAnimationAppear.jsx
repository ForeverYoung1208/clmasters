import React from 'react';
import './withAnimationAppear.scss'

const { CSSTransition } = require("react-transition-group")

const withAppear = (Component) =>(props) => {
  const { isShown } = props
  return(
    <CSSTransition
      in={isShown}
      timeout={300}
      classNames="animHOC"
    >
      <Component {...props}/>
      
    </CSSTransition>
  )

}
export default withAppear;