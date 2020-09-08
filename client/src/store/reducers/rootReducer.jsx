import { combineReducers } from 'redux'

import voc from './voc'
import main from './main'
import { reducer as authFormReducer } from 'redux-form'


export default combineReducers({
  voc,
  main,
  form: authFormReducer
})
