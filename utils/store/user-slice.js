import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {}
  },
  reducers: {
    setData(state, action) {
        state.user = action.payload.user;
    }
  }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
