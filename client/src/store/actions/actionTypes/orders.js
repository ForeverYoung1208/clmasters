// action types values are provided by createAsyncThunk  
// from '@reduxjs/toolkit' https://redux-toolkit.js.org/api/createAsyncThunk

export const ORDERS_FETCH_FULFILLED = 'orders/fetch/fulfilled'
export const ORDERS_PUT_FULFILLED = 'orders/put/fulfilled'
export const ORDERS_POST_FULFILLED = 'orders/post/fulfilled'
export const ORDERS_DELETE_FULFILLED = 'orders/delete/fulfilled'
export const ORDERS_FETCH_PENDING = 'orders/fetch/pending'
export const ORDERS_PUT_PENDING = 'orders/put/pending'
export const ORDERS_POST_PENDING = 'orders/post/pending'
export const ORDERS_DELETE_PENDING = 'orders/delete/pending'
export const ORDERS_FETCH_REJECTED = 'orders/fetch/rejected'
export const ORDERS_PUT_REJECTED = 'orders/put/rejected'
export const ORDERS_POST_REJECTED = 'orders/post/rejected'
export const ORDERS_DELETE_REJECTED = 'orders/delete/rejected'

export const ORDERS_SEARCH_FULFILLED = 'orders/search/fulfilled'
export const ORDERS_SEARCH_PENDING = 'orders/search/pending'
export const ORDERS_SEARCH_REJECTED = 'orders/search/rejected'

export const CLEAR_FOUND_ORDERS = 'orders/clearFoundOrders'

export const ORDERS_SET_REGISTERED_ORDER = 'orders/setRegisteredOrder'