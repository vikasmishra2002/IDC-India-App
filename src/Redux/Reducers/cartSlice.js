import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // List of courses added to the cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      // Check if the course is already in the cart
      const alreadyInCart = state.items.find(item => item._id === course._id); 
      
      if (!alreadyInCart) {
        state.items.push(course); // Add course to the cart only if it's not already there
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
