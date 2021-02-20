import { combineReducers } from 'redux'

// import vocabluaries from './vocabluaries'
import auth from './auth'
import main from './main'
import cities from './cities'
import masters from './masters'
import users from './users'
import orders from './orders'
import clocks from './clocks'
import preorders from './preorders'

import { reducer as formReducer } from 'redux-form'


export default combineReducers({
  // vocabluaries,
  auth,
  main,
  cities,
  masters,
  users,
  orders,
  clocks,
  preorders,
  form: formReducer
})
