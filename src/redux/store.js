import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slice/DemoSlice' //import counterReducer from the slice create in the ./slice folder

/**
 * * The counterReducer above is personal, you can use any name that suit you
 * * but best is use the following format: 'feature' (should be a noun) + Reducer
 * ! Remember not to create same function name in Slices as it would cause some 
 * ! unexpected error
 */

export const store = configureStore({
  reducer: {
    counter: counterReducer, // create a reducer for reuse in component
  },
})