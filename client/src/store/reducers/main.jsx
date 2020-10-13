import {
  LOADER_SHOW,
  LOADER_HIDE,
  POST_PREORDER_OK,
  SET_ERROR_MESSAGE,
  SAVE_PREORDER,
  POST_ORDER_OK,
  REDIRECTION_DONE,
  CLEAR_ORDER_RESULT,
  GET_ORDERS_OK,
  CLEAR_ORDERS
} from "../actions/actionTypes"

const initialState = {
  loaders:{
    voc: false,
    preorder: false
  },
  preorder: {
    //..
  },
  preorderResult: null,
  errorMessage: null
}

const main = (state = initialState, action) => { 
  const newLoaders = { ...state.loaders }
  switch (action.type) {
    
    case LOADER_SHOW:
      newLoaders[action.payload.loaderName] = true
      return {
        ...state,
        loaders: newLoaders
      }
    
    case LOADER_HIDE:
      newLoaders[action.payload.loaderName] = false
      return {
        ...state,
        loaders: newLoaders
      }
    
    case REDIRECTION_DONE:
      return {
        ...state,
        redirectUrl: null
      }

    case SAVE_PREORDER:
      return {
        ...state,
        preorder: action.payload.preorder
      }
      
    case POST_PREORDER_OK:
      return {
        ...state,
        preorderResult: action.payload.preorderResult
      }
    
    case POST_ORDER_OK:
      return {
        ...state,
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
        errorMessage: action.payload.errorMessage
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