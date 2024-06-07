import { createSlice } from '@reduxjs/toolkit';

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    startDate: null,
    endDate: null
  },
  reducers: {
    setStartDate(state, action) {
      state.startDate = action.payload.startDate;
    },
    setEndDate(state, action) {
      state.endDate = action.payload.endDate;
    }
  }
});

export const analyticsActions = analyticsSlice.actions;
export default analyticsSlice.reducer;
