import React from 'react'
import { Button as MaterialButton } from '@material-ui/core'

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
