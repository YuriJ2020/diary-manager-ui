import { createSlice } from '@reduxjs/toolkit';

export const diariesSlice = createSlice({
  name: 'diaries',
  initialState: {
    activeKey: 0,
    diaries: [],
  },
  reducers: {
    setActiveKey: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        activeKey: payload,
      };
    },
    setDiaries: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        diaries: payload,
      };
    },
  },
});

export const selectActiveKey = state => state.diaries.activeKey;
export const selectDiaries = state => state.diaries.diaries;

export const { setActiveKey, setDiaries } = diariesSlice.actions;

export default diariesSlice.reducer;
