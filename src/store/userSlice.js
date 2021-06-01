import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    jwt: '',
    email: '',
    nickname: '',
    password: '',
  },
  reducers: {
    setJWT: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        jwt: payload,
      };
    },
    setUser: (state, action) => {
      const { payload: { email, nickname, password } } = action;
      return {
        ...state,
        email,
        nickname,
        password,
      };
    },
  },
});

export const selectJWT = state => state.user.jwt;
export const selectEmail = state => state.user.email;
export const selectNickname = state => state.user.nickname;
export const selectPassword = state => state.user.password;

export const { setJWT, setUser } = userSlice.actions;

export default userSlice.reducer;
