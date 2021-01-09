import { CITIES_FETCH_OK } from "../actions/actionTypes/cities";

const initialState = {
  data: [],
  status: 'idle',
  error: null
}

const cities = (state = initialState, action) => { 
  console.log('[action]', action)

  switch (action.type) {  
    case 'cities/fetch/fulfilled':
      return {
        ...state,
        data: [ ...action.payload ],
        status: 'fulfilled'
      };
    case 'cities/fetch/pending':
      return {
        ...state,
        data: [],
        status: 'pending'
      }
    default:
      return state      
  }

}

export default cities
