import { combineReducers } from 'redux';

import roleReducer from '../features/roleSlice';
import statusReducer from '../features/statusSlice';

export default combineReducers({
  status: statusReducer,
  role: roleReducer,
});
