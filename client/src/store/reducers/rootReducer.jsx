import { combineReducers } from 'redux'

import voc from './voc'
import auth from './auth'
import main from './main'
import admin from './admin'

import { reducer as authFormReducer } from 'redux-form'


export default combineReducers({
  voc,
  auth,
  main,
  admin,
  form: authFormReducer
})
