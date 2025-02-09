// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  user_details: null,
  logged_in: false,
  users: [],
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
        state.user_details= null
        state.logged_in= false
        state.users= []
      },
    updateAccessToken: (state, action) => {
      state.user_details.access = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    user_active_status: (state, action) => {
      const userIndex = state.users.findIndex(user => user.id === action.payload);
      if (userIndex !== -1) {
        state.users[userIndex].is_active = !state.users[userIndex].is_active;
      }
    },
    
  },
});

export const { loginUser,
                logoutUser,
                updateAccessToken,
                setUsers,
                user_active_status
          } = userSlice.actions;

export default userSlice.reducer;