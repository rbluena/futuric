import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import globalSlice from './globalSlice';

export default combineReducers({
  global: globalSlice,
  auth: authSlice,
});
