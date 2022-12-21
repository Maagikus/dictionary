import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const addUserDictionary = createAsyncThunk('dictionary/addUserDictionary', async (data) => {
	const response = await fetch('http://localhost:4444/dictionary', {
		method: 'POST',
		headers: {
			Authorization: localStorage.getItem('token'),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	if (response.status === 200) {
		return response.json()
	}
})
export const fetchUserDictionary = createAsyncThunk('dictionary/fetchUserDictionary', async (id) => {
	const response = await fetch(`http://localhost:4444/dictionary/${id}`)
	if (response.status === 200) {
		return response.json()
	}
})
export const deleteUserDictionary = createAsyncThunk('dictionary/deleteUserDictionary', async (id) => {
	const response = await fetch(`http://localhost:4444/dictionary/${id}`, { method: 'DELETE' })
	if (response.status === 200) {
		return response.json()
	}
})
const initialState = {
	data: null,
	status: 'idle',
	dictionary: []
}
export const dictionarySlice = createSlice({
	name: 'dictionary',
	initialState,
	reducers: {},
	extraReducers: {
		[addUserDictionary.pending]: (state, action) => {
			state.data = null
			state.status = 'loading'

		},
		[addUserDictionary.fulfilled]: (state, action) => {
			state.data = action.payload
			state.dictionary = [...state.dictionary, action.payload]
			state.status = 'loaded'

		},
		[addUserDictionary.rejected]: (state, action) => {
			state.data = null
			state.status = 'error'

		},
		[fetchUserDictionary.pending]: (state, action) => {
			state.data = null
			state.status = 'loading'

		},
		[fetchUserDictionary.fulfilled]: (state, action) => {
			state.dictionary = action.payload
			state.status = 'loaded'

		},
		[fetchUserDictionary.rejected]: (state, action) => {
			state.data = null
			state.status = 'error'

		},
		[deleteUserDictionary.pending]: (state, action) => {
			state.data = null
			state.status = 'loading'

		},
		[deleteUserDictionary.fulfilled]: (state, action) => {
			state.dictionary = state.dictionary.filter(item => item._id !== action.payload._id)
			state.status = 'loaded'

		},
		[deleteUserDictionary.rejected]: (state, action) => {
			state.data = null
			state.status = 'error'

		},
	}
})

// Action creators are generated for each case reducer function
export const { } = dictionarySlice.actions
export const selectIsAuth = (state) => Boolean(state.user.data)

export default dictionarySlice.reducer