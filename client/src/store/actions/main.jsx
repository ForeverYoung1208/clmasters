import {
  LOADER_SHOW,
  LOADER_HIDE,
  POST_PREORDER_OK,
  SAVE_PREORDER,
  SET_ERROR_MESSAGE,
  POST_ORDER_OK,
  REDIRECTION_DONE
} from "./actionTypes";
import { apiPostEntity, apiPostPreorder } from "../../shared/js/api";

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



export const postOrder = ({ masterId, preorder }) => { 
  return async (dispatch) => {
    dispatch(loaderShow('order'))
    try {
      const order = {
        ...masterId,
        clockId: preorder.clockTypeId,
        email: preorder.email,
        name: preorder.name,
        onTime: preorder.orderDateTime
      }
      const _orderResult = await apiPostEntity({
        sectionKey: 'orders',
        data: order
      })
      const orderResult = await _orderResult.json()


      console.log('[orderResult]', orderResult)
      orderResult?.id && dispatch(postOrderOk(orderResult))

    } catch (error) {
      dispatch(setErrorMessage(error))
    } finally {
      dispatch(loaderHide('order'))
    }
  }
}

const postOrderOk = (orderResult) => { 
  return {
    type: POST_ORDER_OK,
    orderResult,
    redirectUrl: '/info'
	}    
}

export const redirectionDone = () => { 
  return {
    type: REDIRECTION_DONE,
  }
}