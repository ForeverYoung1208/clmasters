import { LOADER_SHOW, LOADER_HIDE, POST_PREORDER_OK, SAVE_PREORDER, SET_ERROR_MESSAGE } from "./actionTypes";
import { apiPostPreorder } from "../../shared/js/api";

export const loaderShow = (name) => {
  return {
    type: LOADER_SHOW,
    payload: { loaderName: name }
	}   
}

export const loaderHide = (name) => {
	return {
    type: LOADER_HIDE,
    payload: { loaderName: name }
	}     
}

export const setErrorMessage = (errorMessage) => {
  return {
    type: SET_ERROR_MESSAGE,
    payload: { errorMessage }
	}  
}

export const clearErrorMessage = () => {
  return {
    type: SET_ERROR_MESSAGE,
    payload: {}
  }
  
}

export const postPreorder = (preorder) => { 
  return async (dispatch) => {
    dispatch(loaderShow('preorder'))
    dispatch(savePreorder(preorder))
    try {
      const { preorderResult } = await apiPostPreorder(preorder)
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
    payload: { preorderResult }
	}    
}

const savePreorder = (preorder) => { 
  return {
    type: SAVE_PREORDER,
    payload: { preorder }
  }
}

