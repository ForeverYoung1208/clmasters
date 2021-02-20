import React from 'react'
import { Button as MaterialButton } from '@material-ui/core'

import './Button.scss'

export const Button = (props) => {
  return (
    <MaterialButton
      variant="contained"
      color="primary"
      {...props}
    >
      {props.children}
    </MaterialButton>
  )
}
