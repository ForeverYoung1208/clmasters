import {
  CITIES_DELETE_FULFILLED,
  CITIES_DELETE_PENDING,
  CITIES_DELETE_REJECTED,
  CITIES_FETCH_FULFILLED,
  CITIES_FETCH_PENDING,
  CITIES_FETCH_REJECTED,
  CITIES_POST_FULFILLED,
  CITIES_POST_PENDING,
  CITIES_POST_REJECTED,
  CITIES_PUT_FULFILLED,
  CITIES_PUT_PENDING,
  CITIES_PUT_REJECTED,
} from '../actions/actionTypes/cities'

const initialState = {
  data: [],
  error: null,
}

const cities = (state = initialState, { type, payload }) => {
  let newCities = []
  switch (type) {
    case CITIES_FETCH_FULFILLED:
      return {
        ...state,
        data: [...payload],
        error: null,
      }

    case CITIES_PUT_FULFILLED:
      const newCityIdx = state.data.findIndex(
        (city) => +city.id === +payload.id
      )
      newCities = [...state.data]
      newCities[newCityIdx] = payload
      return {
        ...state,
        data: newCities,
        error: null,
      }

    case CITIES_POST_FULFILLED:
      newCities = [...state.data]
      newCities.push(payload)
      return {
        ...state,
        data: newCities,
        error: null,
      }

    case CITIES_DELETE_FULFILLED:
      newCities = state.data.filter((c) => +c.id !== +payload.cityId)
      return {
        ...state,
        data: newCities,
        error: null,
      }

    case CITIES_FETCH_PENDING:
    case CITIES_PUT_PENDING:
    case CITIES_POST_PENDING:
    case CITIES_DELETE_PENDING:
      return {
        ...state,
        error: null,
      }

    case CITIES_FETCH_REJECTED:
    case CITIES_PUT_REJECTED:
    case CITIES_POST_REJECTED:
    case CITIES_DELETE_REJECTED:
      return {
        ...state,
        error: payload,
      }

    default:
      return state
  }
}

export default cities
