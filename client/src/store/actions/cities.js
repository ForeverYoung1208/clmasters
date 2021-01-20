import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  apiDeleteCity,
  apiGetCities,
  apiPostCity,
  apiPutCity,
} from '../../shared/js/api/cities'
import { setErrorMessage } from './main'


export const fetchCities = createAsyncThunk('cities/fetch', async () => {
  const { cities } = await apiGetCities()
  return cities
})

export const putCitiy = createAsyncThunk(
  'cities/put',
  async ({ city, setEditingCityId }, { dispatch, rejectWithValue }) => {
    const res = await apiPutCity(city)
    if (res.ok) {
      setEditingCityId && setEditingCityId(null)
      return city
    } else {
      const apiError = await res.json()
      return rejectWithValue(apiError)
    }
  }
)

export const postCitiy = createAsyncThunk(
  'cities/post',
  async ({ city, setAddingCityId }, { dispatch, rejectWithValue }) => {
    const res = await apiPostCity(city)
    if (res.ok) {
      const resJSON = await res.json()
      setAddingCityId && setAddingCityId(null)
      return resJSON
    } else {
      const apiError = await res.json()
      return rejectWithValue(apiError)
    }
  }
)

export const deleteCity = createAsyncThunk(
  'cities/delete',
  async ({ cityId, setDeletingCityId }, { dispatch, rejectWithValue }) => {
    const res = await apiDeleteCity(cityId)
    if (res.ok) {
      setDeletingCityId && setDeletingCityId(null)
      return { cityId }
    } else {
      const apiError = await res.json()
      dispatch (setErrorMessage(JSON.stringify(apiError)))
      return rejectWithValue(apiError)
    }
  }
)
