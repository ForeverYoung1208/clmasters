import { FETCH_ADMINDATA_OK, UPDATE_ADMINDATA_ORDER_START } from "../actions/actionTypes";

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
    case UPDATE_ADMINDATA_ORDER_START:
      const newOrderIdx = state.orders.findIndex(o => o.id === action.order.id)
      const newOrders = state.orders
      newOrders[newOrderIdx] = action.order

      return {
        ...state,
        orders: newOrders
      }
    default:
      return state      
  }

}

export default admin
