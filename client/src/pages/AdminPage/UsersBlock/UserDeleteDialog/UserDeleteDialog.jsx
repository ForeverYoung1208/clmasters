import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { DraggablePaper } from '../../../../components/Material/DraggablePaper/DraggablePaper'
import { withHumanizeError } from '../../../../HOC/withHumanizeError'
import { ErrorMessageButton } from '../../../../components/ErrorMessage/ErrorMessage'
const HumanizedErrorMessageButton = withHumanizeError(ErrorMessageButton)

export const UserDeleteDialog = ({
  open,
  onClose: closeHandler,
  onDelete: deleteHandler,
  caption,
  userId,
}) => {
  return (
    <Dialog
      open={open}
      onClose={closeHandler}
      aria-labelledby="draggable-dialog-title"
      PaperComponent={DraggablePaper}
    >
      <DialogTitle id="draggable-dialog-title">{caption}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please confirm deletion user with id {userId}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => deleteHandler(userId)}> Confirm </Button>
        <Button onClick={closeHandler} color="primary">
          Cancel
        </Button>
      </DialogActions>
      <HumanizedErrorMessageButton />
    </Dialog>
  )
}
