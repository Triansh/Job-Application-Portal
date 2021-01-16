import { createSlice } from '@reduxjs/toolkit';

const roleSlice = createSlice({
  name: 'role',
  initialState: '',
  reducers: {
    setRole(state, action) {
      const { role } = action.payload;
      return role
    },
  },
});

export const { setRole } = roleSlice.actions;

export default roleSlice.reducer;
