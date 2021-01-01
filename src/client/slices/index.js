import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import globalSlice from './globalSlice';
import linksSlice from './linksSlice';

export default combineReducers({
  global: globalSlice,
  auth: authSlice,
  links: linksSlice,
});
