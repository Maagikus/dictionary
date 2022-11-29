import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import dictionaryReducer from './dictionarySlice'
export const store = configureStore({
	reducer: {
		user: userReducer,
		dictionary: dictionaryReducer
	},
})