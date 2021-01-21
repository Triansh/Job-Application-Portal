import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { role: '', isLogin: false },
  reducers: {
    setRole(state, action) {
      const { role } = action.payload;
      return { ...state, role };
    },
    setLogin(state, action) {
      const { isLogin } = action.payload;
      return { ...state, isLogin };
    },
  },
});

export const { setRole, setLogin } = userSlice.actions;

export default userSlice.reducer;
