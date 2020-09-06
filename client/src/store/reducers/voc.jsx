import { FETCH_VOC_OK } from "../actions/actionTypes";

const initialState = {
  cities: [],
  clocks: []
}

const voc = (state = initialState, action) => { 

  switch (action.type) {
    case FETCH_VOC_OK:

      console.log('[action]', action)
      let a = {
        ...state,
        ...action.payload.voc
      }
      console.log('[a]', a)      
      
      return {
        ...state,
        ...action.payload.voc
      };      
    default:
      return state      
  }

}

export default voc
