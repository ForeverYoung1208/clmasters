import {
  MASTERS_DELETE_FULFILLED,
  MASTERS_DELETE_PENDING,
  MASTERS_DELETE_REJECTED,
  MASTERS_FETCH_FULFILLED,
  MASTERS_FETCH_PENDING,
  MASTERS_FETCH_REJECTED,
  MASTERS_POST_FULFILLED,
  MASTERS_POST_PENDING,
  MASTERS_POST_REJECTED,
  MASTERS_PUT_FULFILLED,
  MASTERS_PUT_PENDING,
  MASTERS_PUT_REJECTED,
} from '../actions/actionTypes/masters'

const initialState = {
  data: [],
  error: null,
}

const masters = (state = initialState, { type, payload }) => {
  switch (type) {
    case MASTERS_FETCH_FULFILLED:
      return {
        ...state,
        data: [...payload.data],
        totalCount: payload.totalCount,
        currentPage: payload.currentPage,
        error: null,
      }

    case MASTERS_PUT_FULFILLED:
      const mastersAfterPut = state.data.map((master) => {
        if (+master.id === +payload.id) return payload
        return master
      })
      return {
        ...state,
        data: mastersAfterPut,
        error: null,
      }

    case MASTERS_POST_FULFILLED:
      const mastersAfterPost = [...state.data, payload]
      return {
        ...state,
        data: mastersAfterPost,
        error: null,
      }

    case MASTERS_DELETE_FULFILLED:
      const mastersAfterDelete = state.data.filter((c) => +c.id !== +payload.masterId)
      return {
        ...state,
        data: mastersAfterDelete,
        error: null,
      }

    case MASTERS_FETCH_PENDING:
    case MASTERS_PUT_PENDING:
    case MASTERS_POST_PENDING:
    case MASTERS_DELETE_PENDING:
      return {
        ...state,
        error: null,
      }

    case MASTERS_FETCH_REJECTED:
    case MASTERS_PUT_REJECTED:
    case MASTERS_POST_REJECTED:
    case MASTERS_DELETE_REJECTED:
      return {
        ...state,
        error: payload,
      }

    default:
      return state
  }
}

export default masters
