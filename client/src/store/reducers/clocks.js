import {
  CLOCKS_FETCH_FULFILLED,
  CLOCKS_FETCH_PENDING,
  CLOCKS_FETCH_REJECTED,
} from '../actions/actionTypes/clocks'

const initialState = {
  data: [],
  error: null,
}

const clocks = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLOCKS_FETCH_FULFILLED:
      return {
        ...state,
        data: [...payload.data],
        totalCount: payload.totalCount,
        currentPage: payload.currentPage,
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
