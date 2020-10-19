import { combineReducers } from 'redux'

import vocabluaries from './vocabluaries'
import auth from './auth'
import main from './main'
import admin from './admin'

import { reducer as formReducer } from 'redux-form'


export default combineReducers({
  vocabluaries,
  auth,
  main,
  admin,
  form: formReducer
})
