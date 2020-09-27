import {
  FETCH_ADMINDATA_OK,
  FETCH_ADMINDATA_ERROR,
  POST_ADMINDATA_ERROR,
  POST_ADMINDATA_OK
} from './actionTypes'
import { loaderShow, loaderHide } from './main.jsx'
import  { apiGetAdmindata, apiPostEntity } from '../../shared/js/api'

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


export const admindataChanged = ({ sectionKey, data } , setEdittingItemId) => {
  
  return async (dispatch) => {
    dispatch(loaderShow('admindata'))
    try {
      const res = await apiPostEntity({ sectionKey, data })
      res === 200
        ? dispatch(postAdmindataOk({ sectionKey, data }))
        : dispatch(postAdmindataError({ message: 'error with saving data' }))
    } catch (error) {
      dispatch(postAdmindataError(error))
    } finally { 
      dispatch(loaderHide('admindata'))
      setEdittingItemId(null)
    }

  }
}

const postAdmindataOk = ({ sectionKey, data}) => {
  return {
    type: POST_ADMINDATA_OK,
    sectionKey,
    data
  } 
}

const postAdmindataError = (error) => { 
  return {
    type: POST_ADMINDATA_ERROR,
    error
  }
}