import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  apiDeleteCity,
  apiGetCities,
  apiPutCity,
} from '../../shared/js/api/cities'
import { setErrorMessage } from './main'


export const fetchCities = createAsyncThunk('cities/fetch', async () => {
  const { cities } = await apiGetCities()
  return cities
})

export const putCitiy = createAsyncThunk(
  'cities/put',
  async ({ city, setIsDialogOpen }, { dispatch, rejectWithValue }) => {
    dispatch(setErrorMessage(''))
    const res = await apiPutCity(city)
    if (res.ok) {
      setIsDialogOpen && setIsDialogOpen(false)
      return city
    } else {
      const apiError = await res.json()
      return rejectWithValue(apiError)
    }
  }
)

export const deleteCity = createAsyncThunk(
  'cities/delete',
  async ({ cityId, setIsDialogOpen }, { dispatch, rejectWithValue }) => {
    dispatch(setErrorMessage(''))
    const res = await apiDeleteCity(cityId)
    if (res.ok) {
      setIsDialogOpen && setIsDialogOpen(false)
      return { cityId }
    } else {
      const apiError = await res.json()
      dispatch (setErrorMessage(JSON.stringify(apiError)))
      return rejectWithValue(apiError)
    }
  }
)
