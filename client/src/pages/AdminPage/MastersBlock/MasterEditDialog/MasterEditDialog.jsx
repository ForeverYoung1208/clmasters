import React from 'react'
import MasterForm from '../MasterForm/MasterForm'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { DraggablePaper } from '../../../../components/Material/DraggablePaper/DraggablePaper'

export const MasterEditDialog = ({
  open,
  onClose: closeHandler,
  onSave: saveHandler,
  caption,
  masterId,
}) => {
  let master = useSelector(({ masters: { data } }) =>
    data.find((m) => +m.id === +masterId)
  )

  return (
    <Dialog
      open={open}
      onClose={closeHandler}
      aria-labelledby="draggable-dialog-title"
      PaperComponent={DraggablePaper}
    >
      <DialogTitle id="draggable-dialog-title">{caption}</DialogTitle>
      <DialogContent>
        <MasterForm master={master} onSubmit={saveHandler} />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
