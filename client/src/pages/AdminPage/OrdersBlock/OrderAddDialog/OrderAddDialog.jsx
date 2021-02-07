import React from 'react'
import OrderForm from '../OrderForm/OrderForm'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { DraggablePaper } from '../../../../components/Material/DraggablePaper/DraggablePaper'

export const OrderAddDialog = ({
  open,
  onClose: closeHandler,
  onAdd: addHandler,
  caption,
}) => {
  const order = {}
  return (
    <Dialog
      open={open}
      onClose={closeHandler}
      aria-labelledby="draggable-dialog-title"
      PaperComponent={DraggablePaper}
    >
      <DialogTitle id="draggable-dialog-title">{caption}</DialogTitle>
      <DialogContent>
        <OrderForm order={order} onSubmit={addHandler} />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
