const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

const cities = (state = initialState, action) => {
  let newCities=[]
  switch (action.type) {
    case 'cities/fetch/fulfilled':
      return {
        ...state,
        data: [...action.payload],
        status: 'fulfilled',
        error: null,
      }
    case 'cities/fetch/pending':
      return {
        ...state,
        status: 'pending',
        error:null,
      }
    case 'cities/fetch/rejected':
      return {
        ...state,
        status: 'error',
        error: action.payload,
      }

    case 'cities/put/fulfilled':
      const newCityIdx = state.data.findIndex(
        (city) => +city.id === +action.payload.id
      )
      newCities = [...state.data]
      newCities[newCityIdx] = action.payload
      return {
        ...state,
        data: newCities,
        status: 'fulfilled',
        error: null,
      }
    case 'cities/put/pending':
      return {
        ...state,
        status: 'pending',
        error: null,
      }
    case 'cities/put/rejected':
      return {
        ...state,
        status: 'error',
        error: action.payload,
      }
    
    case 'cities/delete/fulfilled':
      newCities = state.data.filter((c) => +c.id !== +action.payload.cityId)
      return {
        ...state,
        data: newCities,
        status: 'fulfilled',
        error: null,
      }
    case 'cities/delete/pending':
      return {
        ...state,
        status: 'pending',
        error: null,
      }
    case 'cities/delete/rejected':
      return {
        ...state,
        status: 'error',
        error: action.payload,
      }    

    default:
      return state
  }
}

export default cities
