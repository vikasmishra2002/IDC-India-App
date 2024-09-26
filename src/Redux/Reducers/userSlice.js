import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  userData: null, 
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
      AsyncStorage.setItem('userData', JSON.stringify(action.payload)); 
    },
    updateUserData(state, action) {
      state.userData = { ...state.userData, ...action.payload }; 
      AsyncStorage.setItem('userData', JSON.stringify(state.userData)); 
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    rehydrateUser(state, action) {
      if (action.payload) {
        state.userData = action.payload.userData || null;
      }
    },
    clearUserData(state) {
      state.userData = null;
      state.loading = false;
      AsyncStorage.removeItem('userData'); 
    },
  },
});

export const { setUserData, updateUserData, setLoading, rehydrateUser, clearUserData } = userSlice.actions;
export default userSlice.reducer;
