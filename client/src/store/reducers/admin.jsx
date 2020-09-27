import {
  FETCH_ADMINDATA_OK,
  POST_ADMINDATA_ERROR,
  POST_ADMINDATA_OK,
} from "../actions/actionTypes";

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
        ...action.payload.admindata
      };
    
    case POST_ADMINDATA_OK:
      const newEntityIdx = state[action.sectionKey].findIndex(entity => entity.id == action.data.id)
      const newSectionItems = state[action.sectionKey]
      newEntityIdx === -1
        ? newSectionItems.push(action.data)
        : newSectionItems[newEntityIdx] = action.data
      return {
        ...state,
        [action.sectionKey]: newSectionItems
      }
    
    case POST_ADMINDATA_ERROR:
      console.log(`[${POST_ADMINDATA_ERROR} action.error]`, action.error)
      return state
    
    default:
      return state      
  }

}

export default admin
