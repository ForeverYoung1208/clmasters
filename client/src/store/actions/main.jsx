import { LOADER_SHOW, LOADER_HIDE, SET_ERROR, POST_PREORDER_OK, SAVE_PREORDER } from "./actionTypes";
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

export const setErrorMessage = (error) => {
  console.log('[error]', error)
  //...
  return {
    type: SET_ERROR,
    payload: { error }
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

