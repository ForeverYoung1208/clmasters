import React from 'react'
import CityForm from '../CityForm/CityForm'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { DraggablePaper } from '../../../../components/Material/DraggablePaper/DraggablePaper'

export const CityEditDialog = ({
  open,
  onClose: closeHandler,
  onSave: saveHandler,
  caption,
  cityId,
}) => {
  let city = useSelector(({ cities: { data } }) =>
    data.find((c) => +c.id === +cityId)
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
        <CityForm city={city} onSubmit={saveHandler} />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
