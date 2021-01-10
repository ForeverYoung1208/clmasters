import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCities, apiPutCity } from '../../shared/js/api/cities'
import { loaderShow, setErrorMessage } from './main'

export const fetchCities = createAsyncThunk('cities/fetch', async () => {
  const { cities } = await apiGetCities()
  return cities
})

export const putCitiy = createAsyncThunk(
  'cities/put',
  async ({ city, setIsDialogOpen }, {dispatch, rejectWithValue }) => {
    const res = await apiPutCity(city)
    if (res.ok) {
      dispatch(setErrorMessage(''))
      setIsDialogOpen && setIsDialogOpen(false)
      return city
    } else {
      const apiError = await res.json()
      console.log('[apiError]', apiError)
      dispatch(setErrorMessage(JSON.stringify(apiError)))
      return rejectWithValue(apiError)
    }
  }
)
