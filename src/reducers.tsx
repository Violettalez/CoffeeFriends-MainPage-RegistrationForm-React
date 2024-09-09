import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  name: string;
}

const initialState: UserState = {
  email: "",
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setEmail, setName } = userSlice.actions;
export default userSlice.reducer;

