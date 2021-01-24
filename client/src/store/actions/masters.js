import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  apiDeleteMaster,
  apiGetMasters,
  apiPostMaster,
  apiPutMaster,
} from '../../shared/js/api/masters'
import { setErrorMessage } from './main'


export const fetchMasters = createAsyncThunk('masters/fetch', async () => {
  const masters = await apiGetMasters()
  return masters
})

export const putMaster = createAsyncThunk(
  'masters/put',
  async ({ master, setEditingMasterId }, { rejectWithValue }) => {
    const res = await apiPutMaster({ ...master, name: master.name.trim() })
    if (res.ok) {
      
TODO: implement cityName update at masters state 
when it has changed.
now it updtes only cityId
      
      setEditingMasterId && setEditingMasterId(null)
      return master
    } else {
      const apiError = await res.json()
      return rejectWithValue(apiError)
    }
  }
)

export const postMaster = createAsyncThunk(
  'masters/post',
  async ({ master, setIsAddingMaster }, { rejectWithValue }) => {
    const res = await apiPostMaster({ ...master, name: master.name.trim() })
    if (res.ok) {
      const resJSON = await res.json()
      setIsAddingMaster && setIsAddingMaster(false)
      return resJSON
    } else {
      const apiError = await res.json()
      return rejectWithValue(apiError)
    }
  }
)

export const deleteMaster = createAsyncThunk(
  'masters/delete',
  async ({ masterId, setDeletingMasterId }, { dispatch, rejectWithValue }) => {
    const res = await apiDeleteMaster(masterId)
    if (res.ok) {
      setDeletingMasterId && setDeletingMasterId(null)
      return { masterId }
    } else {
      const apiError = await res.json()
      dispatch (setErrorMessage(JSON.stringify(apiError)))
      return rejectWithValue(apiError)
    }
  }
)
