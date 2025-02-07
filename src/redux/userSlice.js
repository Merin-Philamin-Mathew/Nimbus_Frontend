// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  user_details: null,
  logged_in: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user_details = action.payload;
      state.logged_in = true
    },
    logoutUser: (state) => {
        console.log('logoutfunction triggered')
        state.user_details = null;
        state.logged_in = false
      },
  },
});

export const { loginUser,
                logoutUser
          } = userSlice.actions;

export default userSlice.reducer;