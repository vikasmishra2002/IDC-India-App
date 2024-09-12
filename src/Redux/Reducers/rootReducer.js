import { combineReducers } from 'redux';
import authReducer from './authSlice';
import cartClice from './cartSlice'



const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartClice,

});

export default rootReducer;