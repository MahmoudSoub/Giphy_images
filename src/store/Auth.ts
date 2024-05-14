import {createSlice} from '@reduxjs/toolkit';

const AuthReducer = createSlice({
  name: 'Auth',
  initialState: {
    isSignedIn: false,
  },
  reducers: {
    login: state => {
      state.isSignedIn = true;
    },
    logout: state => {
      state.isSignedIn = false;
    },
  },
});

export const {login, logout} = AuthReducer.actions;
export default AuthReducer.reducer;
