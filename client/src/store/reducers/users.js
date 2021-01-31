import {
  USERS_DELETE_FULFILLED,
  USERS_DELETE_PENDING,
  USERS_DELETE_REJECTED,
  USERS_FETCH_FULFILLED,
  USERS_FETCH_PENDING,
  USERS_FETCH_REJECTED,
  USERS_POST_FULFILLED,
  USERS_POST_PENDING,
  USERS_POST_REJECTED,
  USERS_PUT_FULFILLED,
  USERS_PUT_PENDING,
  USERS_PUT_REJECTED,
} from '../actions/actionTypes/users'

const initialState = {
  data: [],
  error: null,
}

const users = (state = initialState, { type, payload }) => {
  let newUsers = []
  switch (type) {
    case USERS_FETCH_FULFILLED:
      return {
        ...state,
        data: [...payload],
        error: null,
      }

    case USERS_PUT_FULFILLED:
      const newUserIdx = state.data.findIndex(
        (user) => +user.id === +payload.id
      )
      newUsers = [...state.data]
      newUsers[newUserIdx] = payload
      return {
        ...state,
        data: newUsers,
        error: null,
      }

    case USERS_POST_FULFILLED:
      newUsers = [...state.data]
      newUsers.push(payload)
      return {
        ...state,
        data: newUsers,
        error: null,
      }

    case USERS_DELETE_FULFILLED:
      newUsers = state.data.filter((c) => +c.id !== +payload.userId)
      return {
        ...state,
        data: newUsers,
        error: null,
      }

    case USERS_FETCH_PENDING:
    case USERS_PUT_PENDING:
    case USERS_POST_PENDING:
    case USERS_DELETE_PENDING:
      return {
        ...state,
        error: null,
      }

    case USERS_FETCH_REJECTED:
    case USERS_PUT_REJECTED:
    case USERS_POST_REJECTED:
    case USERS_DELETE_REJECTED:
      return {
        ...state,
        error: payload,
      }

    default:
      return state
  }
}

export default users
