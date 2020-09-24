import { FETCH_ADMINDATA_OK } from "../actions/actionTypes";

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
    default:
      return state      
  }

}

export default admin
