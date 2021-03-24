import {
  PREORDERS_CLEAR_MASTERS,
  PREORDERS_MEMOIZE,
  PREORDERS_POST_FULFILLED,
  PREORDERS_POST_PENDING,
  PREORDERS_POST_REJECTED,
} from '../actions/actionTypes/preorders'

const initialState = {
  preorder: null,
  foundMasters: null,
  error: null,
}

const preorders = (state = initialState, { type, payload, preorder }) => {
  switch (type) {
    case PREORDERS_MEMOIZE:
      return {
        ...state,
        preorder: preorder,
      }

    case PREORDERS_POST_FULFILLED:
      return {
        ...state,
        foundMasters: payload,
        error: null,
      }

    case PREORDERS_POST_PENDING:
      return {
        ...state,
        error: null,
      }

    case PREORDERS_POST_REJECTED:
      return {
        ...state,
        error: payload,
      }

    case PREORDERS_CLEAR_MASTERS:
      return {
        ...state,
        foundMasters: null,
      }

    default:
      return state
  }
}

export default preorders
