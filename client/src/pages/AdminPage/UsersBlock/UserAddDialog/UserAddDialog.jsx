import React from 'react'
import UserForm from '../UserForm/UserForm'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { DraggablePaper } from '../../../../components/Material/DraggablePaper/DraggablePaper'

export const UserAddDialog = ({
  open,
  onClose: closeHandler,
  onAdd: addHandler,
  caption,
}) => {
  const user = {}
  return (
    <Dialog
      open={open}
      onClose={closeHandler}
      aria-labelledby="draggable-dialog-title"
      PaperComponent={DraggablePaper}
    >
      <DialogTitle id="draggable-dialog-title">{caption}</DialogTitle>
      <DialogContent>
        <UserForm user={user} onSubmit={addHandler} />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
