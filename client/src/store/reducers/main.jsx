import { LOADER_SHOW, LOADER_HIDE, POST_PREORDER_OK, SET_ERROR_MESSAGE, SAVE_PREORDER, POST_ORDER_OK, REDIRECTION_DONE } from "../actions/actionTypes"

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
    
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      }
    
    default:
      return state      
  }
}

export default main