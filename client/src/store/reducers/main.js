
import { SET_ERROR_MESSAGE } from "../actions/actionTypes/errors"
import { LOADER_HIDE, LOADER_SHOW } from "../actions/actionTypes/loaders"
import { POST_PREORDER_OK, SAVE_PREORDER } from "../actions/actionTypes/preorders"
import { REDIRECTION_DONE, REDIRECT_START } from "../actions/actionTypes/redirect"
import {
  CLEAR_ORDERS,
  CLEAR_ORDER_RESULT,
  GET_ORDERS_OK,
  POST_ORDER_OK
} from "../actions/actionTypes/orders"

const initialState = {
  loaders:{
    vocabluaries: false,
    preorder: false
  },
  preorder: {},
  preorderResult: null,
  errorMessage: null
}

const main = (state = initialState, action) => { 
  const newLoaders = { ...state.loaders }
  switch (action.type) {
    
    case LOADER_SHOW:
      newLoaders[action.loaderName] = true
      return {
        ...state,
        loaders: newLoaders
      }
    
    case LOADER_HIDE:
      newLoaders[action.loaderName] = false
      return {
        ...state,
        loaders: newLoaders
      }
    
    case REDIRECT_START:
      return {
        ...state,
        redirectUrl: action.redirectUrl
      }

    case REDIRECTION_DONE:
      return {
        ...state,
        redirectUrl: null
      }

    case SAVE_PREORDER:
      return {
        ...state,
        preorder: action.preorder
      }
      
    case POST_PREORDER_OK:
      return {
        ...state,
        preorderResult: action.preorderResult
      }
    
    case POST_ORDER_OK:
      return {
        ...state,
        preorder: null,
        preorderResult: null,
        orderResult: action.orderResult,
        redirectUrl: action.redirectUrl
      }
    
    case CLEAR_ORDER_RESULT:
      return {
        ...state,
        orderResult: null
      }
    
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.errorMessage
      }
    
    case GET_ORDERS_OK:
      return {
        ...state,
        orders: action.orders
      }
    
    case CLEAR_ORDERS:
      return {
        ...state,
        orders: null
      }
    
    
    default:
      return state      
  }
}

export default main