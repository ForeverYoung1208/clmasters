import { LOADER_HIDE, LOADER_SHOW } from "./actionTypes/loaders";
import { SET_ERROR_MESSAGE } from "./actionTypes/errors";
import { CLEAR_ORDERS, CLEAR_ORDER_RESULT, GET_ORDERS_OK, POST_ORDER_OK } from "./actionTypes/orders";
import { REDIRECTION_DONE, REDIRECT_START } from "./actionTypes/redirect";
import { POST_PREORDER_OK, SAVE_PREORDER } from "./actionTypes/preorders";

import { apiPostPreorder } from "../../shared/js/api/preorder";
import { apiGetEntityBy, apiPostEntity } from "../../shared/js/api/crudEntities";

export const loaderShow = (name) => {
  return {
    type: LOADER_SHOW,
    loaderName: name
	}   
}

export const loaderHide = (name) => {
	return {
    type: LOADER_HIDE,
    loaderName: name
	}     
}

export const setErrorMessage = (errorMessage) => {
  return {
    type: SET_ERROR_MESSAGE,
    errorMessage
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
    redirectUrl
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
    preorderResult
	}    
}

const savePreorder = (preorder) => { 
  return {
    type: SAVE_PREORDER,
    preorder
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

