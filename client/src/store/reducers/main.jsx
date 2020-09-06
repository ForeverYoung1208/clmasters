import { LOADER_SHOW, LOADER_HIDE, POST_PREORDER_OK, SET_ERROR, SAVE_PREORDER } from "../actions/actionTypes"

const initialState = {
  loaders:{
    voc: false,
    preorder: false
  },
  preorder: {
    //..
  },
  preorderResult: {
    //..
  },
  error: null
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
    
    case POST_PREORDER_OK:
      return {
        ...state,
        preorderResult: action.payload.preorderResult
      }
    case SAVE_PREORDER:
      return {
        state,
        preorder: action.payload.preorder
      }
    
    case SET_ERROR:
      return {
        ...state,
        error: action.payload.error
      }
    
    default:
      return state      
  }
}

export default main