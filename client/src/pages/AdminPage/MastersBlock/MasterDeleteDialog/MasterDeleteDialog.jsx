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

export const MasterDeleteDialog = ({
  open,
  onClose: closeHandler,
  onDelete: deleteHandler,
  caption,
  masterId,
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
          Please confirm deletion master with id {masterId}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => deleteHandler(masterId)}> Confirm </Button>
        <Button onClick={closeHandler} color="primary">
          Cancel
        </Button>
      </DialogActions>
      <HumanizedErrorMessageButton />
    </Dialog>
  )
}
