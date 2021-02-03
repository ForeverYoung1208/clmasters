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
  switch (type) {
    case CITIES_FETCH_FULFILLED:
      return {
        ...state,
        data: [...payload],
        error: null,
      }

    case CITIES_PUT_FULFILLED:
      const citiesAfterPut = state.data.map((city) => {
        if (+city.id === +payload.id) return payload
        return city
      })
      return {
        ...state,
        data: citiesAfterPut,
        error: null,
      }

    case CITIES_POST_FULFILLED:
      const citiesAfterPost = [...state.data, payload]
      return {
        ...state,
        data: citiesAfterPost,
        error: null,
      }

    case CITIES_DELETE_FULFILLED:
      const citiesAfterDelete = state.data.filter((c) => +c.id !== +payload.cityId)
      return {
        ...state,
        data: citiesAfterDelete,
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
