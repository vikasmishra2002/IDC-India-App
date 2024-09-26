import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      const alreadyInCart = state.items.find(item => item._id === course._id); 
      
      if (!alreadyInCart) {
        state.items.push(course);
      }
    },
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      state.items = state.items.filter(item => item._id !== courseId);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
