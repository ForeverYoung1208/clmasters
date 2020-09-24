import { FETCH_ADMINDATA_OK } from "../actions/actionTypes";

const initialState = {
  orders: [{ name: 'order1', id:1 }, {name:'order2', id:2}],
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
