import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    maskedEmails: {},
  },
  reducers: {
    // Reducer to set the users array in the state.
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    // Reducer to toggle the email masking state for a specific user.
    toggleEmailMask: (state, action) => {
      const userId = action.payload;
      state.maskedEmails[userId] = !state.maskedEmails[userId];
    },
  },
});

export const { setUsers, toggleEmailMask } = userSlice.actions;
export default userSlice.reducer;