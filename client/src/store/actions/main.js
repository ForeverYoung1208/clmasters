import { LOADER_HIDE, LOADER_SHOW } from './actionTypes/loaders'
import { SET_ERROR_MESSAGE } from './actionTypes/errors'
import { REDIRECTION_DONE, REDIRECT_START, SET_LAST_ADMIN_TAB } from './actionTypes/redirect'
import { SET_PAGINATION_PAGE_SIZE } from './actionTypes/pagination'

export const loaderShow = (name) => {
  return {
    type: LOADER_SHOW,
    loaderName: name,
  }
}

export const loaderHide = (name) => {
  return {
    type: LOADER_HIDE,
    loaderName: name,
  }
}

export const setErrorMessage = (errorMessage) => {
  return {
    type: SET_ERROR_MESSAGE,
    errorMessage,
  }
}

export const clearErrorMessage = () => {
  return {
    type: SET_ERROR_MESSAGE,
  }
}

export const redirectionDone = () => {
  return {
    type: REDIRECTION_DONE,
  }
}

export const redirectTo = (redirectUrl) => {
  return {
    type: REDIRECT_START,
    redirectUrl,
  }
}

export const setPaginationPageSize = (paginationPageSize) => {
  return {
    type: SET_PAGINATION_PAGE_SIZE,
    paginationPageSize,
  }  
}

export const rememberSelectedAdminTab = (lastSelectedAdminTab) => {
  return {
    type: SET_LAST_ADMIN_TAB,
    lastSelectedAdminTab,
  }

}
