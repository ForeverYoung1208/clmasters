import {
  DELETE_ADMINDATA_OK,
  FETCH_ADMINDATA_OK,
  POST_ADMINDATA_OK
} from './actionTypes/admindata'

import { loaderShow, loaderHide, setErrorMessage } from './main'

import { apiGetAdmindata } from '../../shared/js/api/adminData'
import { apiDeleteEntity, apiPostEntity, apiPutEntity } from '../../shared/js/api/crudEntities'
  


export const fetchAdmindata = () => {
	return async (dispatch) => {
		dispatch(loaderShow('admindata'))
    try {
      const { admindata } = await apiGetAdmindata()
      dispatch(fetchAdmindataOk(admindata))
    } catch (error) {
      dispatch(setErrorMessage(JSON.stringify(error)))
    } finally {
      dispatch(loaderHide('admindata'))
    }
	}
}

const fetchAdmindataOk = (admindata) => {
	return {
    type: FETCH_ADMINDATA_OK,
    admindata
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

      // res.status === 200
      res.ok
        ? dispatch(postAdmindataOk({ sectionKey, data:resData }))
        : dispatch(setErrorMessage(JSON.stringify(resData)))
      
    } catch (error) {
      dispatch(setErrorMessage(JSON.stringify(error)))
    } finally { 
      dispatch(loaderHide('admindata'))
      setEdittingItemId(null)
    }

  }
}

export const admindataDelete = ({ sectionKey, id }) => {
  return async(dispatch) => {
    dispatch(loaderShow('admindata'))
    let resData = `Error with deletion item with id:${id}`
    try {
      
      const res = await apiDeleteEntity({ sectionKey, id })

      if (res.status === 204) {
        dispatch(deleteAdmindataOk({ sectionKey, id }))
      } else {
        resData = await res.json()
        dispatch(setErrorMessage(JSON.stringify(resData)))
      }
      
    } catch (error) {
      dispatch(setErrorMessage(JSON.stringify(error)))      
    } finally { 
      dispatch(loaderHide('admindata'))
    }
  }
} 

