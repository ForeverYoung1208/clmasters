const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

const cities = (state = initialState, action) => {
  let newCities = []
  switch (action.type) {
    case 'cities/fetch/fulfilled':
      return {
        ...state,
        data: [...action.payload],
        status: 'fulfilled',
        error: null,
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

    case 'cities/post/fulfilled':
      newCities = [...state.data]
      newCities.push(action.payload)
      return {
        ...state,
        data: newCities,
        status: 'fulfilled',
        error: null,
      }

    case 'cities/delete/fulfilled':
      newCities = state.data.filter((c) => +c.id !== +action.payload.cityId)
      return {
        ...state,
        data: newCities,
        status: 'fulfilled',
        error: null,
      }

    case 'cities/fetch/pending':
    case 'cities/put/pending':
    case 'cities/post/pending':
    case 'cities/delete/pending':
      return {
        ...state,
        status: 'pending',
        error: null,
      }

    case 'cities/fetch/rejected':
    case 'cities/put/rejected':
    case 'cities/post/rejected':
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
