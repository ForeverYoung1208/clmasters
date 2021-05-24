import React, { useCallback, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { ORDERS_PUT_REJECTED } from '../../../../store/actions/actionTypes/orders'
import { normalizeFormSubmitError } from '../../../../shared/js/normalizeFormSubmitError'
import { setErrorMessage } from '../../../../store/actions/main'
import { deleteOrder, putOrder } from '../../../../store/actions/orders'
import { SubmissionError } from 'redux-form'
import { DraggablePaper } from '../../../../components/Material/DraggablePaper/DraggablePaper'
import { OrdersInfo } from '../../../InfoPage/OrdersInfo/OrdersInfo'
import { OrderEditDialog } from '../../OrdersBlock/OrderEditDialog/OrderEditDialog'
import { OrderDeleteDialog } from '../../OrdersBlock/OrderDeleteDialog/OrderDeleteDialog'

export const OrderInfoDialog = ({ open, orderId, closeDialogHandler }) => {
  const dispatch = useDispatch()
  const order = useSelector(({ orders: { data } }) =>
    data.find((m) => +m.id === +orderId)
  )
  const [editingOrderId, setEditingOrderId] = useState(null)
  const [deletingOrderId, setDeletingOrderId] = useState(null)

  const startEditHandler = useCallback(
    (id) => {
      dispatch(setErrorMessage(''))
      setEditingOrderId(id)
    },
    [dispatch]
  )
  const saveHandler = useCallback(
    async (order) => {
      const action = await dispatch(putOrder({ order, setEditingOrderId }))
      if (action.type === ORDERS_PUT_REJECTED) {
        const formSubmitError = normalizeFormSubmitError(action.payload?.errors)
        throw new SubmissionError(formSubmitError)
      }
    },
    [dispatch]
  )
  const closeEditHandler = useCallback(() => {
    setEditingOrderId(null)
  }, [setEditingOrderId])

  const startDeleteHandler = useCallback(
    (id) => {
      dispatch(setErrorMessage(''))
      setDeletingOrderId(id)
    },
    [dispatch]
  )
  const deleteHandler = useCallback(
    (id) => {
      dispatch(deleteOrder({ orderId: id, setDeletingOrderId }))
    },
    [dispatch]
  )
  const closeDeleteHandler = useCallback(() => {
    setDeletingOrderId(null)
  }, [setDeletingOrderId])

  if (!order) return null
  return (
    <Dialog
      open={open}
      onClose={closeDialogHandler}
      aria-labelledby="draggable-dialog-title"
      PaperComponent={DraggablePaper}
    >
      <DialogContent>
        <OrdersInfo orders={[order]} heading="order details"></OrdersInfo>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            startDeleteHandler(orderId)
          }}
          color="primary"
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            startEditHandler(orderId)
          }}
          color="primary"
        >
          Edit
        </Button>
        <Button onClick={closeDialogHandler} color="primary">
          Close
        </Button>
      </DialogActions>

      <OrderEditDialog
        caption={'Edit Order'}
        open={!!editingOrderId}
        onClose={closeEditHandler}
        onSave={saveHandler}
        orderId={editingOrderId}
      />

      <OrderDeleteDialog
        caption="Delete Order"
        open={!!deletingOrderId}
        onClose={closeDeleteHandler}
        onDelete={deleteHandler}
        orderId={deletingOrderId}
      />
    </Dialog>
  )
}
