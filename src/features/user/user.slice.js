import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import merge from 'lodash.merge';
import { defaultReducers } from '../../redux/defaultReducers';
import { isUserAuthenticated } from '../../redux/middleware/localState.middleware';
import { authService } from '../../services/auth.service';
import { axiosThunk } from '../../services/axiosClient';

const register = createAsyncThunk('user/register', async (payload, ThunkAPI) =>
	axiosThunk(payload, ThunkAPI, authService.register)
);

const login = createAsyncThunk('user/login', async (payload, ThunkAPI) =>
	axiosThunk(payload, ThunkAPI, authService.login)
);

const logout = createAsyncThunk('user/logout', async (payload, ThunkAPI) =>
	axiosThunk(payload, ThunkAPI, authService.logout)
);

function getInitialState(fromLocal) {
	return isUserAuthenticated() && fromLocal
		? {
				_id: localStorage.getItem('_id'),
				...JSON.parse(localStorage.getItem('user')),
		  }
		: {
				_id: '',
				name: '',
				email: '',
				phone: '',
				about: '',
				avatar: '',
				role: 0,
		  };
}

const slice = createSlice({
	name: 'user',
	initialState: getInitialState(true),
	reducers: {
		...defaultReducers(getInitialState()),
	},
	extraReducers: {
		[register.pending]: (state, action) => {
			state.registerStatus = 'pending';
		},
		[register.fulfilled]: (state, action) => {
			state.registerStatus = 'successful';
		},
		[register.rejected]: (state, action) => {
			state.registerStatus = 'failed';
			state.errorMsg = action.payload[0].msg;
		},

		[login.pending]: (state, action) => {
			state.loginStatus = 'pending';
		},
		[login.fulfilled]: (state, action) => {
			state.loginStatus = 'successful';
			const {
				user: { hashedPassword, ...payload },
				...expiresIn
			} = action.payload;
			return merge(state, payload, expiresIn);
		},
		[login.rejected]: (state, action) => {
			state.loginStatus = 'failed';
			state.errorMsg = action.payload[0].msg;
		},

		[logout.pending]: (state, action) => {
			state.logoutStatus = 'pending';
		},
		[logout.fulfilled]: (state, action) => {
			return { ...getInitialState(), logoutStatus: 'successful' };
		},
		[logout.rejected]: (state, action) => {
			state.logoutStatus = 'failed';
		},
	},
});

slice.actions.register = register;
slice.actions.login = login;
slice.actions.logout = logout;

export const userSlice = slice;
export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
