import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
	data: null,
	status: 'idle'
}
export const fetchUserData = createAsyncThunk('user/fetchUserData', async (data) => {
	const response = await fetch('http://localhost:4444/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)

	})
	if (response.status === 200) {
		return response.json()
	}

})
export const fetchAuthMe = createAsyncThunk('user/fetchAuthMe', async (token) => {
	const response = await fetch('http://localhost:4444/auth/me', {
		method: 'GET',
		headers: {
			Authorization: `${token}`
		}
	})
	return response.json()
})
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// LogIn: (state, action) => {
		// 	state.data = action.payload
		// 	state.status = 'loaded'

		// },
		LogOut: (state) => {
			state.data = null
		},

	},
	extraReducers: {
		[fetchUserData.pending]: (state, action) => {
			state.data = null
			state.status = 'loading'

		},
		[fetchUserData.fulfilled]: (state, action) => {
			state.data = action.payload
			state.status = 'loaded'

		},
		[fetchUserData.rejected]: (state, action) => {
			state.data = null
			state.status = 'error'

		},
		[fetchAuthMe.pending]: (state, action) => {
			state.data = null
			state.status = 'loading'

		},
		[fetchAuthMe.fulfilled]: (state, action) => {
			state.data = action.payload
			state.status = 'loaded'

		},
		[fetchAuthMe.rejected]: (state, action) => {
			state.data = null
			state.status = 'error'

		}
	}
})

// Action creators are generated for each case reducer function
export const { LogIn, LogOut } = userSlice.actions
export const selectIsAuth = (state) => Boolean(state.user.data)

export default userSlice.reducer