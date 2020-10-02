import {
  FETCH_ADMINDATA_OK,
  API_ADMINDATA_ERROR,
  POST_ADMINDATA_OK,
  DELETE_ADMINDATA_OK,
  CLEAR_API_ADMINDATA_ERROR
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

export const apiAdmindataError = ({ unknownError, submissionError }) => {
  return {
    type: API_ADMINDATA_ERROR,
    unknownError,
    submissionError
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
        : dispatch(apiAdmindataError({ submissionError: { sectionKey, ...resData } }))
      
    } catch (error) {
      dispatch(apiAdmindataError({ unknownError: error }))
    } finally { 
      dispatch(loaderHide('admindata'))
      setEdittingItemId(null)
    }

  }
}

export const admindataDelete = ({ sectionKey, id }) => {
  return async(dispatch) => {
    dispatch(loaderShow('admindata'))
    try {
      
      const res = await apiDeleteEntity({ sectionKey, id })
      res.status === 200
        ? dispatch(deleteAdmindataOk({ sectionKey, id }))
        : dispatch(apiAdmindataError({
          submissionError: {
            sectionKey, errors: [{ msg: `Can not delete item with id ${id}` }]
          }
        }))
      
    } catch (error) {
      dispatch(apiAdmindataError({ unknownError: error }))      
    } finally { 
      dispatch(loaderHide('admindata'))
    }
  }
} 

export const clearAdmindataApiError = () => {
  return {
    type: CLEAR_API_ADMINDATA_ERROR,
  }
}