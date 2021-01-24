import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  apiDeleteCity,
  apiGetCities,
  apiPostCity,
  apiPutCity,
} from '../../shared/js/api/cities'
import { setErrorMessage } from './main'


export const fetchCities = createAsyncThunk('cities/fetch', async () => {
  const cities = await apiGetCities()
  return cities
})

export const putCity = createAsyncThunk(
  'cities/put',
  async ({ city, setEditingCityId }, { rejectWithValue }) => {
    const res = await apiPutCity({ ...city, name: city.name.trim() })
    if (res.ok) {
      setEditingCityId && setEditingCityId(null)
      return city
    } else {
      const apiError = await res.json()
      return rejectWithValue(apiError)
    }
  }
)

export const postCity = createAsyncThunk(
  'cities/post',
  async ({ city, setIsAddingCity }, { rejectWithValue }) => {
    const res = await apiPostCity({ ...city, name: city.name.trim() })
    if (res.ok) {
      const resJSON = await res.json()
      setIsAddingCity && setIsAddingCity(false)
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
