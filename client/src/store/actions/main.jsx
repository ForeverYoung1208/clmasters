import {
  LOADER_SHOW,
  LOADER_HIDE,
  POST_PREORDER_OK,
  SAVE_PREORDER,
  SET_ERROR_MESSAGE,
  POST_ORDER_OK,
  REDIRECTION_DONE,
  CLEAR_ORDER_RESULT,
  GET_ORDERS_OK,
  CLEAR_ORDERS
} from "./actionTypes";
import { apiGetEntityBy, apiPostEntity, apiPostPreorder } from "../../shared/js/api";

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

export const redirectionDone = () => { 
  return {
    type: REDIRECTION_DONE,
  }
}

export const clearOrderResult = () => {
  return {
    type: CLEAR_ORDER_RESULT
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

export const getOrdersBy = (params) => {
  return async (dispatch) => {
    dispatch(loaderShow('order'))
    try {
      const _orders = await apiGetEntityBy({
        sectionKey: 'orders',
        params
      })
      const orders = await _orders.json()
      dispatch(getOrdersOk(orders))
    } catch (error) {
      dispatch(setErrorMessage(error))            
    } finally { 
      dispatch(loaderHide('order'))
    }
  }
}

const getOrdersOk = (orders) => { 
  return {
    type: GET_ORDERS_OK,
    orders
	}    
}

export const clearOrders = () => {
  return {
    type: CLEAR_ORDERS
  }
}

