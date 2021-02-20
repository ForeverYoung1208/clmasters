import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostPreorder } from '../../shared/js/api/preorders'
import {
  PREORDERS_MEMOIZE,
  PREORDERS_CLEAR_MASTERS,
} from './actionTypes/preorders'

export const postPreorder = createAsyncThunk(
  'preorders/post',
  async (preorder, { rejectWithValue }) => {
    const res = await apiPostPreorder(preorder)
    const resJSON = await res.json()
    if (res.ok) {
      return resJSON
    } else {
      return rejectWithValue(resJSON)
    }
  }
)

export const memoizePreorder = (preorder) => {
  return {
    type: PREORDERS_MEMOIZE,
    preorder,
  }
}

export const forgetPreorder = () => {
  return {
    type: PREORDERS_MEMOIZE,
    preorder: null,
  }
}

export const clearFoundMasters = () => {
  return {
    type: PREORDERS_CLEAR_MASTERS,
  }
}
