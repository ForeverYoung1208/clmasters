import { FETCH_VOCABLUARIES_OK } from "../actions/actionTypes";

const initialState = {
  cities: [],
  clocks: []
}

const vocabluaries = (state = initialState, action) => { 

  switch (action.type) {
    case FETCH_VOCABLUARIES_OK:
      return {
        ...state,
        ...action.vocabluaries
      };      
    default:
      return state      
  }

}

export default vocabluaries
