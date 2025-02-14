import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  avatar: localStorage.getItem("avatar")
    ? JSON.parse(localStorage.getItem("avatar"))
    : null,
  userData: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initalState,
  reducers: {
    setAvatar: (state, action) => {
      state.avatar = action.payload;
      localStorage.setItem("avatar", JSON.stringify(action.payload));
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
  },
});

export const { setAvatar, setUserData } = userSlice.actions;
export default userSlice.reducer;
