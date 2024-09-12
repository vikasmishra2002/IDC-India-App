import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  signupData: null,
  loading: false,
  token: null,
  isAuthenticated: false,
  user: null,
  profileImage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true; // Set authenticated flag when token is set
      AsyncStorage.setItem('token', JSON.stringify(action.payload)); 
    },
    rehydrate(state, action) {
      if (action.payload) {
        state.token = action.payload.token;
        state.isAuthenticated = !!action.payload.token; // Set true if token exists
        state.user = action.payload.user || null;
        state.profileImage = action.payload.profileImage || null;
      }
    },
    logout(state) {
      state.signupData = null;
      state.loading = false;
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.profileImage = null; 
      AsyncStorage.removeItem('token'); // Clear token from storage
    },
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.profileImage = action.payload.profileImage || null;
      AsyncStorage.setItem('token', JSON.stringify(action.payload.token));
    },
    setUser(state, action) {
      state.user = action.payload;
      state.profileImage = action.payload.profileImage || state.profileImage;
    },
    setProfileImage(state, action) {
      state.profileImage = action.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken, rehydrate, logout, login, setUser, setProfileImage } = authSlice.actions;
export default authSlice.reducer;
