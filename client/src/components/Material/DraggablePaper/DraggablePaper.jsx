import React from 'react'
import Draggable from 'react-draggable'
import { Paper } from '@material-ui/core'

export const DraggablePaper = (props) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  )
}
