import { createSlice } from '@reduxjs/toolkit';

  const initialState= {
     userAuthStatus:localStorage.getItem("userToken")?true:false 
  }

export const userAuthSlice = createSlice({
  name: 'url',
  initialState,

  reducers:{

   login:(state,action)=>{
       state.userAuthStatus=true
       localStorage.setItem("userToken",action.payload)   
   },

   logout:(state)=>{
       state.userAuthStatus=false
       localStorage.removeItem("userToken");
   }

  },
});

export const {login,logout} = userAuthSlice.actions;
export default userAuthSlice.reducer;
