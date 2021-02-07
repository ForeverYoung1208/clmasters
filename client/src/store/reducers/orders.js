import {
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
} from '../actions/actionTypes/orders'

const initialState = {
  data: [],
  error: null,
}

const orders = (state = initialState, { type, payload }) => {
  switch (type) {
    case ORDERS_FETCH_FULFILLED:
      return {
        ...state,
        data: [...payload],
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
      const ordersAfterPost = [...state.data, payload]
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

    case ORDERS_FETCH_PENDING:
    case ORDERS_PUT_PENDING:
    case ORDERS_POST_PENDING:
    case ORDERS_DELETE_PENDING:
      return {
        ...state,
        error: null,
      }

    case ORDERS_FETCH_REJECTED:
    case ORDERS_PUT_REJECTED:
    case ORDERS_POST_REJECTED:
    case ORDERS_DELETE_REJECTED:
      return {
        ...state,
        error: payload,
      }

    default:
      return state
  }
}

export default orders
