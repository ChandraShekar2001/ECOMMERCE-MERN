import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
  isUpdated: false,
  message: null,
  success: false,
  users: [],
  isDeleted: false,
};

export const userReducer = createReducer(initialState, {
  signUpRequest: (state) => {
    state.loading = true;
  },
  signUpSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
    state.success = true;
  },
  signUpFailure: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  },
  signUpClearErrors: (state, action) => {
    state.error = null;
    state.success = false;
  },

  LoginRequest: (state) => {
    state.loading = true;
  },
  LoginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  logOutRequest: (state) => {
    state.loading = true;
  },
  logOutSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.message = "logged out successfully";
    state.user = null;
  },
  logOutFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearErrors: (state, action) => {
    state.error = null;
  },

  //load user
  loadUserRequest: (state) => {
    state.loading = false;
  },
  loadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  loadUserFailure: (state) => {
    state.loading = false;
    state.isAuthenticated = false;
  },

  //used in updateProfile Action
  setUserRequest: (state) => {
    state.loading = true;
  },
  setUserSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.users = action.payload;
  },
  setUserFail: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  },
  updateUserRequest: (state) => {
    state.loading = true;
  },
  updateUserSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.isUpdated = true;
    state.user = action.payload.user;
    state.users = action.payload.users;
    state.success = true;
  },
  updateUserFail: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  },
  updateUserReset(state) {
    state.success = false;
    state.isUpdated = false
    state.error = null;
  },

  //profileSlice Reducers
  updatePasswordRequest: (state, action) => {
    state.loading = true;
    state.isUpdated = false;
  },
  updatePasswordSuccess: (state, action) => {
    state.loading = false;
    state.isUpdated = true;
  },
  updatePasswordFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  updatePasswordReset: (state, action) => {
    state.isUpdated = false;
    state.error = null;
  },

  //forgotPassword Slice Reducer
  forgotPasswordRequest: (state, action) => {
    state.loading = true;
    state.success = false;
  },
  forgotPasswordSuccess: (state, action) => {
    state.loading = false;
    state.success = true;
    state.message = action.payload;
  },
  forgotPasswordFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  forgotPasswordReset: (state, action) => {
    state.error = null;
    state.message = null;
    state.success = false;
  },

  //resetPassword Slice Reducer
  resetPasswordRequest: (state, action) => {
    state.loading = true;
    state.success = false;
  },
  resetPasswordSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload.user;
    state.success = true;
    state.message = action.payload.message;
  },
  resetPasswordFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  resetPasswordReset: (state, action) => {
    state.error = null;
    state.success = false;
  },

  //getAllUser Slice Reducer
  getAllUserRequest(state) {
    state.loading = true;
  },
  getAllUserSuccess(state, action) {
    state.loading = false;
    state.users = action.payload;
  },
  getAllUserFail(state, action) {
    state.loading = false;
    state.error = action.payload;
  },
  getAllUserReset(state) {
    state.error = null;
  },

  //updateUserSlice Reducer
  /* updateUserRequest(state) {
    state.loading = true;
  },
  updateUserSuccess(state, action) {
    state.loading = false;
    state.isUpdated = true;
    // state.isUpdated = action.payload;
    state.user=action.payload
  },
  updateUserFail(state, action) {
    state.loading = false;
    state.error = action.payload;
  },
  updateUserReset(state) {
    state.isUpdated = false;
    state.error = null;
  },*/

  //deleteUser Slice Reducer
  deleteUserRequest(state) {
    state.loading = true;
  },
  deleteUserSuccess(state, action) {
    state.loading = false;
    state.isDeleted = true;
    state.message = action.payload.message;
    state.users = action.payload.users;
  },
  deleteUserFail(state, action) {
    state.loading = false;
    state.error = action.payload;
  },
  deleteUserReset(state) {
    state.isDeleted = false;
    state.error = null;
    state.loading = false;
  },
});
