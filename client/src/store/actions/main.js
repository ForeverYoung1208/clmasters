import { LOADER_HIDE, LOADER_SHOW } from './actionTypes/loaders'
import { SET_ERROR_MESSAGE } from './actionTypes/errors'
import { REDIRECTION_DONE, REDIRECT_START } from './actionTypes/redirect'
import { POST_PREORDER_OK, SAVE_PREORDER } from './actionTypes/preorders'

import { apiPostPreorder } from '../../shared/js/api/preorder'

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

export const postPreorder = (preorder) => {
  return async (dispatch) => {
    dispatch(loaderShow('preorder'))
    dispatch(savePreorder(preorder))
    try {
      let preorderResult = await apiPostPreorder(preorder)
      preorderResult = await preorderResult.json()
      dispatch(postPreorderOk(preorderResult))
    } catch (error) {
      dispatch(setErrorMessage(error))
    } finally {
      dispatch(loaderHide('preorder'))
    }
  }
}

const postPreorderOk = (preorderResult) => {
  return {
    type: POST_PREORDER_OK,
    preorderResult,
  }
}

const savePreorder = (preorder) => {
  return {
    type: SAVE_PREORDER,
    preorder,
  }
}