import React from 'react'
import OrderForm from '../OrderForm/OrderForm'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { DraggablePaper } from '../../../../components/Material/DraggablePaper/DraggablePaper'

export const OrderEditDialog = ({
  open,
  onClose: closeHandler,
  onSave: saveHandler,
  caption,
  orderId,
}) => {
  let order = useSelector(({ orders: { data } }) =>
    data.find((m) => +m.id === +orderId)
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
        <OrderForm order={order} onSubmit={saveHandler} />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
