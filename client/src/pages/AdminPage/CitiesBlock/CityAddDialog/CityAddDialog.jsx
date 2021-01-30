import React from 'react'
import CityForm from '../CityForm/CityForm'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { DraggablePaper } from '../../../../components/Material/DraggablePaper/DraggablePaper'

export const CityAddDialog = ({
  open,
  onClose: closeHandler,
  onAdd: addHandler,
  caption,
}) => {
  const city = {}
  return (
    <Dialog
      open={open}
      onClose={closeHandler}
      aria-labelledby="draggable-dialog-title"
      PaperComponent={DraggablePaper}
    >
      <DialogTitle id="draggable-dialog-title">{caption}</DialogTitle>
      <DialogContent>
        <CityForm city={city} onSubmit={addHandler} />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
