import React from 'react'
import UserForm from '../UserForm/UserForm'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { DraggablePaper } from '../../../../components/Material/DraggablePaper/DraggablePaper'

export const UserEditDialog = ({
  open,
  onClose: closeHandler,
  onSave: saveHandler,
  caption,
  userId,
}) => {
  let user = useSelector(({ users: { data } }) =>
    data.find((m) => +m.id === +userId)
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
        <UserForm user={user} onSubmit={saveHandler} />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
