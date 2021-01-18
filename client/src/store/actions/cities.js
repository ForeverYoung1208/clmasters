import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCities, apiPutCity } from '../../shared/js/api/cities'

export const fetchCities = createAsyncThunk('cities/fetch', async () => {
  const { cities } = await apiGetCities()
  return cities
})

export const putCitiy = createAsyncThunk(
  'cities/put',
  async ({ city, setIsDialogOpen }, {dispatch, rejectWithValue }) => {
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
