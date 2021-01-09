import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCities } from '../../shared/js/api/cities'
import { loaderShow } from "./main"

export const fetchCities = createAsyncThunk('cities/fetch', async () => {
  const { cities } = await apiGetCities()
  return cities
})
  
  
// export const fetchCities = () => {
//   fetchCitiesStart()
// 	return async (dispatch) => {
//     try {
//       const { cities } = await apiGetCities()
//       dispatch(fetchCitiesOk(cities))
//     } catch (error) {
//       dispatch(fetchCitiesError())
//       dispatch(setErrorMessage(JSON.stringify(error)))
//     } finally {
//       dispatch(fetchCitiesEnd())
//     }
// 	}
// }




// const fetchCitiesOk = (cities) => {
// 	return {
//     type: CITIES_FETCH_OK,
//     cities
// 	}    
// }
