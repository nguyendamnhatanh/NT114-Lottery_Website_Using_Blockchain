import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

/**
 * * Functions in reducers take 2 param
 * @param state The current state
 * @param action The param that will be pass into that function when using in others component
 * * action.payload is the value of what you pass in the function
 * ! The initialState must available in the Slice as it provide the structure of the State in store
 */


export const DemoSlice = createSlice({
  name: 'counter', // You can name it whatever you like, but remember to use meaningful name
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
      console.log(state.value)
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = DemoSlice.actions

export default DemoSlice.reducer //this will be the import in store.js