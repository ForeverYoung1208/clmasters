import { combineReducers } from 'redux'

import vocabluaries from './vocabluaries'
import auth from './auth'
import main from './main'
// import admin from './admin'
import cities from './cities'
import masters from './masters'
import users from './users'
import orders from './orders'

import { reducer as formReducer } from 'redux-form'


export default combineReducers({
  vocabluaries,
  auth,
  main,
  // admin,
  cities,
  masters,
  users,
  orders,
  form: formReducer
})
