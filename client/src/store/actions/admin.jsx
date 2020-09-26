import {
  FETCH_ADMINDATA_OK,
  FETCH_ADMINDATA_ERROR,
  UPDATE_ADMINDATA_ORDER_START
} from './actionTypes'
import { loaderShow, loaderHide } from './main.jsx'
import  { apiGetAdmindata } from '../../shared/js/api'

export const fetchAdmindata = () => {
	return async (dispatch) => {
		dispatch(loaderShow('admindata'))
    try {
      const { admindata } = await apiGetAdmindata()
      dispatch(fetchAdmindataOk(admindata))
    } catch (e) {
      dispatch(fetchAdmindataError(e))
    } finally {
      dispatch(loaderHide('admindata'))
    }
	}
}


const fetchAdmindataOk = (admindata) => {
	return {
    type: FETCH_ADMINDATA_OK,
    payload: { admindata }
	}    
}

const fetchAdmindataError = (error) => {
  console.log('[error]', error)
  return {
    type: FETCH_ADMINDATA_ERROR
  }
}

export const admindataOrderChanged = (order) => {
  return {
    type: UPDATE_ADMINDATA_ORDER_START,
    order
  }
}