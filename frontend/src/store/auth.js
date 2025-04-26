import { createSlice } from "@reduxjs/toolkit";
const authSlice =createSlice({
    name: "auth",
    initialState: {
        isloggedIn: false,
        role:"user",},
    reducers: {
        login(state){
            state.isloggedIn = true;
        },
        logout(state){
            state.isloggedIn = false;
        },
        changeRole(state,action){
            const role = action.payload;
            state.role = role;
        }
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;