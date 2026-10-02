import { createSlice } from "@reduxjs/toolkit";

const initialUser = JSON.parse(localStorage.getItem("user")) || null;

let authSlice = createSlice({
    name: "auth",
    initialState: {
        user: initialUser,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            if (action.payload) {
                localStorage.setItem("user", JSON.stringify(action.payload));
            } else {
                localStorage.removeItem("user");
            }
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },

    },

})
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;