const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

const cities = (state = initialState, action) => {
  switch (action.type) {
    case 'cities/fetch/fulfilled':
      return {
        ...state,
        data: [...action.payload],
        status: 'fulfilled',
      }
    case 'cities/fetch/pending':
      return {
        ...state,
        data: [],
        status: 'pending',
      }

    case 'cities/put/fulfilled':
      const newCityIdx = state.data.findIndex(
        (city) => +city.id === +action.payload.id
      )
      const newCities = [...state.data]
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

    default:
      return state
  }
}

export default cities
