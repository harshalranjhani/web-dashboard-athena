import { configureStore } from "@reduxjs/toolkit";
import analyticsReducer from "./analytics-slice";
 
const store = configureStore({
  reducer: {
    analytics: analyticsReducer,
  },
});
 
export default store;