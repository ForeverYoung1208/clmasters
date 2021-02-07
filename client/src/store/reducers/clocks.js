import {
  CLOCKS_FETCH_FULFILLED,
  CLOCKS_FETCH_PENDING,
  CLOCKS_FETCH_REJECTED,
} from '../actions/actionTypes/masters'

const initialState = {
  data: [],
  error: null,
}

const masters = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLOCKS_FETCH_FULFILLED:
      return {
        ...state,
        data: [...payload],
        error: null,
      }

    case CLOCKS_FETCH_PENDING:
      return {
        ...state,
        error: null,
      }

    case CLOCKS_FETCH_REJECTED:
      return {
        ...state,
        error: payload,
      }

    default:
      return state
  }
}

export default clocks
