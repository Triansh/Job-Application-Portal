import { createSlice } from '@reduxjs/toolkit';

const statusSlice = createSlice({
  name: 'role',
  initialState: { status: '', message: '' },
  reducers: {
    setStatus(state, action) {
      return action.payload;
    },
  },
});

export const { setStatus } = statusSlice.actions;

export default statusSlice.reducer;
