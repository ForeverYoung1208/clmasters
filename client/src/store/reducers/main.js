import { SET_ERROR_MESSAGE } from '../actions/actionTypes/errors'
import { LOADER_HIDE, LOADER_SHOW } from '../actions/actionTypes/loaders'
import {
  POST_PREORDER_OK,
  SAVE_PREORDER,
} from '../actions/actionTypes/preorders'
import {
  REDIRECTION_DONE,
  REDIRECT_START,
} from '../actions/actionTypes/redirect'

const initialState = {
  loaders: {
    vocabluaries: false,
    preorder: false,
  },
  preorder: {},
  preorderResult: null,
  errorMessage: null,
}

const main = (state = initialState, action) => {
  const newLoaders = { ...state.loaders }
  switch (action.type) {
    case LOADER_SHOW:
      newLoaders[action.loaderName] = true
      return {
        ...state,
        loaders: newLoaders,
      }

    case LOADER_HIDE:
      newLoaders[action.loaderName] = false
      return {
        ...state,
        loaders: newLoaders,
      }

    case REDIRECT_START:
      return {
        ...state,
        redirectUrl: action.redirectUrl,
      }

    case REDIRECTION_DONE:
      return {
        ...state,
        redirectUrl: null,
      }

    case SAVE_PREORDER:
      return {
        ...state,
        preorder: action.preorder,
      }

    case POST_PREORDER_OK:
      return {
        ...state,
        preorderResult: action.preorderResult,
      }

    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      }

    default:
      return state
  }
}

export default main
