import {
  CLEAR_FOUND_ORDERS,
  ORDERS_DELETE_FULFILLED,
  ORDERS_DELETE_PENDING,
  ORDERS_DELETE_REJECTED,
  ORDERS_FETCH_FULFILLED,
  ORDERS_FETCH_PENDING,
  ORDERS_FETCH_REJECTED,
  ORDERS_POST_FULFILLED,
  ORDERS_POST_PENDING,
  ORDERS_POST_REJECTED,
  ORDERS_PUT_FULFILLED,
  ORDERS_PUT_PENDING,
  ORDERS_PUT_REJECTED,
  ORDERS_SEARCH_FULFILLED,
  ORDERS_SEARCH_PENDING,
  ORDERS_SEARCH_REJECTED,
  ORDERS_SET_REGISTERED_ORDER,
} from '../actions/actionTypes/orders'

const initialState = {
  data: [],
  error: null,
}

const orders = (state = initialState, { type, payload, registeredOrder }) => {
  switch (type) {
    case ORDERS_FETCH_FULFILLED:
      return {
        ...state,
        data: [...payload.data],
        totalCount: payload.totalCount,
        currentPage: payload.currentPage,
        error: null,
      }

    case ORDERS_PUT_FULFILLED:
      const ordersAfterPut = state.data.map((order) => {
        if (+order.id === +payload.id) return payload
        return order
      })
      return {
        ...state,
        data: ordersAfterPut,
        error: null,
      }

    case ORDERS_POST_FULFILLED:
      const ordersAfterPost = [ payload, ...state.data]
      return {
        ...state,
        data: ordersAfterPost,
        error: null,
      }

    case ORDERS_DELETE_FULFILLED:
      const ordersAfterDelete = state.data.filter((c) => +c.id !== +payload.orderId)
      return {
        ...state,
        data: ordersAfterDelete,
        error: null,
      }
    
    case ORDERS_SEARCH_FULFILLED:
      return {
        ...state,
        foundOrders: [...payload.data],
        totalCount: payload.totalCount,
        currentPage: payload.currentPage,
        error: null,        
      }
    
    case CLEAR_FOUND_ORDERS:
      return {
        ...state,
        foundOrders:null,
      }
    
    case ORDERS_SET_REGISTERED_ORDER:
      return {
        ...state,
        registeredOrder
      }

    case ORDERS_FETCH_PENDING:
    case ORDERS_PUT_PENDING:
    case ORDERS_POST_PENDING:
    case ORDERS_DELETE_PENDING:
    case ORDERS_SEARCH_PENDING:
      return {
        ...state,
        error: null,
      }

    case ORDERS_FETCH_REJECTED:
    case ORDERS_PUT_REJECTED:
    case ORDERS_POST_REJECTED:
    case ORDERS_DELETE_REJECTED:
    case ORDERS_SEARCH_REJECTED:
      return {
        ...state,
        error: payload,
      }

    default:
      return state
  }
}

export default orders
