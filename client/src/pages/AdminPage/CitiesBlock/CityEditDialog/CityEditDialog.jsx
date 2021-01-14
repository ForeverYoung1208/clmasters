import React from 'react'
import Draggable from 'react-draggable'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from '@material-ui/core'
import CityEditForm from './CityEditForm'
import { useSelector } from 'react-redux'

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  )
}

export const CityEditDialog = ({
  open,
  onClose: closeHandler,
  onSave: saveHandler,
  caption,
  cityId,
}) => {
  let city = useSelector(({ cities: { data: cities} }) =>
    cities.find((c) => +c.id === +cityId)
  )

  return (
    <Dialog
      open={open}
      onClose={closeHandler}
      aria-labelledby="draggable-dialog-title"
      PaperComponent={PaperComponent}
    >
      <DialogTitle id="draggable-dialog-title">{caption}</DialogTitle>
      <DialogContent>
        <CityEditForm city={city} onSubmit={saveHandler} />
      </DialogContent>

      <DialogContentText>
        TODO: styling of this window, show error here, implement deletion (after
        confirmation)
      </DialogContentText>
      <DialogActions>
        <Button onClick={closeHandler} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
