import { createSlice } from '@reduxjs/toolkit';

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    startDate: new Date(new Date().setDate(new Date().getDate() - 2)),
    endDate: new Date(),
    totalUsers: 0,
    totalBlogs: 0,
    totalQuestions: 0,
    questions: [],
    users: [],
  },
  reducers: {
    setStartDate(state, action) {
      state.startDate = action.payload.startDate;
    },
    setEndDate(state, action) {
      state.endDate = action.payload.endDate;
    },
    setData(state, action) {
      state.totalUsers = action.payload.totalUsers;
      state.totalBlogs = action.payload.totalBlogs;
      state.totalQuestions = action.payload.totalQuestions;
      state.questions = action.payload.questions;
    },
    setUsers(state, action) {
      state.users = action.payload.users;
    }
  }
});

export const analyticsActions = analyticsSlice.actions;
export default analyticsSlice.reducer;
