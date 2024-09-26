import { combineReducers } from 'redux';
import authReducer from './authSlice';
import cartClice from './cartSlice'
import userReducer from './userSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartClice,
  user: userReducer,
});

export default rootReducer;