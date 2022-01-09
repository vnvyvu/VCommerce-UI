import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import merge from 'lodash.merge';
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

const refresh = createAsyncThunk('user/refresh', async (payload, ThunkAPI) =>
	axiosThunk(payload, ThunkAPI, authService.refresh)
);

const initialState = {
	_id: '',
	name: '',
	email: '',
	phone: '',
	about: '',
	role: 0,
	expiresIn: 0,
};

const slice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		update: (state, action) => {
			state = merge(state, action.payload);
		},
		delete: (state) => {
			state = initialState;
		},
		clean: (state) => {
			const newState = {};
			Object.keys(initialState).forEach((key) => {
				newState[key] = state[key];
			});
			state = newState;
		},
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
			console.log(action.payload);
			state.loginStatus = 'successful';
			const {
				user: { hashedPassword, ...payload },
				...expiresIn
			} = action.payload;
			state = merge(state, payload, expiresIn);
		},
		[login.rejected]: (state, action) => {
			state.loginStatus = 'failed';
			state.errorMsg = action.payload[0].msg;
		},

		[logout.pending]: (state, action) => {
			state.logoutStatus = 'pending';
		},
		[logout.fulfilled]: (state, action) => {
			state = { ...initialState, logoutStatus: 'successful' };
		},
		[logout.rejected]: (state, action) => {
			state.logoutStatus = 'failed';
		},

		[refresh.pending]: (state, action) => {
			state.refreshStatus = 'pending';
		},
		[refresh.fulfilled]: (state, action) => {
			state.refreshStatus = 'successful';
			const {
				user: { hashedPassword, ...payload },
				...expiresIn
			} = action.payload;
			state = merge(state, payload, expiresIn);
		},
		[refresh.rejected]: (state, action) => {
			state.refreshStatus = 'failed';
			console.log(action);
		},
	},
});

slice.actions.register = register;
slice.actions.login = login;
slice.actions.logout = logout;
slice.actions.refresh = refresh;

export const userSlice = slice;
export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
