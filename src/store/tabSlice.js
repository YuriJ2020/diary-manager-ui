import { createSlice } from '@reduxjs/toolkit';

export const tabSlice = createSlice({
  name: 'tab',
  initialState: {
    activeKey: 'signup',
  },
  reducers: {
    setActiveKey: (_state, action) => {
      const { payload } = action;
      return { activeKey: payload };
    },
  },
});

export const selectActiveKey = state => state.tab.activeKey;

export const { setActiveKey } = tabSlice.actions;

export default tabSlice.reducer;
