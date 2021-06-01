import { createSlice } from '@reduxjs/toolkit';

const createReducer = page => (state, action) => {
  const { payload: { apiData, hasError, message } } = action;
  return {
    ...state,
    [page]: { apiData, hasError, message },
  };
};

export const asyncSlice = createSlice({
  name: 'async',
  initialState: {
    signup: {},
    login: {},
    createDiary: {},
    readDiaries: {},
    updateDiary: {},
    deleteDiary: {},
  },
  reducers: {
    setSignUpResponse: createReducer('signup'),
    setLoginResponse: createReducer('login'),
    setCreateDiaryResponse: createReducer('createDiary'),
    setReadDiariesResponse: createReducer('readDiaries'),
    setUpdateDiaryResponse: createReducer('updateDiary'),
    setDeleteDiaryResponse: createReducer('deleteDiary'),
  },
});

export const selectSignUpResponse = state => state.async.signup;
export const selectLoginResponse = state => state.async.login;
export const selectCreateDiaryResponse = state => state.async.login;
export const selectReadDiariesResponse = state => state.async.readDiaries;
export const selectUpdateDiaryResponse = state => state.async.updateDiary;
export const selectDeleteDiaryResponse = state => state.async.deleteDiary;

export const {
  setSignUpResponse,
  setLoginResponse,
  setCreateDiaryResponse,
  setReadDiariesResponse,
  setUpdateDiaryResponse,
  setDeleteDiaryResponse,
} = asyncSlice.actions;

export default asyncSlice.reducer;
