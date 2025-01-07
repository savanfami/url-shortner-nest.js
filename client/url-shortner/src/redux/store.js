import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./reducer/userSlice";

const store = configureStore({
  reducer:{
    userStatus:userAuthSlice
  },
});

export default store