import { SET_ERROR_MESSAGE } from '../actions/actionTypes/errors'
import { LOADER_HIDE, LOADER_SHOW } from '../actions/actionTypes/loaders'
import { SET_PAGINATION_PAGE_SIZE } from '../actions/actionTypes/pagination'
// import {
//   PREORDERS_POST_FULFILLED,
//   PREORDERS_POST_PENDING,
//   PREORDERS_POST_REJECTED
// } from '../actions/actionTypes/preorders'
import {
  REDIRECTION_DONE,
  REDIRECT_START,
} from '../actions/actionTypes/redirect'

const initialState = {
  loaders: {
    vocabluaries: false,
    preorder: false,
  },
  paginationPageSize: 5,

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

    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      }
    
    case SET_PAGINATION_PAGE_SIZE:
      return {
        ...state,
        paginationPageSize: action.paginationPageSize,
      }

    default:
      return state
  }
}

export default main
