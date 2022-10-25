import { createSlice } from "@reduxjs/toolkit";
// after creating the slice, we need to export the slice's actions and reducer in store.js
const initialState = {
  user: {},
  isAuthenticated: false,
  sessionId: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem("session_id");

      localStorage.setItem("accountId", action.payload.id);
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
