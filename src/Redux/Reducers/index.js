import { combineReducers } from "@reduxjs/toolkit";
import ReducerHome from "./HomeReducers";

export default combineReducers({
  home: ReducerHome,
});
