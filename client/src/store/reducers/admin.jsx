import {
  DELETE_ADMINDATA_OK,
  FETCH_ADMINDATA_OK,
  POST_ADMINDATA_OK
} from "../actions/actionTypes/admindata";

const initialState = {
  orders: [],
  masters: [],
  users: [],
  cities: [],
}

const admin = (state = initialState, action) => { 

  switch (action.type) {  
    case FETCH_ADMINDATA_OK:
      return {
        ...state,
        ...action.admindata
      };

    // case API_ADMINDATA_ERROR:
    //   return {
    //     ...state,
    //     submissionError: action.submissionError,
    //     unknownError: action.unknownError
    //   };
    
    // case CLEAR_API_ADMINDATA_ERROR:
    //   return {
    //     ...state,
    //     submissionError: null,
    //     unknownError: null
    //   };
    
    case POST_ADMINDATA_OK:
      const newEntityIdx = state[action.sectionKey].findIndex(entity => +entity.id === +action.data.id)
      const newSectionItems = state[action.sectionKey]
      newEntityIdx === -1
        ? newSectionItems.push(action.data)
        : newSectionItems[newEntityIdx] = action.data
      return {
        ...state,
        [action.sectionKey]: newSectionItems
      }
    
    case DELETE_ADMINDATA_OK:
      const filteredSectionItems = state[action.sectionKey]
        .filter( item  => +item.id !== +action.id )
      return {
        ...state,
        [action.sectionKey]: filteredSectionItems
      }
    

    
    default:
      return state      
  }

}

export default admin
