import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from './userSlice'
import  productslice  from './productSlice'

export const store = configureStore({
    reducer:{
      user : userSliceReducer,
      product:productslice,    
    }
  });
 