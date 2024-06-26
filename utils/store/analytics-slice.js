import { createSlice } from '@reduxjs/toolkit';

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    startDate: new Date(new Date().setDate(new Date().getDate() - 2)),
    endDate: new Date(),
    totalUsers: 0,
    totalBlogs: 0,
    totalQuestions: 0,
    totalSurveys: 0,
    questions: [],
    users: [],
    surveys: [],
    blogs: [],
    quizzes: [],
    blogsChange: "",
    questionsChange: "",
    usersChange: "",
    changeDuration: "",
    surveysChange: ""
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
      state.usersChange = action.payload.usersChange;
      state.blogsChange = action.payload.blogsChange;
      state.questionsChange = action.payload.questionsChange;
      state.changeDuration = action.payload.changeDuration;
      state.totalSurveys = action.payload.totalSurveys;
      state.surveysChange = action.payload.surveysChange;
    },
    setUsers(state, action) {
      state.users = action.payload.users;
    },
    setSurveys(state, action) {
      state.surveys = action.payload.surveys;
    },
    setBlogs(state, action) {
      state.blogs = action.payload.blogs;
    },
    setQuizzes(state, action) {
      state.quizzes = action.payload.quizzes;
    }
  }
});

export const analyticsActions = analyticsSlice.actions;
export default analyticsSlice.reducer;
