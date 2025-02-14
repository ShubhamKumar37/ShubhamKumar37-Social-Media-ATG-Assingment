import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  description: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
    setDescription(state, action) {
      state.description = action.payload;
    },
  },
});

export const { setTitle, setDescription } = postSlice.actions;

export default postSlice.reducer;
