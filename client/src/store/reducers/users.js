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
  switch (type) {
    case USERS_FETCH_FULFILLED:
      return {
        ...state,
        data: [...payload],
        error: null,
      }

    case USERS_PUT_FULFILLED:
      
      const usersAfterPut = state.data.map((user) => {
        if (+user.id === +payload.id) return payload
        return user
      })
      return {
        ...state,
        data: usersAfterPut,
        error: null,
      }

    case USERS_POST_FULFILLED:
      const usersAfterPost = [...state.data, payload]
      return {
        ...state,
        data: usersAfterPost,
        error: null,
      }

    case USERS_DELETE_FULFILLED:
      const usersAfterDelete = state.data.filter((c) => +c.id !== +payload.userId)
      return {
        ...state,
        data: usersAfterDelete,
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
