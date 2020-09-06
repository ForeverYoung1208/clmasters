import { combineReducers } from 'redux'

import vocReducer from './vocReducer'
import mainReducer from './mainReducer'

export default combineReducers({
  voc: vocReducer,
  main: mainReducer,
})
