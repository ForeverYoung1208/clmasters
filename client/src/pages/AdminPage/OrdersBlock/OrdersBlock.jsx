import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteOrder,
  fetchOrders,
  postOrder,
  putOrder,
} from '../../../store/actions/orders'
import { DataGrid } from '@material-ui/data-grid'
import { Box, IconButton } from '@material-ui/core'
import './OrdersBlock.scss'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@material-ui/icons'
import { SubmissionError } from 'redux-form'
import { normalizeFormSubmitError } from '../../../shared/js/common'
import { Button } from '../../../components/Button/Button'
import { setErrorMessage } from '../../../store/actions/main'
import {
  ORDERS_POST_REJECTED,
  ORDERS_PUT_REJECTED,
} from '../../../store/actions/actionTypes/orders'
import { fetchMasters } from '../../../store/actions/masters'
import { fetchUsers } from '../../../store/actions/users'
import { fetchClocks } from '../../../store/actions/clocks'

import { OrderEditDialog } from './OrderEditDialog/OrderEditDialog'
import { OrderAddDialog } from './OrderAddDialog/OrderAddDialog'
import { OrderDeleteDialog } from './OrderDeleteDialog/OrderDeleteDialog'

const PAGE_SIZE = 20
const ROWS_PER_PAGE_OPTIONS = [10, 20, 50]

export const OrdersBlock = () => {
  const dispatch = useDispatch()
  const orders = useSelector(({ orders }) => orders?.data)

  const [editingOrderId, setEditingOrderId] = useState(null)
  const [deletingOrderId, setDeletingOrderId] = useState(null)
  const [isAddingOrder, setIsAddingOrder] = useState(null)

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

  const startAddHandler = useCallback(() => {
    dispatch(setErrorMessage(''))
    setIsAddingOrder(true)
  }, [dispatch])
  const addHandler = useCallback(
    async (order) => {
      const action = await dispatch(postOrder({ order, setIsAddingOrder }))
      if (action.type === ORDERS_POST_REJECTED) {
        const formSubmitError = normalizeFormSubmitError(action.payload?.errors)
        throw new SubmissionError(formSubmitError)
      }
    },
    [dispatch]
  )
  const closeAddHandler = useCallback(() => {
    setIsAddingOrder(false)
  }, [setIsAddingOrder])

  useEffect(() => {
    dispatch(fetchOrders())
    dispatch(fetchClocks())
    dispatch(fetchMasters())
    dispatch(fetchUsers())
  }, [dispatch])

  const renderActions = useCallback(
    ({ row }) => {
      return (
        <>
          <IconButton onClick={() => startEditHandler(row.id)}>
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => startDeleteHandler(row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    },
    [startEditHandler, startDeleteHandler]
  )

  const transtormDateTime = useCallback(({ row }) =>
    new Date(row.onTime).toLocaleString('uk')
  )

  const columnsDef = [
    { field: 'id', headerName: 'Id', width: 70 },
    {
      field: 'onTime',
      headerName: 'Time',
      width: 200,
      renderCell: transtormDateTime,
    },
    { field: 'clockType', headerName: 'Clock', width: 120 },
    { field: 'masterName', headerName: 'Master', width: 120 },
    { field: 'userName', headerName: 'User', width: 200 },
    { field: 'comment', headerName: 'Comment', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      disableClickEventBubbling: true,
      disableColumnMenu: true,
      filterable: false,
      sortable: false,
      width: 120,
      renderCell: renderActions,
    },
  ]

  return (
    <>
      <div className="adminPage__itemsBlock">
        <DataGrid
          className="purple-borders-datagrid"
          showToolbar
          rows={orders}
          columns={columnsDef}
          disableColumnReorder={true}
          pageSize={PAGE_SIZE}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        />

        <OrderEditDialog
          caption={'Edit Order'}
          open={!!editingOrderId}
          onClose={closeEditHandler}
          onSave={saveHandler}
          orderId={editingOrderId}
        />

        <OrderAddDialog
          caption={'New Order'}
          open={!!isAddingOrder}
          onClose={closeAddHandler}
          onAdd={addHandler}
        />

        <OrderDeleteDialog
          caption={'Delete Order'}
          open={!!deletingOrderId}
          onClose={closeDeleteHandler}
          onDelete={deleteHandler}
          orderId={deletingOrderId}
        />
      </div>
      <Box p={2} display="flex" justifyContent="center">
        <Button onClick={startAddHandler}>
          Add Order
          <AddIcon />
        </Button>
      </Box>
    </>
  )
}
