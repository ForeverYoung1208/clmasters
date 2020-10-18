import { FETCH_VOC_OK } from "../actions/actionTypes";

const initialState = {
  cities: [],
  clocks: []
}

const voc = (state = initialState, action) => { 

  switch (action.type) {
    case FETCH_VOC_OK:
      return {
        ...state,
        ...action.voc
      };      
    default:
      return state      
  }

}

export default voc
