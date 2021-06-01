import { createSlice } from '@reduxjs/toolkit';

const createReducer = attribute => (state, action) => {
  const { payload } = action;
  return {
    ...state,
    [attribute]: payload,
  };
};

export const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    email: '',
    datetime: '',
    message: '',
  },
  reducers: {
    setEmail: createReducer('email'),
    setDatetime: createReducer('datetime'),
    setMessage: createReducer('message'),
    setDiary: (_state, action) => {
      const { payload } = action;
      return payload;
    },
    reset: state => ({
      email: state.email,
      datetime: '',
      message: '',
    }),
  },
});

export const selectEmail = state => state.diary.email;
export const selectDatetime = state => state.diary.datetime;
export const selectMessage = state => state.diary.message;

export const {
  reset,
  setDatetime,
  setDiary,
  setEmail,
  setMessage,
} = diarySlice.actions;

export default diarySlice.reducer;
