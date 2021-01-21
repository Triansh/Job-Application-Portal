import { combineReducers } from 'redux';

import userReducer from '../features/userSlice';
import statusReducer from '../features/statusSlice';

export default combineReducers({
  status: statusReducer,
  user: userReducer,
});
