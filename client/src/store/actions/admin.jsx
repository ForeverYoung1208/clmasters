import {
  FETCH_ADMINDATA_OK,
  API_ADMINDATA_ERROR,
  POST_ADMINDATA_OK,
  DELETE_ADMINDATA_OK,
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
      dispatch(apiAdmindataError(e))
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

export const apiAdmindataError = (error) => {
  console.log('[error]', error)
  return {
    type: API_ADMINDATA_ERROR,
    error
  }
}

export const postAdmindataOk = ({ sectionKey, data }) => {
  return {
    type: POST_ADMINDATA_OK,
    sectionKey,
    data
  } 
}

export const deleteAdmindataOk = ({ sectionKey, id }) => {
  
  return {
    type: DELETE_ADMINDATA_OK,
    sectionKey,
    id
  } 
}
