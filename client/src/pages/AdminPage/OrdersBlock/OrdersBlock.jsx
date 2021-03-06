import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteOrder,
  fetchOrders,
  postOrder,
  putOrder,
} from '../../../store/actions/orders'
import { Box } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { SubmissionError } from 'redux-form'
import { normalizeFormSubmitError } from '../../../shared/js/normalizeFormSubmitError'
import { Button } from '../../../components/Button/Button'
import { setErrorMessage } from '../../../store/actions/main'
import {
  ORDERS_POST_REJECTED,
  ORDERS_PUT_REJECTED,
} from '../../../store/actions/actionTypes/orders'

import { OrderEditDialog } from './OrderEditDialog/OrderEditDialog'
import { OrderAddDialog } from './OrderAddDialog/OrderAddDialog'
import { OrderDeleteDialog } from './OrderDeleteDialog/OrderDeleteDialog'
import CompactOrder from './CompactOrder/CompactOrder'
import EditDeleteBtns from '../../../components/EditDeleteBtns/EditDeleteBtns'
import ResponsiveDataGrid from '../../../components/Material/ResponsiveDataGrid/ResponsiveDataGrid'
import { setPaginationPageSize } from '../../../store/actions/main'

export const OrdersBlock = ({ classes }) => {
  const dispatch = useDispatch()
  const { data: orders, totalCount } = useSelector(({ orders }) => orders)
  const { paginationPageSize } = useSelector(({ main }) => main)

  const [editingOrderId, setEditingOrderId] = useState(null)
  const [deletingOrderId, setDeletingOrderId] = useState(null)
  const [isAddingOrder, setIsAddingOrder] = useState(null)

  const [currentPage, setCurrentPage] = useState(0)

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

  const transtormDateTime = useCallback(
    ({ row }) => new Date(row.onTime).toLocaleString('uk'),
    []
  )

  useEffect(() => {
    dispatch(fetchOrders({ page: 0, pageSize: paginationPageSize }))
  }, [dispatch, paginationPageSize])

  const handlePageChange = useCallback(
    ({ page, pageSize }) => {
      setCurrentPage(page)
      dispatch(fetchOrders({ page, pageSize }))
    },
    [dispatch, setCurrentPage]
  )
  const handlePageSizeChange = useCallback(
    ({ pageSize }) => {
      dispatch(fetchOrders({ page: 0, pageSize }))
      dispatch(setPaginationPageSize(pageSize))
      setCurrentPage(0)
    },
    [dispatch, setCurrentPage]
  )

  const columnsDef = useMemo(
    () => [
      { field: 'id', headerName: 'Id', width: 70 },
      {
        field: 'onTime',
        headerName: 'Time',
        width: 150,
        renderCell: transtormDateTime,
      },
      { field: 'clockType', headerName: 'Clock', width: 100 },
      { field: 'masterName', headerName: 'Master', width: 150 },
      { field: 'userName', headerName: 'User', width: 150 },
      { field: 'comment', headerName: 'Comment', flex: 1 },
      { field: 'price', headerName: 'Price', width: 100 },
      {
        field: 'actions',
        headerName: 'Actions',
        disableClickEventBubbling: true,
        disableColumnMenu: true,
        filterable: false,
        sortable: false,
        width: 120,
        renderCell: ({ row: { id } }) => (
          <EditDeleteBtns
            id={id}
            startEditHandler={startEditHandler}
            startDeleteHandler={startDeleteHandler}
          />
        ),
      },
    ],
    [startEditHandler, startDeleteHandler, transtormDateTime]
  )

  const compactColumnsDef = useMemo(
    () => [
      {
        field: 'order',
        headerName: 'Orders',
        flex: 1,
        filterable: false,
        sortable: false,
        renderCell: CompactOrder,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        disableClickEventBubbling: true,
        disableColumnMenu: true,
        filterable: false,
        sortable: false,
        width: 120,
        renderCell: ({ row: { id } }) => (
          <EditDeleteBtns
            id={id}
            startEditHandler={startEditHandler}
            startDeleteHandler={startDeleteHandler}
          />
        ),
      },
    ],
    [startEditHandler, startDeleteHandler]
  )

  return (
    <>
      <div className={classes}>
        <ResponsiveDataGrid
          rows={orders}
          columnsDef={columnsDef}
          compactColumnsDef={compactColumnsDef}
          paginationMode="server"
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          rowCount={totalCount}
          page={currentPage}
          pageSize={paginationPageSize}
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
