import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  apiDeleteUser,
  apiGetUsers,
  apiPostUser,
  apiPutUser,
} from '../../shared/js/api/users'
import { setErrorMessage } from './main'


export const fetchUsers = createAsyncThunk('users/fetch', async (queryObject) => {
  let queryStr=''
  for (const key in queryObject) {
    queryStr+=key+'='+queryObject[key]+'&'
  }
  const users = await apiGetUsers(queryStr)
  return users
})

export const putUser = createAsyncThunk(
  'users/put',
  async ({ user, setEditingUserId }, { rejectWithValue }) => {
    const res = await apiPutUser({ ...user, name: user.name.trim() })
    if (res.ok) {
      const newUser = await res.json()
      setEditingUserId && setEditingUserId(null)
      return newUser
    } else {
      const apiError = await res.json()
      return rejectWithValue(apiError)
    }
  }
)

export const postUser = createAsyncThunk(
  'users/post',
  async ({ user, setIsAddingUser }, { rejectWithValue }) => {
    const res = await apiPostUser({ ...user, name: user.name.trim() })
    if (res.ok) {
      const resJSON = await res.json()
      setIsAddingUser && setIsAddingUser(false)
      return resJSON
    } else {
      const apiError = await res.json()
      return rejectWithValue(apiError)
    }
  }
)

export const deleteUser = createAsyncThunk(
  'users/delete',
  async ({ userId, setDeletingUserId }, { dispatch, rejectWithValue }) => {
    const res = await apiDeleteUser(userId)
    if (res.ok) {
      setDeletingUserId && setDeletingUserId(null)
      return { userId }
    } else {
      const apiError = await res.json()
      dispatch (setErrorMessage(JSON.stringify(apiError)))
      return rejectWithValue(apiError)
    }
  }
)
