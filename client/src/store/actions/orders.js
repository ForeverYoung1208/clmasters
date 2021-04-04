import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  apiDeleteOrder,
  apiGetOrders,
  apiPostOrder,
  apiPutOrder,
} from '../../shared/js/api/orders'
import { CLEAR_FOUND_ORDERS } from './actionTypes/orders'
import { setErrorMessage } from './main'


export const fetchOrders = createAsyncThunk('orders/fetch', async (queryObject) => {
  let queryStr=''
  for (const key in queryObject) {
    queryStr+=key+'='+queryObject[key]+'&'
  }
  const orders = await apiGetOrders(queryStr)
  return orders
})

export const searchOrdersBy = createAsyncThunk('orders/search', async (queryObject) => {
  let queryStr=''
  for (const key in queryObject) {
    queryStr+=key+'='+queryObject[key]
  }
  const orders = await apiGetOrders(queryStr)
  return orders
})

export const putOrder = createAsyncThunk(
  'orders/put',
  async ({ order, setEditingOrderId }, { rejectWithValue }) => {
    const res = await apiPutOrder(order)
    if (res.ok) {
      const newOrder = await res.json()
      setEditingOrderId && setEditingOrderId(null)
      return newOrder
    } else {
      const apiError = await res.json()
      return rejectWithValue(apiError)
    }
  }
)

export const postOrder = createAsyncThunk(
  'orders/post',
  async ({ order, setIsAddingOrder }, { rejectWithValue }) => {
    const res = await apiPostOrder(order)
    if (res.ok) {
      const resJSON = await res.json()
      setIsAddingOrder && setIsAddingOrder(false)
      return resJSON
    } else {
      const apiError = await res.json()
      return rejectWithValue(apiError)
    }
  }
)

export const deleteOrder = createAsyncThunk(
  'orders/delete',
  async ({ orderId, setDeletingOrderId }, { dispatch, rejectWithValue }) => {
    const res = await apiDeleteOrder(orderId)
    if (res.ok) {
      setDeletingOrderId && setDeletingOrderId(null)
      return { orderId }
    } else {
      const apiError = await res.json()
      dispatch (setErrorMessage(JSON.stringify(apiError)))
      return rejectWithValue(apiError)
    }
  }
)

export const clearFoundOrders = () => {
  return {
    type: CLEAR_FOUND_ORDERS
  }  
}
