import {
  FETCH_ADMINDATA_OK,
  API_ADMINDATA_ERROR,
  POST_ADMINDATA_OK,
  DELETE_ADMINDATA_ERROR,
  DELETE_ADMINDATA_OK,
} from './actionTypes'
import { loaderShow, loaderHide } from './main.jsx'
import  { apiDeleteEntity, apiGetAdmindata, apiPostEntity, apiPutEntity } from '../../shared/js/api'

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

const apiAdmindataError = (error) => {
  console.log('[error]', error)
  return {
    type: API_ADMINDATA_ERROR,
    error
  }
}


export const admindataChanged = ({ sectionKey, data } , setEdittingItemId) => {
  
  return async (dispatch) => {
    dispatch(loaderShow('admindata'))
    try {
      let res
      data.id
        ? res = await apiPutEntity({ sectionKey, data }) // id is present - updating
        : res = await apiPostEntity({ sectionKey, data }) //id isn't present - creating
      
      const resData = await res.json()

      res.status === 200
        ? dispatch(postAdmindataOk({ sectionKey, data:resData }))
        : dispatch(apiAdmindataError({ message: 'error with saving data' }))
      
    } catch (error) {
      dispatch(apiAdmindataError(error))
    } finally { 
      dispatch(loaderHide('admindata'))
      setEdittingItemId(null)
    }
  }
}

const postAdmindataOk = ({ sectionKey, data }) => {
  return {
    type: POST_ADMINDATA_OK,
    sectionKey,
    data
  } 
}

export const admindataDelete = ({ sectionKey, id }) => {
  return async(dispatch) => {
    dispatch(loaderShow('admindata'))
    try {
      const res = await apiDeleteEntity({ sectionKey, id })
      res.status === 200
        ? dispatch(deleteAdmindataOk({ sectionKey, id }))
        : dispatch(apiAdmindataError({ message: 'error with deleting data' }))
    } catch (error) {
      dispatch(apiAdmindataError(error))      
    } finally { 
      dispatch(loaderHide('admindata'))
    }
  }
}

const deleteAdmindataOk = ({ sectionKey, id }) => {
  
  return {
    type: DELETE_ADMINDATA_OK,
    sectionKey,
    id
  } 
}
