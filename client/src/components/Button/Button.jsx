import React from 'react'
import MaterialButton from '@material-ui/core/Button'

import './Button.scss'

export const Button = (props) => {
  const { className, ...restProps } = props

  return (
    <MaterialButton
      {...restProps}
      variant="contained"
      color="primary"
      className={className}
    >
      {props.children}
    </MaterialButton>
  )
}
