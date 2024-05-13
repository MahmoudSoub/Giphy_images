import {createSlice} from '@reduxjs/toolkit';

const SignSlice = createSlice({
  name: 'isSignedIn',
  initialState: {
    isSignedIn: false,
  },
  reducers: {
    login: state => {
      state.isSignedIn = true;
    },
  },
});

export const {login} = SignSlice.actions;
export default SignSlice.reducer;
