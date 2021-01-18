import React from 'react'
import Draggable from 'react-draggable'
import CityEditForm from './CityEditForm'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from '@material-ui/core'
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
  let [city] = useSelector(({ cities: { data } }) => [
    data.find((c) => +c.id === +cityId),
  ])

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
      <DialogActions>
        <Button onClick={closeHandler} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
